# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY server.js data.json package.json package-lock.json ./
#COPY data.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /react-ui && mv ./node_modules ./react-ui

WORKDIR /react-ui

COPY . .

# Build the project and copy the files
RUN npm run build

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 1
COPY --from=builder /react-ui/build /usr/share/nginx/html

COPY node-app ./etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/node-app /etc/nginx/sites-enabled/node-app

EXPOSE 80
EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]

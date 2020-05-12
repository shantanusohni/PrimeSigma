# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /sigma-react-ui && mv ./node_modules ./sigma-react-ui

WORKDIR /sigma-react-ui

COPY . .

# Build the project and copy the files
RUN npm run build


FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /sigma-react-ui/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM clue/json-server:latest

COPY data.json /data/data.json
COPY data.json /data/articles.json

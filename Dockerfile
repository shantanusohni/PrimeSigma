# stage1 as builder
FROM node:10-alpine as builder

ENV NODE_ENV="production"

# copy the package.json to install dependencies
COPY package.json package-lock.json ./
COPY data.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /react-ui && mv ./node_modules ./react-ui

WORKDIR /react-ui

COPY . .

# Build the project and copy the files
RUN npm run build

RUN ls
RUN node -v

CMD ["npm", "start"]

EXPOSE 3000 80

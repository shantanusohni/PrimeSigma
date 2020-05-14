# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./
COPY data.json ./

# Install the dependencies and make the folder
RUN npm install 

COPY . .

# Build the project and copy the files
RUN npm run build

RUN npm install -g json-server
RUN npm run api

EXPOSE 3000 80

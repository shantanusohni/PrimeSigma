# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./
COPY data.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /sigma-react-ui && mv ./node_modules ./sigma-react-ui

WORKDIR /sigma-react-ui

COPY . .

# Build the project and copy the files
RUN npm run build

RUN json-server --watch data.json --port 3000 --static ./build

EXPOSE 3000

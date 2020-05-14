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

RUN pwd
RUN ls

RUN npm install -g json-server

CMD ["json-server", "--watch data.json", "--port 3000", "--static ./build" ]

EXPOSE 3000 80

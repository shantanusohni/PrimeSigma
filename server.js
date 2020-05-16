const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults({static:'./build'})
 
server.use(middlewares)
server.use(router)
server.listen(80, () => {
  console.log('JSON Server is running')
})

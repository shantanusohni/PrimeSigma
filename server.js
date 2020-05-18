const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults({static:'./react-ui/build'})
 
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

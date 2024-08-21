const app = require("./app")
const http = require("http")

const server = http.createServer(app.callback())

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('Online');
})
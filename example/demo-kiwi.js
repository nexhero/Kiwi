const Kiwi = require('../index')

const port = 3001
const server = new Kiwi(port)
server.router.on('GET','/',(req,res,params)=>{

  res.setHeader('Content-Type', 'text/html')
  res.end("<h1>HELLO P2P Web Server :)</h1>")

})
server.router.on('GET','/name/:name',(req,res,params)=>{
  console.log(params)
  res.setHeader('Content-Type', 'text/plain')
  res.end("Hello: "+params.name)
})
server.start("63d709c4f93884009c3e8db69ad1dfd2000ca5b6a5ae1984a23acffa75d058c2")
// server.start()
//
console.log("\n\nVisit")
console.log(`http://localhost:${port}/name/pears\n\n`)

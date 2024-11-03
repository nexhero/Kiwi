const http = require('bare-http1')
const HolesailServer = require('./lib/bare-holesail-server')
const router = require('./lib/bare-find-my-way')



class Kiwi {
  constructor(port = 3000){
    this.server = this.server = http.createServer((req,res)=>{
      this.handler(req,res)
    })
    this.port = port
    this.router = router()

  }

  // TODO: Missing code
  useMiddleware(base,...fns){
    return this //apply chain
  }

  start(buffSeed = null){

    this.server.listen(this.port,()=>{
      console.log('Server Running')
      console.log('127.0.0.1:'+this.port)
      if (buffSeed !== null) {
        const holeServer =  new HolesailServer();
        holeServer.serve({port:this.port, address:"127.0.0.1",buffSeed:buffSeed}, () => {
          console.log('Holesail Server Started');
          console.log("Connection string: "+holeServer.getPublicKey());
        })
      }
    })


  }
  handler=(req,res)=>{
    this.router.lookup(req,res)
  }
}

module.exports = Kiwi

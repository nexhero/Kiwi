const http = require('bare-http1')
const HolesailServer = require('./lib/bare-holesail-server')
const router = require('./lib/bare-find-my-way')
const UrlPattern = require('url-pattern');


class Kiwi {
  constructor(port = 3000){
    this.server = this.server = http.createServer((req,res)=>{
      this.handler(req,res)
    })
    this.server._timeout = 200
    this.port = port
    this.router = router()
    this.mware = {}
  }

  useMiddleware(base,fn){
    let arr = this.mware[base] || []
    arr.push(fn);
    this.mware[base] = arr;
    return this //apply chain
  }

  start(buffSeed = null){
    this.server.listen(this.port,'0.0.0.0',()=>{
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
  handler=async(req,res)=>{

    let url = req.url
    for (let mURL in this.mware) {
      var pattern = new UrlPattern(mURL);
      if (pattern.match(url)) {
        try {
          this.mware[mURL].forEach((fn)=>fn(req,res))
        } catch (err) {
          console.log(err)
          res.end('Unable to process request')
        }
      }
    }
    this.router.lookup(req,res)
  }
}

module.exports = Kiwi

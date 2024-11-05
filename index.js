const http = require('bare-http1')
const HolesailServer = require('./lib/bare-holesail-server')
const router = require('./lib/bare-find-my-way')
const UrlPattern = require('url-pattern');
function urlPatternToRegex(pattern) {
    // Escape special regex characters and convert parameters to regex
    const regexString = pattern
        .replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') // Escape special regex chars
        .replace(/:(\w+)/g, '([^/]+)')               // Convert :param to capturing group
        .replace(/\*/g, '.*')                         // Replace * with .*
        .replace(/\?/g, '.');                         // Replace ? with .

    return new RegExp(`^${regexString}$`);
}

function matchUrl(pattern, url) {
    const regex = urlPatternToRegex(pattern);
    const match = regex.exec(url);

    if (match) {
        const params = {};
        const paramNames = (pattern.match(/:(\w+)/g) || []).map(param => param.slice(1)); // Extract parameter names

        // Populate params object with captured values
        paramNames.forEach((name, index) => {
            params[name] = match[index + 1]; // The first element is the full match
        });

        return { match: true, params }; // Return match result and extracted parameters
    }

    return { match: false, params: {} }; // No match found
}

class Kiwi {
  constructor(port = 3000){
    this.server = this.server = http.createServer((req,res)=>{
      this.handler(req,res)
    })
    this.port = port
    this.router = router()
    this.mware = {}
  }

  // TODO: Missing code
  useMiddleware(base,fn){
    console.log(fn)
      let arr = this.mware[base] || []
      arr.push(fn);
    console.log(arr)
      this.mware[base] = arr;

    console.log(`current mware ${JSON.stringify(this.mware)}`)
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
    // console.log('url:'+req.url)
    let url = req.url
    for (let mURL in this.mware) {
      var pattern = new UrlPattern(mURL);

      if (pattern.match(url)) {
        console.log('match')
        try {
          this.mware[mURL].forEach((fn)=>fn(req,res))
        } catch (err) {
          console.log(err)
          res.end('Unable to process request')
          return
        }

      }
    }
    this.router.lookup(req,res)
  }
}

module.exports = Kiwi

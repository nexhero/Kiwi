
# Table of Contents

1.  [Libraries](#org38d9a29)
2.  [Requirements:](#org1bf4abf)
3.  [Install:](#org6fc6753)
4.  [Static HTTP Server P2p:](#orgaa7cc21)
5.  [How to use:](#orge69cc3e)
    1.  [Create server object](#orgd4be4ec)
    2.  [Register new route](#org10c26b3)
    3.  [Register middleware](#orgd68890c)
    4.  [Start up server](#org5a97af4)
6.  [Example:](#org66c99a2)

<p class="verse">
This is an HTTP server built using bare-runtime, utilizing the Holesail library for peer-to-peer (P2P) tunneling capabilities. The server enables access to its resources outside a local network, allowing users to connect from anywhere in the world.<br />
</p>


<a id="org38d9a29"></a>

# Libraries

Kiwi is based in those libraries:

-   <https://holesail.io/>
-   <https://github.com/delvedor/find-my-way>


<a id="org1bf4abf"></a>

# Requirements:

    npm i -g bare


<a id="org6fc6753"></a>

# Install:

    git clone https://github.com/nexhero/Kiwi.git
    cd Kiwi
    npm install


<a id="orgaa7cc21"></a>

# Static HTTP Server P2p:

    bare kiwi.js -p 8080 -d /var/www/html


<a id="orge69cc3e"></a>

# How to use:


<a id="orgd4be4ec"></a>

## Create server object

    const port = 3001
    const server = new Kiwi(port)


<a id="org10c26b3"></a>

## Register new route

    server.router.on('GET','/name/:name',(req,res,params)=>{
      console.log(params)
      res.setHeader('Content-Type', 'text/plain')
      res.end("Hello: "+params.name)
    })


<a id="orgd68890c"></a>

## Register middleware

    const nameMW = (req,res)=>{
      res.write("This is middleware for route /name \n")
    }
    server.useMiddleware('/name/*',nameWM)


<a id="org5a97af4"></a>

## Start up server

    server.start()
    // Or start up server with holesail
    //server.start("63d709c4f93884009c3e8db69ad1dfd2000ca5b6a5ae1984a23acffa75d058c2")


<a id="org66c99a2"></a>

# Example:

The repository comes with a example server

    bare example/demo-kiwi.js



# Table of Contents

1.  [Libraries](#org6b31f20)
2.  [Requirements:](#orgf2ef68e)
3.  [Install:](#org5d4ae07)
4.  [Static HTTP Server P2p:](#orgd9cc5ad)
5.  [How to use:](#org7aea2ff)
    1.  [Create server object](#org05c2ab8)
    2.  [Register new route](#orgb2ec797)
    3.  [Register middleware](#org9035963)
    4.  [Start up server](#org0b70d1e)
6.  [Example:](#orga8f78b9)

<p class="verse">
This is an HTTP server built using bare-runtime, utilizing the Holesail library for peer-to-peer (P2P) tunneling capabilities. The server enables access to its resources outside a local network, allowing users to connect from anywhere in the world.<br />
</p>


<a id="org6b31f20"></a>

# Libraries

Kiwi is based in those libraries:

-   <https://holesail.io/>
-   <https://github.com/delvedor/find-my-way>


<a id="orgf2ef68e"></a>

# Requirements:

    npm i -g bare


<a id="org5d4ae07"></a>

# Install:

    git clone https://github.com/nexhero/Kiwi.git
    cd Kiwi
    npm install


<a id="orgd9cc5ad"></a>

# Static HTTP Server P2p:

    bare example/demo-kiwi.js -p 8080 -d /var/www/html


<a id="org7aea2ff"></a>

# How to use:


<a id="org05c2ab8"></a>

## Create server object

    const port = 3001
    const server = new Kiwi(port)


<a id="orgb2ec797"></a>

## Register new route

    server.router.on('GET','/name/:name',(req,res,params)=>{
      console.log(params)
      res.setHeader('Content-Type', 'text/plain')
      res.end("Hello: "+params.name)
    })


<a id="org9035963"></a>

## Register middleware

    const nameMW = (req,res)=>{
      res.write("This is middleware for route /name \n")
    }
    server.useMiddleware('/name/*',nameWM)


<a id="org0b70d1e"></a>

## Start up server

    server.start()
    // Or start up server with holesail
    //server.start("63d709c4f93884009c3e8db69ad1dfd2000ca5b6a5ae1984a23acffa75d058c2")


<a id="orga8f78b9"></a>

# Example:

The repository comes with a example server

    bare example/demo-kiwi.js


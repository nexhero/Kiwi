
# Table of Contents

1.  [Libraries](#org7f25847)
2.  [Requirements:](#org24b70fa)
3.  [Install:](#org6d6b036)
4.  [How to use:](#org7deac37)
    1.  [Create server object](#orga08191b)
    2.  [Register new route](#orgd8cf3ac)
    3.  [Register middleware](#org5f0c4e2)
    4.  [Start up server](#orgbcd3c52)
5.  [Example:](#orgd157c28)

<p class="verse">
This is an HTTP server built using bare-runtime, utilizing the Holesail library for peer-to-peer (P2P) tunneling capabilities. The server enables access to its resources outside a local network, allowing users to connect from anywhere in the world.<br />
</p>


<a id="org7f25847"></a>

# Libraries

Kiwi is based in those libraries:

-   <https://holesail.io/>
-   <https://github.com/delvedor/find-my-way>


<a id="org24b70fa"></a>

# Requirements:

    npm i -g bare


<a id="org6d6b036"></a>

# Install:

    git clone https://github.com/nexhero/Kiwi.git
    cd Kiwi
    npm install


<a id="org7deac37"></a>

# How to use:


<a id="orga08191b"></a>

## Create server object

    const port = 3001
    const server = new Kiwi(port)


<a id="orgd8cf3ac"></a>

## Register new route

    server.router.on('GET','/name/:name',(req,res,params)=>{
      console.log(params)
      res.setHeader('Content-Type', 'text/plain')
      res.end("Hello: "+params.name)
    })


<a id="org5f0c4e2"></a>

## Register middleware

    const nameMW = (req,res)=>{
      res.write("This is middleware for route /name \n")
    }
    server.useMiddleware('/name/*',nameWM)


<a id="orgbcd3c52"></a>

## Start up server

    server.start()
    // Or start up server with holesail
    //server.start("63d709c4f93884009c3e8db69ad1dfd2000ca5b6a5ae1984a23acffa75d058c2")


<a id="orgd157c28"></a>

# Example:

The repository comes with a example server

    bare example/demo-kiwi.js


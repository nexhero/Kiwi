
# Table of Contents

1.  [Libraries](#org12a9895)
2.  [Requirements:](#org938429f)
3.  [Install:](#orgd6b48d9)
4.  [How to use:](#orgf107208)
5.  [Example:](#org76c716e)

<p class="verse">
This is an HTTP server built using bare-runtime, utilizing the Holesail library for peer-to-peer (P2P) tunneling capabilities. The server enables access to its resources outside a local network, allowing users to connect from anywhere in the world.<br />
<br />
<br />
<br />
</p>


<a id="org12a9895"></a>

# Libraries

Kiwi is based in those libraries:

-   <https://holesail.io/>
-   <https://github.com/delvedor/find-my-way>


<a id="org938429f"></a>

# Requirements:

    npm i -g bare


<a id="orgd6b48d9"></a>

# Install:

    git clone https://github.com/nexhero/Kiwi.git
    cd Kiwi
    npm install


<a id="orgf107208"></a>

# How to use:

Create server object

    const port = 3001
    const server = new Kiwi(port)

Register new route

    server.router.on('GET','/name/:name',(req,res,params)=>{
      console.log(params)
      res.setHeader('Content-Type', 'text/plain')
      res.end("Hello: "+params.name)
    })

Register middleware

    const nameMW = (req,res)=>{
      res.write("This is middleware for route /name \n")
    }
    server.useMiddleware('/name/*',name)

Start up server

    server.start()
    // Or start up server with holesail
    //server.start("63d709c4f93884009c3e8db69ad1dfd2000ca5b6a5ae1984a23acffa75d058c2")


<a id="org76c716e"></a>

# Example:

The repository comes with a example server

    bare example/demo-kiwi.js


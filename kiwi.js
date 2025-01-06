#!/usr/bin/bare

const Kiwi = require('./index')
const process = require('bare-process')
const UrlPattern = require('url-pattern');
const fs = require('bare-fs')
const b4a = require('b4a')
const lookup = require("./lib/mime-types").lookup;
const { program } = require('./lib/commander');


function seedGenerator(length = 64) {
  const characters = '0123456789abcdef';
  let result = '';
    for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * 16)];
  }

  return result;
}

const main = ()=>{
    program
        .name('Kiwi')
        .description('Static HTTP Server P2P')
        .version('1.0.0');
    program
        .option('-p, --port <number>', 'Listing port')
        .option('-s --seed <string>','Seed 64 characteres')
        .requiredOption('-d, --dir <string>', 'Website location. e.g: /home/root/www');

    program.parse(process.argv);

    const options = program.opts();

    const port = options.port?Number(options.port):8080
    const seed = options.seed?options.seed:seedGenerator()
    const _path = options.dir


    const server = new Kiwi(port)
    server.start(seed)
    server.router.on('GET', '*', (req, res, params) => {
        const _url = params["*"]
        let reqFile = String(_url).replace(/^\/+|\/+$/g, "");
        if (reqFile === "") {
            reqFile = "index.html";
        }

        const f = _path + '/' + reqFile;
        fs.readFile(f, (err, content) => {
            if (err) {
                console.error(`Error reading file: ${f}`);
                res.writeHead(404);
                res.end("File not found");

            }
            const mime = lookup(reqFile);
            res.writeHead(200, { "Content-Type": mime || "application/octet-stream" });
            res.end(content);
        });
    });
}

main()

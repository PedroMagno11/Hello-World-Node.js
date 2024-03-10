let http = require('node:http');
let fs = require('node:fs');
let url = require('node:url');

const PORT = 8124;

http.createServer((req,res)=>{
    const myURL = new URL(`http://localhost:8124${req.url}`);
    let paramns = myURL.search;
    var name = new URLSearchParams(paramns).get('name');

    if(name == undefined) name = 'world';

    if(name == 'gopher'){
        var file = './gopher.png';
        fs.stat(file, function (err, stat){
            if(err){
                console.error(err);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("Sorry, Burningbird isn't around rigth now \n");
            }
            else{
                var img = fs.readFileSync(file);
                res.contentType = 'image/png';
                res.contentLength = stat.size;
                res.end(img, 'binary');
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Hello ${name} \n`);
    }
}).listen(PORT);

console.log(`Server running at PORT:${PORT}/`);
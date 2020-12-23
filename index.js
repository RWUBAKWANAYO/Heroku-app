const person = require('./person');
// const Person = require('./person')
// const Person1 = new Person('john Doe', 10);

// Person1.greeting();

//const Logger = require('./logger');

const http = require('http');
const path = require('path');
const fs  = require ('fs');
const { ENOENT } = require('constants');

const  server = http.createServer((req, res)=>{
// //     if(req.url === '/api/users'){
// //         fs.readFile(path.join(__dirname, 'public', 'index.html'),(err, content)=>{
// //             if(err) throw err
// //             res.writeHead(200, {'content-Type': 'text/html'})
// //             res.end(content)
// //     })
// // }


// const users = [
// {name:"humble", age:10},
// {name:"bob", age:12}
// ];

// res.writeHead(200, {'content-Type': 'application/json'});
// res.end(JSON.stringify(users))


let filePath = path.join(__dirname, 'public',req.url === '/' ? 'index.html' : req.url)

    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch(extname){
        case  '.js':
            contentType = 'text/javaScript';
            break;
            case  '.css':
                contentType = 'text/css';
                break;
                case  '.json':
                    contentType = 'application/json';
                    break;
                    case  '.png':
                        contentType = 'image/png';
                        break;
    }

    fs.readFile(filePath, (err, content)=>{
        if(err) {
           if(err.code ==ENOENT) {

            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=>{
                res.writeHead(200, {'content-Type': 'text/html'});  
                res.end(content, 'utf8');
            })

           }
           else{
               res.writeHead(500);
               res.end(`Serwer Error : ${err.code}`)
           }
        }
        else{
            res.writeHead(200, {'content-Type': contentType});
            res.end(content, 'utf8');
        }
    })
})
        


const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
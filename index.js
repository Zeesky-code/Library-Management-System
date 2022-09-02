const http = require("http");
const path = require("path");
const { readFileSync } = require('fs');

const {authenticateUser} = require("./authenticate")
// get all files
const homePage = readFileSync(path.join(__dirname, "public", "index.html"))
const homeStyles = readFileSync(path.join(__dirname, "public","css" ,"style.css"))
const loginPage = readFileSync(path.join(__dirname, "public", "login.html"))
const loginStyles = readFileSync(path.join(__dirname, "public","css" ,"login.css"))

const hostname = 'localhost';
const port = 8000;
const server = http.createServer((req, res) => {
    switch (req.url){
        case '/':
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(homePage)
            res.end()
            break;
        case '/css/style.css':
            res.writeHead(200, { 'content-type': 'text/css' })
            res.write(homeStyles)
            res.end()
            break;
        case '/css/login.css':
            res.writeHead(200, { 'content-type': 'text/css' })
            res.write(loginStyles)
            res.end()
            break;
        case '/login':
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(loginPage)
            res.end()
            break;
        case '/auth':
            authenticateUser(req, res)
                .then(()=> {
                    res.write('Welcome')
                }).catch((err)=> {
                    res.writeHead(400)
                    res.end(JSON.stringify({
                        message: err
                    }))
                })
            break;
        default:
            res.writeHead(404, { 'content-type': 'text/html' })
            res.write('<h1>page not found</h1>')
            res.end()
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
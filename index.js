const express = require('express')
const bodyParser = require('body-parser')

const booksRoute = require('./routes/books');
const authorRoute = require('./routes/authors');

const port = 8000;
const app = express();

app.use(express.static('public'))
app.use(bodyParser.json())

//setting express to use the database

app.use('/books', booksRoute);
app.use('/authors', authorRoute)



const hostname = 'localhost';

//routes with express
app.get('/', (req, res)=>{
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(homePage)
    res.end()
})
app.get('/auth', (req, res)=>{
    authenticateUser(req, res)
        .then(()=> {
            res.write('Welcome')
        }).catch((err)=> {
            res.writeHead(400)
            res.end(JSON.stringify({
                message: err
            }))
        })
})



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
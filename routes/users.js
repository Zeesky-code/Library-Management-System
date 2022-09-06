const { application } = require('express')
const express = require('express')

const userRouter = express.Router()

const users=[
    {
        "username": "Zainab",
        "password": "sillyfish1"
    },
    {
        "username": "Julius",
        "password": "catinahat23"
    }
]

userRouter.get('/', (req,res)=>{
    res.json(users)
})

userRouter.post('/', (req,res)=>{
    const user = req.body
    users.push(user)
    res.json(user)
})

userRouter.post('/auth',(req,res)=>{
    res.send("Hello Sucker")
})
module.exports = userRouter
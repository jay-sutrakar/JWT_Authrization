require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
const posts = [
    {
        "author":"jay",
        "post":"post 1"
    },
    {
        "author":"jay",
        "post":"post 2"
    },
    {
        "author":"vijay",
        "post":"post 3"
    }
]

app.get('/posts', authenticateToken, (req,res) => {
    res.json(posts.filter(post => post.author === req.user.name))
})

app.listen(4000,()=>{
    console.log('server is listining on port 4000')
})


function authenticateToken(req, res, next )  {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
    
}
const express = require("express")
const messageRouter = require('./messageRoute')
const whatsappclient = require('./whatsapp')

whatsappclient.initialize().then(()=>{
    app.use(messageRouter)
})

const app = express()
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('home')
})

app.listen(4000, () => console.log(`Server is ready in on port 4000 `))

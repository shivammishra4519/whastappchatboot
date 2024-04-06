const express = require('express');
const router = new express.Router();
const whatsappclient = require("./whatsapp")

// router.get('/', (req, res) => {
//   res.send('Hello World!');
// });

router.post("/message", async(req, res) => {
    const number=`${req.body.phoneNumber}@c.us`
    console.log(number)
   whatsappclient.sendMessage(number, req.body.message).then(() => {
    // console.log('Message sent successfully!');
    res.send('Message sent successfully!');
})
.catch((error) => {
    res.send("message not sended ");
});
  
  
})


router.get("/getmesaage", async (req, res) => {
    // Extract necessary information from query parameters or request headers
    const phoneNumber = req.query.phoneNumber;
   const len=phoneNumber.length;
    const message = req.query.message;

    if (!phoneNumber || !message) {
        // If phoneNumber or message is missing, send an error response

        return res.status(400).send("Missing phoneNumber or message in query parameters");
    }
    if(len >10 || len <10){
        return res.send('please check the number')
    }

    const number = `91${phoneNumber}@c.us`;
    console.log(number);

    whatsappclient.sendMessage(number, message)
        .then(() => {
            res.send('Message sent successfully!');
        })
        .catch((error) => {
            res.status(500).send("Failed to send message");
        });
});


module.exports = router;
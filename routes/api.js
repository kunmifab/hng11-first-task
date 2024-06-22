const express = require('express');
const router = express.Router();
const IP = require('ip');

router.get('/hello', async(req, res) => {
    if(req.query.visitor_name){
        return res.send({
            client_ip: IP.address(),
            greeting: `Hello, ${req.query.visitor_name}!`,
        }).status(200);
    }else{
        return res.send('Incorrect Information provided. Please add a visitor name').status(401);
    }
});

module.exports = router;


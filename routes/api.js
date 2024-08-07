const express = require('express');
const router = express.Router();
const IP = require('ip');
const requestIp = require('request-ip');
const axios = require('axios');

router.get('/hello', async(req, res) => {
    if(req.query.visitor_name){
        try{
            var getIP = require('ipware')().get_ip;
            var ipInfo = getIP(req);
            const visitor_name = req.query.visitor_name.replace(/["']/g, '');
            var clientIp = requestIp.getClientIp(req);
            // console.log(ipInfo.clientIp);
            const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=782a8ddf235f4df58088847e647a942b&ip=${clientIp}`);
            const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${geoResponse.data.latitude}&longitude=${geoResponse.data.longitude}&hourly=temperature_2m`);
            const weather = weatherResponse.data;
            return res.send({
                client_ip: clientIp,
                location: geoResponse.data.state_prov,
                greeting: `Hello, ${visitor_name}!, the temperature is ${weather.hourly.temperature_2m[0]} degrees Celcius in ${geoResponse.data.state_prov}`,
            }).status(200);
        }catch(error){
            return res.send(error).status(500);
        }
    }else{
        return res.send('Incorrect Information provided. Please add a visitor name').status(401);
    }
});

module.exports = router;


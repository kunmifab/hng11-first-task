const express = require('express');
const router = express.Router();
const IP = require('ip');
const axios = require('axios');

router.get('/hello', async(req, res) => {
    if(req.query.visitor_name){
        try{
            const visitor_name = req.query.visitor_name.replace(/["']/g, '');
            const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=782a8ddf235f4df58088847e647a942b&ip=${IP.address()}`);
            const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${geoResponse.data.latitude}&longitude=${geoResponse.data.longitude}&hourly=temperature_2m`);
            const weather = weatherResponse.data;
            return res.send({
                client_ip: IP.address(),
                location: geoResponse.data.city,
                greeting: `Hello, ${visitor_name}!, the temperature is ${weather.hourly.temperature_2m[0]} degrees Celcius in ${geoResponse.data.city}`,
            }).status(200);
        }catch(error){
            return res.send('Internal Error, Please try again').status(500);
        }
    }else{
        return res.send('Incorrect Information provided. Please add a visitor name').status(401);
    }
});

module.exports = router;


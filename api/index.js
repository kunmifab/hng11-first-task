const express = require('express');
const app = express();
const api = require('../routes/api');

// Middleware to get client IP address
app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.clientIp = clientIp;
    next();
  });
app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
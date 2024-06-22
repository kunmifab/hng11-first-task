const express = require('express');
const app = express();
const api = require('./routes/api');

app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
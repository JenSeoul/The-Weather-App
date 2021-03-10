const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const { request } = require('http');

const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '1mb' }));

app.get('/weather/:latlong', async (req,res) => {
    console.log(req.params);
    const latlong = req.params.latlong.split(',');
    let lat = latlong[0];
    let long = latlong[1];
    
    const api_key = process.env.api_key;
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;
    
    const fetch_response = await fetch(api);
    const data = await fetch_response.json()
    res.json(data)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {console.log(`Server is running on PORT: ${PORT}`)})
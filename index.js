const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();


const port = process.env.PORT || 3000;

//create the server instance and assign the port
app.listen(port, ()=> {
    console.log(`Listening on ${port}`);
});

app.use(express.urlencoded({
    extended: true
}));

//serve static pages from the folder public
app.use(express.static('public'));

//limit request data sizes to prevent flooding
app.use(express.json({
    limit: '1mb'
}));

app.get('/', (request, response) => {
    response.redirect('homepage.html');
})



app.get('/trains', async (request, response) => {

    const apiKey = process.env.API_KEY;
    const appID = "b74798d6";
    const stationCRS = "WHP"; //west hampstead thameslink
    const calling_at = "STP"; //St Pancras
    const baseURL = "https://transportapi.com/v3/uk/train/station/WHP/live.json?";


    const api_url = `https://transportapi.com/v3/uk/train/station/${stationCRS}/live.json?app_id=${appID}&app_key=${apiKey}&darwin=false&calling_at=${calling_at}&train_status=passenger`;
    const fetch_response = await fetch(api_url);
    const jsonData = await fetch_response.json();
    response.json(jsonData);

});




const axios = require('axios');
const express = require('express');
const schedule = require('node-schedule');

const app = express();
const port = 3000;
const newsApiRoute = 'http://newsapi.org/v2/everything?q=rich&sortBy=publishedAt&apiKey=';
const newsApiKey = '6633de5b30b74366b611995131df0058';

//array que gaurda la apicall
let newsData = [];

//hace el trabajo, recibe la llamada del navegador o tercero a mi servidor y devuelve newData
app.get('/', (req, res) => {
    res.send(newsData);
});
  
app.listen(port, () => {
    console.log(`Hola bruno http://localhost:${port}`);
});

//cada 'N minutos guarda el valor en la variable newData
const getNewsJob = schedule.scheduleJob('1 * * * *', function () {
    console.log('Trae las noticias cada 1 minuto')
    axios.get(`${newsApiRoute}${newsApiKey}`)
      .then((response) => newsData=response.data)
      .catch((error) => console.log(error)); 
});
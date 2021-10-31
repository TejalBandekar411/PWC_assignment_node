const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(function (req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-allow-Methods', 'PUT, POST, PATCH, DELETE');
      return res.status(200).json({});
  }
  next();
});

app.get('/users', async (request, response) => {
  const weather_url = `https://jsonplaceholder.typicode.com/users`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  response.json(weather_data);
});
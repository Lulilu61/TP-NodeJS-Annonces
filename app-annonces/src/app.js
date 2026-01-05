const express = require('express'); //récupère la librairie express
const app = express(); // instance de express 
const port = 3000;
const initRoutes = require('./routes');

app.use(express.json());

initRoutes(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

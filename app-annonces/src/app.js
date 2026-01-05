const express = require('express'); 
const app = express(); 
const PORT = process.env.PORT;
const initRoutes = require('dotenv').config();


app.use(express.json());

initRoutes(app);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

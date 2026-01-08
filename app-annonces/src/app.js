const express = require('express'); 
require('dotenv').config(); 
const app = express(); 
const PORT = process.env.PORT || 3000;

const initRoutes = require('./routes/index'); 

app.use(express.json());

initRoutes(app);

// On ne lance le serveur QUE si on n'est pas en train de faire des tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
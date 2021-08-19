const config = require('./server/config');
const express = require('express');


// base de datos socialsuecia
require('./database');

const app = config(express());


// Activando el servidornode
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
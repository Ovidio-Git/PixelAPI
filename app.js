require('./database');
const express = require('express');
const app     = express();
const models  = require('./Models/characters');
const bp      = require('body-parser');
const port    = 3000;

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }));
// parse application/json
app.use(bp.json());



// CREATE 
app.post('/inventory', (request, response) => {
    const instanceCharacter = new models.character(request.body);
    try {
        instanceCharacter.save();
    } catch (err) {
        console.log("[ERROR] Data not inserted in collection");
        console.log(err);
        response.status(500).send(error);
    }
    response.json({"Response": "Data inseted in character collection"});
    console.log("Data inserted");
    console.log(request.body);
});

// READ
app.get('/', (request, response) => {
    response.json({"Response": "Welcome to DataPixel API"});
});
app.get('/', (request, response) => {
    const instanceCharacter = new models.character();
});



// UPDATE
app.put('/', (request, response) => {
    const instanceCharacter = new models.character();
});


// DELETE
app.delete('/', (request, response) => {
    const instance = new models.character();
});


// SERVER UP
app.listen(port,() => {
    console.log(`[OK] Server Running on http://127.0.0.1:${port}`)
});
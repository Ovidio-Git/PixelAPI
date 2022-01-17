require('./database');
const express = require('express');
const app     = express();
const modelRegisters  = require('./Models/registers');
const bp      = require('body-parser');
const port    = 3000;

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }));
// parse application/json
app.use(bp.json());



// CREATE 
app.post('/inventory', (request, response) => {
    const instanceRegisters = new modelRegisters(request.body);
    try {
        instanceRegisters.save();
    } catch (err) {
        response.status(500).send(err);
    }
    response.json({"Response": "Data inseted in character collection"});
    console.log("[OK] Data inserted");
    console.log(request.body);
});

// READ
app.get('/', (request, response) => {
    response.json({"Response": "Welcome to DataPixel API"});
});
app.get('/registersinventory', (request, response) => {
        modelRegisters.find({}).exec(function(err, dataResponse) {
        if (err){
            response.status(500).send(err);
        }
        else{
            response.send(dataResponse);
        }
    })
});



// UPDATE
app.put('/', (request, response) => {
    const instanceRegisters = new modelRegisters();
});


// DELETE
app.delete('/', (request, response) => {
    const instanceRegisters = new modelRegisters();
}); 


// SERVER UP
app.listen(port,() => {
    console.log(`[OK] Server Running on http://127.0.0.1:${port}`)
});
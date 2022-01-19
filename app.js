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
        response.status(500).send({"Response" : "Bug found", "Bug details" : err});
    }
    response.send({"Response" : "Sucesss", "Response details" : "Data inserted in character collection"});
    console.log("[OK] Data inserted");
    console.log(request.body);
});


// READ
app.get('/', (request, response) => {
    response.send({"Response" : "Sucesss", "Response details" : "Welcome to DataPixel API"});
});

app.get('/registersinventory', (request, response) => {
        modelRegisters.find({}).exec(function(err, dataResponse) {
        if (err){
            response.status(500).send({"Response" : "Bug found", "Bug details" : err});
        }
        else{
            response.send({"Response" : "Sucesss", "Response details" : dataResponse});
        }
    })
});

app.get('/inventory/:filter', (request, response) => {
    modelRegisters.find({}).distinct(request.params.filter).exec(function(err, dataResponse) {
        if (err){
            response.status(500).send({"Response" : "Bug found", "Bug details" : err});
        }
        else{
            response.send({"Response" : "Sucesss", "Response details" : dataResponse});
        }
    })
});

app.get('/inventory/animation/:option', (request, response) => {
    const conversorString = {"yes" : true, "not":false}
    modelRegisters.find({"animation": conversorString[request.params.option]}).exec(function(err, dataResponse) {
        if (err){
            response.status(500).send({"Response" : "Bug found", "Bug details" : err});
        }
        else{
            response.send({"Response" : "Sucesss", "Response details" : dataResponse});
        }
    })
});





// UPDATE
app.put('/inventory/:id', (request, response) => {
    try {
        modelRegisters.findOneAndUpdate({"_id": request.params.id}, request.body).then(data => {console.log("[PROCESS] Updating data")}).catch(err => console.error(err));
    } catch (err) {
        response.status(500).json({"Response" : "Bug found", "Bug details" : er});
    }
    console.log("[OK] Succesful process")
    modelRegisters.find({"_id": request.params.id}).exec(function(err, dataResponse) {
        if (err){
            response.status(500).send({"Response" : "Bug found", "Bug details" : err});
        }
        else{
            response.send({"Response" : " Updated data", "Updated resgister" : dataResponse});
        }
    })
});



// DELETE
app.delete('/inventory/:id', (request, response) => {
    try {
        modelRegisters.findOneAndDelete({"_id": request.params.id}, request.body).then(data => {console.log("[PROCESS] Deleting data\n" + data)}).catch(err => console.error(err));
    } catch (err) {
        response.status(500).json({"Response" : "Bug found", "Bug details" : er});
    }
    response.send({"Response" : "Deleted data"})
});


// SERVER UP
app.listen(port,() => {
    console.log(`[OK] Server Running on http://127.0.0.1:${port}`)
});
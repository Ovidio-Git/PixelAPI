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



// CREATE REGISTER
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


// READ REGISTERS

// show endpoints details
app.get('/info', (request, response) => {
    response.send({"Response" : "Sucesss", 
                    "Response details" : {
                                            "Welcome next yo can see all api enpoints" : {
                                                                                            "/":"show welcome message",
                                                                                            "/info" : "details endpoints",
                                                                                            "/registersinventory":"show all registers",
                                                                                            "/inventory/[filter]":"show uniques values filtered by keys",
                                                                                            "/inventory/animation/[option (yes/not)]":"show registers filtered by animation",
                                                                                            "/inventory/[id Register for Update]":"Update Register",
                                                                                            "/inventory/[id Register for Delete]":"Delete Register",
                                                                                        } 
                                        }
            });
});

// show welcome message
app.get('/', (request, response) => {
    response.send({"Response" : "Sucesss", "Response details" : "Welcome to DataPixel API"});
});

// show all registers
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

// show uniques values filtered by keys
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

// show registers filtered by animation
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





// UPDATE REGISTER
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



// DELETE REGISTER
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
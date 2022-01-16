

const express = require('express');
const app     = express();
const port    = 3000;
const models  = require('./Models/characters');
require('./database');



const instance = new models.character();
instance.aka  = 'funky';
instance.side = 'dark';
instance.save
app.get('/', (req, res) => {
    res.json({  "name": "pixelapi","version": "1.0.0",})
});

app.listen(port,() => {
    console.log(`[OK] Server Running on http://127.0.0.1:${port}`)
});
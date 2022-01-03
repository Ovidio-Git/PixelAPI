

const express = require('express')
const app  = express()
const port = 3000
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'DataPixel';

app.get('/', (req, res) => {
    res.json({  "name": "pixelapi","version": "1.0.0",})
});

app.listen(port,() => {
    console.log(`Running on http://127.0.0.1:${port}`)
});
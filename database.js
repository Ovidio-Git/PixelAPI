
const credential = require('./credentials')
const mongoose = require('mongoose');

mongoose.connect(credential.URIDB,{ 
        useNewUrlParser: true, 
        dbName: 'DataPixel' 
}).then(database => console.log('[OK] Database is conected')).catch(err => console.log(err))
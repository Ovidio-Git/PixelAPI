const USERNAME = 'root';
const PASSWORD = 'root';
const PORTDB   = 27017;
const URIDB    = `mongodb://${USERNAME}:${PASSWORD}@mongo:${PORTDB}`;
module.exports = { URIDB };

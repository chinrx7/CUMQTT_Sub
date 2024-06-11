const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./configuration/config.json', 'utf8'));

exports.config = config;
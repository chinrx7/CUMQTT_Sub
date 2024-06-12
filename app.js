const { log } = require('console');
const logger = require('./middleware/log');
const fs = require('fs');
const mqtt = require('mqtt');
const SendAPI = require('./middleware/send');
const axios = require('axios');

const cfg = JSON.parse(fs.readFileSync('configuration/mqtt.json'));

const options = {
    host: cfg.host,
    port: cfg.port,
    protocol: cfg.protocol,
    username: cfg.username,
    password: cfg.password
}

const client = mqtt.connect(options);

client.on('connect', () => {
    logger.loginfo(`connected to MQTT host : ${cfg.host}`);
});

client.on('error', (err) => {
    logger.loginfo(err);
});

client.on('message', async (topic, message) => {
    console.log(topic, message.toString());
    if(topic.includes('_st')){
        const spt = topic.split('/');
        const nspt = spt[1].split('_');
        const CBName = nspt[0] + '.status';

        logger.loginfo(`Status receive ${CBName} ${message.toString()}`)
        await SendAPI.SendData(CBName, message.toString());
    }
});

client.subscribe('cusolar/#');

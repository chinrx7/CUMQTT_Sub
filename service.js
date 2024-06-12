var Service = require('node-windows').Service;
var svc = new Service({
    name:'CU Solar MQTT',
    description: 'Service sub data from MQTT',
    script: 'C:\\PvvApp\\CUMQTT_SUB\\app.js'
});

svc.on('install',function(){
    svc.start();
});

svc.install();
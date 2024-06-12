const axios = require('axios');
const { config } = require('./cfg');
const logger = require('./log');

const url = config.APIUrl;

let TKN;

module.exports.SendData = async (CBName, Val) => {
    TKN = await getToken();
    await SendData(CBName, Val);
}

getToken = async () => {
    let token;
    const body = { user: "Solarsys", password: "PP@@ssw0rd555" };
    await axios.post(url + 'authen', body)
        .then(function (res) {
            token = res.data.Access.Token
        })

    return token;
}

SendData = async (Name, Val) => {
    let rdatas = [];
    const tmp = new Date;
    const rdata = {
        Name: Name,
        Value: Val,
        Unit: '-',
        TimeStamp: tmp
    }

    rdatas.push(rdata)

    await axios.post(url + 'updatedata', rdatas, { headers: { Authorization: TKN } });

    let hdatas = [];
    const hdata = {
        Name: Name,
        Records:[
            {
                Value: Val,
                TimeStamp: tmp
            }
        ]
    }

    hdatas.push(hdata);

    await axios.post(url + 'inserthis', hdatas, { headers: { Authorization: TKN } });
    logger.loginfo(`${Name} send data to api success`);
}
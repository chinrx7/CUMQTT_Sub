const axios = require('axios');
const { config } = require('./cfg');

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
            console.log(res)
            token = res.data.Access.Token
        })

    return token;
}

SendData = async (Name, Val) => {
    let datas = [];
    const data = {
        Name: Name,
        Value: Val,
        Unit: '-',
        TimeStamp: new Date
    }

    datas.push(data)

    await axios.post(url + 'updatedata', datas, { headers: { Authorization: TKN } });

}
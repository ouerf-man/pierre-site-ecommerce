const mongoose = require('mongoose');
/* const fs = require('fs');
const path = require('path'); */
const secrets = require('../utils/secrets');

const connectionOpt = {};

/*if (secrets.ENV === 'production' || secrets.ENV === 'staging') {
    const pemFilePath = path.resolve(__dirname, '../utils/rds-combined-ca-bundle.pem');
    const pemFile = fs.readFileSync(pemFilePath);
    if (!pemFile) {
        console.log('DB connection failed: Certificate file not found');
        return;
    }
    const ca = [pemFile];

    connectionOpt.useNewUrlParser = true;
    connectionOpt.useFindAndModify = false;
    connectionOpt.useCreateIndex = true;
    connectionOpt.useUnifiedTopology = true;
    connectionOpt.ssl = true;
    connectionOpt.sslValidate = true;
    connectionOpt.sslCA = ca;
} else {
    connectionOpt.useNewUrlParser = true;
    connectionOpt.useFindAndModify = false;
    connectionOpt.useCreateIndex = true;
    connectionOpt.useUnifiedTopology = true;
}*/

connectionOpt.useNewUrlParser = true;
connectionOpt.useFindAndModify = false;
connectionOpt.useCreateIndex = true;
connectionOpt.useUnifiedTopology = true;

const establishConnection = () => {
    mongoose.connect(secrets.MONGODB_URI, connectionOpt);

    mongoose.connection.on('error', err => {
        console.log(`Database connection error: ${err}`);
    });

    mongoose.connection.on('connected', () => {
        console.log('Successfully connected to database');
    });
}

module.exports = {
    establishConnection
}

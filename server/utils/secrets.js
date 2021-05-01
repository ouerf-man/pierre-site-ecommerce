const dotenv = require('dotenv');
const path = require('path');

const envirnoment = process.env.NODE_ENV || 'development';

if (envirnoment === 'development') {
    dotenv.config({ path: path.resolve(__dirname, '../.env.dev') });
}else if (process.env.name=='stagin-api'){
    dotenv.config({path: path.resolve(__dirname,'../.env.staging') })
}
else{
    dotenv.config({ path: path.resolve(__dirname, '../.env.prod') });
}

module.exports = {
    ENV: envirnoment,
    MONGODB_URI: process.env.DATABASE_URL,
    /* SMTP: {
        SECRET_KEY: process.env.SMTP_SECRET_KEY,
        PASSWORD: process.env.SMTP_PASSWORD,
        FROM_EMAIL: process.env.SMTP_EMAIL
    }, */
    /* PAYPAL: {
        CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
        CLIENT_SECRET: process.env.PAYPAL_SECRET
    }, */
    /* ADMIN:{
        email : process.env.ADMIN_EMAIL,
        password : process.env.ADMIN_PASSWORD
    }, */
    secretOrKey: "secret",
    API_HOST: process.env.API_HOST,
    LANDING_PAGE_HOST : process.env.LANDING_PAGE,
}
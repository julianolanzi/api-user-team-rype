const dotenv = require('dotenv');

module.exports = {
    DATABASE: process.env.DATABASE,
    SECRET: process.env.SECRET,

    
    TEMPLATE_ID: 'd-d091cde78aca4507bd31aaad3cf77efd',
    APP: 'http://localhost:3000',
    registerEmailId: 'd-8871a7a9e7184ab1b3538c24f4fa1d0d',
    resertPassword: 'd-bc875d91c4dd49a7b44b356e8e386db4',
    application: 'http://localhost:3000',

    SENDGRID:{
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    },


}
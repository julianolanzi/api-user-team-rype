const configs = require('../../config/configs');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(configs.SENDGRID.SENDGRID_API_KEY);

exports.registerMessage = (user) => {
    return {
        to: user.email,
        from: {
            name: 'RypeGG',
            email: 'contato@rypegg.com'
        },
        templateId: configs.registerEmailId,
        dynamicTemplateData: {
            nickname: user.nickname,
            name: user.name,
            // phone: user.phone[0].cell,
            email: user.email

        }
    };
}

exports.forgotPassword = (user, url) => {
 
    return {
        to: user.email,
        from: {
            name: 'RypeGG',
            email: 'contato@rypegg.com'
        },
        templateId: configs.resertPassword,
        dynamicTemplateData: {
            url: url

        }
    };
}

exports.sendEmail = async (message) => {
    try {
        const response = await sendgrid.send(message);
        console.log(response);
        console.log('Email successfully sent');
    } catch (error) {
        console.error(error)
    }
}

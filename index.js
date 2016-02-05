console.log('Gellin - https://github.com/gellin');
console.log('Lambda/SES Email Forwarder sendEmail - Version 1.0.0');

var aws = require('aws-sdk');
var ses = new aws.SES();

exports.handler = function (event, context) {
    if (!event.to && !event.cc && !event.bcc) {
        context.fail('Missing argument: to|cc|bcc');
        return;
    }
    
    if (!event.subject) {
        context.fail('Missing argument: subject');
    }
    
    if (!event.from) {
        context.fail('Missing argument: from');
    }

    if (!event.text && !event.html) {
        context.fail('Missing argument: text|html');
    }

    var to = event.to;
    var bcc = event.bcc;
    var cc = event.cc;
    var from = event.from;
    var subject = event.subject;
    var textBody = event.text;
    var htmlBody = event.html;
    
    var messageOptions = {
        Destination: {
            BccAddresses: bcc ? bcc : '',
            ToAddresses: to ? to : '',
            CcAddresses: cc ? cc : ''
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: 'UTF-8'
            }, 
        },
        Source: from,
        ReplyToAddresses: [
            from,
        ]
    };
    
    messageOptions.Message.Body = {
        Html: {
            Data: htmlBody ? htmlBody : '',
            Charset: 'UTF-8'
        },
        Text: {
            Data: textBody ? textBody : '',
            Charset: 'UTF-8'
        }
    };
  
    ses.sendEmail(messageOptions, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('The email failed to send');
        } else {
            context.succeed('The email was successfully sent');
        }
    });
};
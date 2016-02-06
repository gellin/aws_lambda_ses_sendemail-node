# lambda_node_ses_email_forwarder_sendemail
* The goal for this project is to provide a backend for sending out e-mails (without an attachment) using Amazon SES, running on AWS Lambda + Node.JS
* This code only supports 50 recipients, a recipient is any to/cc/bcc address.
* If you need attachments checkout this version instead - [lambda sendrawemail ses](https://github.com/gellin/lambda_node_ses_email_forwarder_sendrawemail)

## Useage 
Input event data

* **to** / **cc** / **bcc** - You must use atleast one of these
* **subject** - The subject line
* **html** - The html version of the email body
* **text** - The text version of the email body
* **from** - Your verified sender address

```json
{
  "to": [
    "to-sample@example.com",
    "to-sample2@example.com"
  ],
  "bcc": [
    "bcc-sample@example.com",
    "bcc-sample2@example.com"
  ],
  "cc": [
    "cc-sample@example.com",
    "cc-sample2@example.com"
  ],
  "subject": "λ SES Node Test λλλ",
  "html": "<br><h1>Hello world!!!!!</h1> - from lambda",
  "text": "Hello world!!!!! - from lambda",
  "from": "YOUR_VERIFIED_SENDER_ADDRESS"
}
```

## Installation & Setup
1. Extract the code to your computer, or copy it from git, then create a new lambda function using [index.js](index.js) as your source code.
2. Create a new IAM access role with the following policy

```json
{  
   "Version":"2012-10-17",
   "Statement":[  
      {  
         "Effect":"Allow",
         "Action":[  
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
         ],
         "Resource":"arn:aws:logs:*:*:*"
      },
      {  
         "Effect":"Allow",
         "Action":[  
            "ses:SendEmail"
         ],
         "Resource":"*"
      }
   ]
}
```


## Credits
* Amazon AWS SDK for JavaScrtipt in Node.js

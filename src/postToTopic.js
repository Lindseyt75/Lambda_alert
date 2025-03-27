const { sendMessageToSNS, sendResponse } = require('../utils');

const handler = async (event) => {
  const body = JSON.parse(event.body);
  const message = body.message;
  const topicArn = process.env.TOPIC_ARN;  // Add topic ARN to .env file

  try {
    await sendMessageToSNS(message, topicArn);
    return sendResponse(200, { message: 'Message sent to SNS topic' });
  } catch (error) {
    console.error('Error sending message to SNS:', error);
    return sendResponse(500, { message: 'Error sending message to SNS' });
  }
};

module.exports = { handler };

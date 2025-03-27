const { sendResponse } = require('../utils');
const axios = require('axios');

const handler = async (event) => {
  const snsMessage = event.Records[0].Sns.Message;
  console.log('Received message from SNS:', snsMessage);

  const slackUrl = process.env.SLACK_URL;
  const payload = {
    text: snsMessage,
  };

  try {
    const response = await axios.post(slackUrl, payload);
    console.log('Posted to Slack:', response.data);
    return sendResponse(200, { message: 'Message sent to Slack' });
  } catch (error) {
    console.error('Error posting to Slack:', error);
    return sendResponse(500, { message: 'Error posting to Slack' });
  }
};

module.exports = { handler };

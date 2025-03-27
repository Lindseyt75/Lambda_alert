// This is an additional handler if you want to invoke Slack posting from an HTTP API.
const axios = require('axios');

const handler = async (event) => {
  const body = JSON.parse(event.body);
  const slackUrl = process.env.SLACK_URL;
  const payload = {
    text: body.message,
  };

  try {
    await axios.post(slackUrl, payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent to Slack' }),
    };
  } catch (error) {
    console.error('Error posting to Slack:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error posting to Slack' }),
    };
  }
};

module.exports = { handler };

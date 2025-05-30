require('dotenv').config();
const { WebClient } = require('@slack/web-api');

const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const channel = process.env.CHANNEL_ID;

(async () => {
  try {
    // 1 Send a Message
    const sendRes = await web.chat.postMessage({
      channel,
      text: 'Hello from your bot!',
    });
    console.log('Sent Message:', sendRes.ts);

    // 2 Edit the Message
    const editRes = await web.chat.update({
      channel,
      ts: sendRes.ts,
      text: 'Hello from your updated bot message!',
    });
    console.log('Edited Message');

    // 3 Schedule a Message (5 minutes from now)
    const postAt = Math.floor(Date.now() / 1000) + 300;
    const scheduleRes = await web.chat.scheduleMessage({
      channel,
      post_at: postAt,
      text: 'This is a scheduled message sent by a bot!',
    });
    console.log('Scheduled Message ID:', scheduleRes.scheduled_message_id);

    // 4 Retrieve Message History
    const historyRes = await web.conversations.history({
      channel,
      limit: 5,
    });
    console.log('Retrieved Messages:', historyRes.messages.map(m => m.text));

    // 5 Delete the original sent message
    // const deleteRes = await web.chat.delete({
    //   channel,
    //   ts: sendRes.ts,
    // });
    // console.log('Deleted Original Message');

  } catch (error) {
    console.error('❌ Error:', error.data || error);
  }
})();

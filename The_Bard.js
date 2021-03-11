//node The_Bard.js

import Discord from 'discord.js'
import fs from 'fs'

//read access keys and tokens of the bot account from file outside the root dir of this bot (and outside of the git repo folder)
keys = JSON.parse(fs.readFileSync('../bot_keys.json'))

console.log('starting up The Bard...')
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

//push in the keys variable
client.login('token');

console.log('running The Bard...')
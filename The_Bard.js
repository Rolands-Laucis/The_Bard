//node The_Bard.js

import Discord from 'discord.js'
import fs from 'fs'

//read access keys and tokens of the bot account from file outside the root dir of this bot (and outside of the git repo folder)
var token = JSON.parse(fs.readFileSync('../keys.json'))

console.log('starting up The Bard...')
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.id != "821327316290502706"){
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }

    var reply = ParseCommand(msg)

    if (reply != "") {
      msg.channel.send(reply)
        .then(() => console.log(`Sent a reply to ${msg.author.username}`))
        .catch(console.error);
    }
  }

});


var cmdPrefix = '!'
var commands = {
  "cmd functions": {
    "help": Help,
    "embed": EmbedCmd
  },
  "cmd descriptions":{
    "help": "Lists all available bot commands and their descriptions, usage.",
    "embed": "Prints sample embed."
  }
}

function ParseCommand(msg) {
  var text = msg.content
  if (text[0] == cmdPrefix) {
    var cmd = text.split(' ')[0].replace(cmdPrefix, '') //removes the prefix
    return commands['cmd functions'][cmd](msg)
  } else {
    return ""
  }
}

function Help(){
  var msg = "\n"
  Object.keys(commands['cmd descriptions']).forEach(key => {
    msg += "``" + cmdPrefix + key + "`` : " + commands['cmd descriptions'][key] + "\n"
  });
  return msg
}

function EmbedCmd(msg) {
  var exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(msg.author.username + '\'s stats')
    
    //these should be read from a .json local file or database, because we know msg.author.id and msg.author.username. Should be easy to fetch all this data for the "value" part:
    .addFields(
      { name: 'Influence', value: '#5' },
      { name: 'Coins', value: '100', inline: true },
      { name: 'Favorite emoji', value: '😂', inline: true },
      { name: 'Others react with', value: '🤡', inline: true } //unicode ir sarežģīts iekš js, jo sastāv no vairākiem \uF269 char kā kuram emoji. Jāskatās, ko discord.js atgriež, kad bots strādā ar emoji un tas jāizmanto.
    )
    .setTimestamp()
  
  console.log("Sending out embed message...")
  msg.channel.send(exampleEmbed)
  return ""
}

//push in the keys variable
client.login(token);

console.log('running The Bard...')
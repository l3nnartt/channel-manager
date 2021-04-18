const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const { FILTER_LIST, prefix, token } = require('./config.json');
const db = require('quick.db');
const config = require('./config.json')

Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        skipTimer: false, // only skip if user used leave command
        loopSong: false,
        loopQueue: false,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: prefix,
	owner: '137259014986792960',
});

client.registry
.registerDefaultTypes()
.registerGroups([
  ['scar', ':gear: Serverbefehle:'],
  ['csgostats', ':gear: CSGOStats:'],
  ['musik', ':notes: Musikbefehle:'],
  ['rollen', ':notes: Rollenbefehle:'],
  ['utility', ':loud_sound: Zusätzliche Befehle:']
])
.registerDefaultGroups()
.registerDefaultCommands({
  eval: false,
  prefix: false,
  commandState: false
})
.registerCommandsIn(path.join(__dirname, 'commands'));

// ❯ Rich Presence/RPC
setInterval(() => {
  const activities = [
      `-help | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Mitglieder`,
      `-help | ${client.channels.cache.size} Channel`
  ];
  let activity = activities[Math.floor(Math.random() * activities.length)];
  client.user.setActivity(
      activity,
      {
        type: "LISTENING"
      }
  );
}, 15000);

// ❯ Bot ist online
client.on('ready', () => {
  console.log(' ')
  console.log('┌──────────────────────────────────── Login ─────────────────────────────────────────┐')
  console.log(`│ > Eingeloggt als ${client.user.tag}!                                                 │`);
  console.log('├──────────────────────────────────── Anzahl ────────────────────────────────────────┤')
  console.log(`│ > Aktiv auf ${client.guilds.cache.size} Servern!                                                             │`)
  console.log('│──────────────────────────────────── Server ────────────────────────────────────────│')
  let content = "";
  let s = "";
    client.guilds.cache.forEach((guild) => {
    let spaces = 85 - (`│ > ${guild.name} | ${guild.memberCount} Mitglieder`).length
    s += 1
    if(s > Number(client.guilds.cache.size)-2){
      content += `\n│`

    } else {
      content += '│'
    }
    content += ` > ${guild.name} | ${guild.memberCount} Mitglieder`

    for (i = 0; i < spaces; i++) { 
      content += ' '
    }
          content += '│'
  })
  console.log(content)
  console.log('└────────────────────────────────────────────────────────────────────────────────────┘	')
  console.log(' ')
})

// ❯ Chatguard
client.on('message', message => {
  if(FILTER_LIST.some(word => message.content.toLowerCase().includes(word))){
    var logembed = new Discord.MessageEmbed()
      .setTitle(`Zur Nachricht springen`)
      .setURL(`${message.url}`)
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setDescription(`${message.content}`)
      .setTimestamp(message.createdAt)
      .setFooter(`${client.user.username} Log-System`)
      .setColor("#2a2a2a");
    client.channels.fetch(`833438347891441684`).then(channel => channel.send(logembed));
  }
})

client.on('voiceStateUpdate', async (___, newState) => {
  if (
    newState.member.user.bot &&
    !newState.channelID &&
    newState.guild.musicData.songDispatcher &&
    newState.member.user.id == client.user.id
  ) {
    newState.guild.musicData.queue.length = 0;
    newState.guild.musicData.songDispatcher.end();
    return;
  }
  if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
  ) {
    newState.setSelfDeaf(true);
  }
});

client.login(token);
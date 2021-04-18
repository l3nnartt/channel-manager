const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class MuteCommand extends Command {
	constructor(client) {
	  super(client, {
		name: 'mute',
		memberName: 'mute',
		group: 'scar',
		description: 'Mutet eine Person',
		guildOnly: true,
		userPermissions: ['MUTE_MEMBERS'],
		clientPermissions: ['MUTE_MEMBERS'],
		args: [
			{
			  key: 'userToMute',
			  prompt:
				'Bitte tagge die Person (@Name) oder benutze seine ID.',
			  type: 'member'
			},
			{
			  key: 'reason',
			  prompt: 'Nenne einen Grund?',
			  type: 'string',
			  default: message => `${message.author.tag} hat keinen Grund gegeben`
			}
		  ]
		});
	  }
	async run(message, { userToMute, reason }) {
		const mutedRole = message.guild.roles.cache.find(
		  role => role.name === 'Kanal » Mute'
		);
		if(!mutedRole){
			try{
				mutedRole = await message.guild.roles.create({
				name: "Kanal » Mute",
				color: "#c72810",
				permissions:[]
			  })
			  message.guild.channels.cache.forEach(async (channel) => {
				await channel.overwritePermissions(mutedRole, {
				  SEND_MESSAGES: false,
				  ADD_REACTIONS: false
				});
			  });
			}catch(e){
			  console.log(e.stack);
			}
		  }
		const user = userToMute;
		if (!user)
		  return message.channel.send(':x: Bitte nenne eine Person.');
		user.roles
		  .add(mutedRole)
		  .then(() => {
			const muteEmbed = new MessageEmbed()
			  .addField('Gemutet:', user)
			  .addField('Grund', reason)
			  .setColor('#c72810')
			message.channel.send(muteEmbed);
		  })
		  .catch(err => {
			message.say(
			  ':x: Fehler, beim muten der Person.'
			);
			return console.error(err);
		  });
	  }
	};
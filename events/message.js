const fs = require('fs');
const Discord = require("discord.js");

module.exports = {
	name: 'messageCreate',
	execute(message, client) {
		if (message.type === 'DEFAULT' && message.author.id !== client.user.id) {
			
			//TimeStamp
			const timestamp = new Date()

			//File Log
			fs.appendFile(`./debug.log`, `timestamp: ${timestamp};\t Author: ${message.author.username}#${message.author.discriminator};\t Content: ${message.content};\n`, function (err) {
				if (err) throw err;
			});

			//Discord Log
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: `${message.author.username} ${message.author.discriminator}`, iconURL: message.author.displayAvatarURL() })
				.setDescription(`${message.content} \n\n Channel: <#${message.channelId}>`)
				.setTimestamp(message.createdAt)
				.setColor("#2a2a2a");
			client.channels.fetch('727167785599238155').then(channel => channel.send({embeds: [embed]}));
		}
	},
};
const fs = require('fs');
const Discord = require("discord.js");

module.exports = {
	name: 'messageCreate',
	execute(message, client) {
		if (message.channel.type === 'dm') {
			
			//TimeStamp
			const timestamp = new Date()

			//File Log
			fs.appendFile(`./debug.log`, `timestamp: ${timestamp};\t Author: ${message.author.tag};\t Content: ${message.content};\n`, function (err) {
				if (err) throw err;
			});

			//Discord Log
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
				.setDescription(`${message.content}`)
				.setTimestamp(message.createdAt)
				.setFooter({ text: `${client.user.username} Log-System` })
				.setColor("#2a2a2a");
			client.channels.fetch('833713378194620416').then(channel => channel.send(embed));
		}
	},
};
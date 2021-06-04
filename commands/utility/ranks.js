const Discord = require("discord.js");

module.exports = {
	name: 'ranks',
    aliases: ['roles', 'rollen'],
	description: 'Übersicht aller Ränge auf dem Discord',
	cooldown: 5,
	execute(message, args, client) {
		const embed1 = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} • 4rena Ränge`)
            .addFields(
                { name: 'Camper', value: `64 Punkte <@&842058723862380575>`},
                { name: 'Faustkämpfer', value: `128 Punkte <@&617079299354263562>`},
                { name: 'Schlafmütze', value: `256 Punkte <@&736358252073189407>`},
                { name: 'Holzliebhaber', value: `512 Punkte <@&736357575745994873>`},
                { name: 'Halbstarker', value: `1024 Punkte <@&842060449658437642>`},
                { name: 'Taktiker', value: `2048 Punkte <@&842060088210358323>`},
                { name: 'Krieger', value: `4096 Punkte <@&842060227792338984>`},
                { name: 'Killer', value: `8192 Punkte <@&842060318461001728>`},
                { name: 'Profikiller', value: `16348 Punkte <@&842057955843244032>`},
                { name: 'Meisterkiller', value: `32768 Punkte <@&617079551843106816>`},
                { name: 'Killaura', value: `65536 Punkte <@&848506456969445377>`})
			.setTimestamp(message.createdAt)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
			.setColor("#4680FC");
		message.channel.send(embed1)
	}
};
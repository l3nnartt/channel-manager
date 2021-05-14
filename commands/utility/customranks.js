const Discord = require("discord.js");

module.exports = {
	name: 'customranks',
    aliases: ['customroles', 'customrollen', 'cmranks'],
	description: 'Übersicht aller Custom Ränge auf dem Discord',
	cooldown: 5,
	execute(message, args, client) {
		const embed1 = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} • 4rena Custom Ränge`)
            .addFields(
                { name: 'Soldat', value: `100 4rena Runden gespielt für <@&842082592474792017>`},
                { name: 'Gefreiter', value: `250 4rena Runden gespielt für <@&842083017053044827>`},
                { name: 'Leutnant', value: `500 4rena Runden gespielt für <@&842083052594790404>`},
                { name: 'Hauptmann', value: `1000 4rena Runden gespielt für <@&842083268623204442>`},
                { name: 'Major', value: `2000 4rena Runden gespielt für <@&842083303833731072>`},
                { name: 'Unteroffizier', value: `3000 4rena Runden gespielt für <@&842083331435921468>`},
                { name: 'Offizier', value: `4000 4rena Runden gespielt für <@&842083537682432071>`},
                { name: 'General', value: `5000 4rena Runden gespielt für <@&842083558180257835>`},
                { name: 'Veteran', value: `Jede Person, welche jemals in der Top 10 Alltime oder in der Top 3 Monatlich war, erhält außerdem die Rolle <@&842081998549286933>`})
			.setTimestamp(message.createdAt)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
			.setColor("#4680FC");
		message.channel.send(embed1)
	}
};
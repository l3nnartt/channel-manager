const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
	name: 'info',
	description: 'Informationen über den Bot',
	aliases: ['information'],
    cooldown: 5,
	execute(message, args, client) {
        const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
        ];

        Promise.all(promises)
            .then(results => {
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username} • Informationen`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Mitglieder', value: `${totalMembers}`, inline: true },
                        { name: 'Version', value: `${config.version}`, inline: true},
                        { name: 'Entwickler', value: `<@398101340322136075>`, inline: true},
                        { name: 'Hilfe & Fragen', value: 'Solltest du bei etwas Hilfe benötigen, oder eine Frage haben kannst du dich jederzeit bei [Mr_Milchmann_LP#0001](https://discord.com/users/398101340322136075) melden.' })
                    .setTimestamp(message.createdAt)
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                    .setColor("#4680FC");
                message.channel.send(embed);
            })
        .catch(console.error)
	},
};
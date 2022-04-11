const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { config } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Informations about the bot'),
    async execute(interaction, client) {
        const promises = [
            await client.shard.fetchClientValues('guilds.cache.size'),
            await client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

        Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                const embed = new MessageEmbed()
                    .setTitle(`${client.user.username} • Informationen`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        { name: 'Server', value: `${totalGuilds}`, inline: true },
                        { name: 'Channel', value: `${client.channels.cache.size}`, inline: true },
                        { name: 'Users', value: `${totalMembers}`, inline: true },
                        { name: 'Version', value: `${config.version}`, inline: true},
                        { name: 'Developer', value: `<@398101340322136075>`, inline: true})
                    .setTimestamp(interaction.createdAt)
                    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setColor("#4680FC");
                return interaction.reply({embeds: [embed]});
            }).catch(console.error);
    },
};
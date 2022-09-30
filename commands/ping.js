const {SlashCommandBuilder, EmbedBuilder, Colors} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks the latency between command and answer'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} • Ping`)
            .setDescription(`Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
            .setTimestamp(interaction.createdAt)
            .setColor(Colors.Green)
            .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()});
        interaction.reply({embeds: [embed]});
    },
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { token } = require('../config.json');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Ermöglicht das gemeinsame schauen von YouTube Videos'),
    async execute(interaction, client) {
        let voice = interaction.member.voice.channel;
        if (!voice) {
            interaction.reply(`Du musst in einem Sprachchannel sein um die Aktion zu starten`)
        } else {
            fetch(`https://discord.com/api/v8/channels/${voice.id}/invites`, {
                method: 'POST',
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: '755600276941176913',
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    Authorization: `Bot ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((invite) => {
                if (!invite.code) return interaction.reply('Ich kann YouTube nicht starten.');
                interaction.reply({ content: `Klicke auf den Link um YouTube zusammen zu schauen:\nhttps://discord.com/invite/${invite.code}`, ephemeral: true });
            });
        }
    },
};
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UnmuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      aliases: ['unmute-user'],
      memberName: 'unmute',
      group: 'scar',
      description:
        'Entmutet eine Person',
      guildOnly: true,
      userPermissions: ['MUTE_MEMBERS'],
      clientPermissions: ['MUTE_MEMBERS'],
      args: [
        {
          key: 'userToUnmute',
          prompt:
            'Bitte tagge die Person (@Name), die du entmuten möchtest.',
          type: 'member'
        }
      ]
    });
  }

  async run(message, { userToUnmute }) {
    const mutedRole = message.guild.roles.cache.find(role => role.name === 'Kanal » Mute');
    if (!mutedRole)
      return message.channel.send(
        ':x: Keine "Kanal » Mute" Rolle gefunden. Bitte erstelle eine und versuche es erneut.'
      );
    const user = userToUnmute;
    if (!user)
      return message.channel.send(':x: Bitte nenne eine Person.');
    user.roles
      .remove(mutedRole)
      .then(() => {
        const unmuteEmbed = new MessageEmbed()
          .addField('Entmutet:', userToUnmute)
          .setColor('#008000');
        message.channel.send(unmuteEmbed);
      })
      .catch(err => {
        message.say(
          ':x: Fehler, beim entmuten der Person.'
        );
        return console.error(err);
      });
  }
};

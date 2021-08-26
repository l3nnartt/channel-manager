const Discord = require("discord.js");
const { token } = require('../../config.json');

module.exports = {
	name: 'youtube',
	description: 'Misst die Latenz zwischen dem Command und der Antwort auf den Command',
	cooldown: 5,
	execute(message, args, client) {
		const voice = message.member.voice.channel;
    message.delete();
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
        if (!invite.code)
          return message.say('Ích kann das Minigame nicht starten.');
        message
          .say(
            `Klicke auf den Link um YouTube zusammen zu schauen:\nhttps://discord.com/invite/${invite.code}`
          ).then((m) => m.delete({ timeout: 86400000 }));
      });
    }
	}
};

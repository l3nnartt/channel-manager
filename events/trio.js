var Duo = "║ Trio Raum";

const getVoiceChannels = (guild) => {
  return guild.channels.cache.filter((channel) => {
    return channel.type === 'voice' && channel.name === Duo
  })
}

module.exports = (client) => {
  client.on('voiceStateUpdate', (oldState, newState) => {
    const { guild } = oldState
    const joined = !!newState.channelID

    const channelId = joined ? newState.channelID : oldState.channelID
    let channel = guild.channels.cache.get(channelId)

    if (channel.name === Duo) {
      if (joined) {
        const channels = getVoiceChannels(guild)

        let hasEmpty = false

        channels.forEach((channel) => {
          if (!hasEmpty && channel.members.size === 0) {
            hasEmpty = true
          }
        })

        if (!hasEmpty) {
          const {
            type,
            userLimit,
            bitrate,
            parentID,
            permissionOverwrites,
            rawPosition,
          } = channel

          guild.channels.create(Duo, {
            type,
            bitrate,
            userLimit,
            parent: "833689325006094346",
            permissionOverwrites,
            position: rawPosition,
          }).then((channel) => {
            newState.member.voice.setChannel(channel)
          })
        }
      } else if (
        channel.members.size === 0 &&
        getVoiceChannels(guild).size > 1
      ) {
        channel.delete()
      }
    } else if (oldState.channelID) {
      channel = guild.channels.cache.get(oldState.channelID)
      if (
        channel.name === Duo &&
        channel.members.size === 0 &&
        getVoiceChannels(guild).size > 1
      ) {
        channel.delete()
      }
    }
  })
}
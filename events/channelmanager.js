let channelName = "║ Duo Raum" || "║ Trio Raum" || "║ Squad Raum" || "║ Penta Raum" || "║ Hexa Raum" || "║ Hepta Raum" || "║ Octa Raum"

const getVoiceChannels = (guild) => {
  return guild.channels.cache.filter((channel) => {
    return channel.type === 'voice' && channel.name === channelName
  })
}

module.exports = (client) => {
  client.on('voiceStateUpdate', (oldState, newState) => {
    const { guild } = oldState
    const joined = !!newState.channelID

    const channelId = joined ? newState.channelID : oldState.channelID
    let channel = guild.channels.cache.get(channelId)

    if (channel.name === channelName) {
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

          guild.channels.create(channelName, {
            type,
            bitrate,
            userLimit,
            parent: "833504028620095548",
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
        channel.name === channelName &&
        channel.members.size === 0 &&
        getVoiceChannels(guild).size > 1
      ) {
        channel.delete()
      }
    }
  })
}
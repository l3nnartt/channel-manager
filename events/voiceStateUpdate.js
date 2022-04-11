const {createChannel, existingChannel} = require('../config.json');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        if (newState.channel !== null && newState.channel.parent.id === createChannel) {

            let channelName = newState.channel.name;
            let joined = !!newState.channelId
            let channelId = joined ? newState.channelId : oldState.channelId
            let channel = newState.guild.channels.cache.get(channelId)

            const {
                type,
                userLimit,
                bitrate,
                edit,
                rawPosition,
            } = channel

            newState.guild.channels.create(channelName, {
                type,
                bitrate,
                userLimit,
                parent: existingChannel,
                edit,
                position: rawPosition,
            }).then((channel) => {
                newState.member.voice.setChannel(channel)
            })
        }
        if (oldState.channel !== null && oldState.channel.members.size === 0 && oldState.channel.parent.id === existingChannel) return oldState.channel.delete();
    },
};
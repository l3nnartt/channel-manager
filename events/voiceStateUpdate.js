const {createChannel, existingChannel} = require('../config.json');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        // if new channel is not null & new channel is in parent of createChannel
        if (newState.channel !== null && newState.channel.parent.id === createChannel) {

            let channelName = newState.channel.name;
            let joined = !!newState.channelId
            let channelId = joined ? newState.channelId : oldState.channelId
            let channel = newState.guild.channels.cache.get(channelId)

            // const of preset channel
            const {
                type,
                userLimit,
                bitrate,
                edit,
                rawPosition,
            } = channel

            // create new channel from preset channel
            newState.guild.channels.create({
                    name: channelName,
                    type,
                    bitrate,
                    userLimit,
                    parent: existingChannel,
                    edit,
                    position: rawPosition,
            }).then((channel) => {
                // move person in the new created channel
                newState.member.voice.setChannel(channel)
            })
        }

        // if the channel is empty, NOT null and in the existingChannel parent delete it
        if (oldState.channel !== null && oldState.channel.members.size === 0 && oldState.channel.parent.id === existingChannel) return oldState.channel.delete();
    },
};
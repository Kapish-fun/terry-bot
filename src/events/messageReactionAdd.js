module.exports = async (client, message, emoji, reactor) => {
	if (emoji.name !== "🍅") return
	if (!message.reactions) message = await client.getMessage(message.channel.id, message.id)
	if (message.author.id == client.user.id) return
	if (message.guild.id == "1130286476031184906") return //being abused 2 much
	if (["632337309785915412", "1079988920776929361", "249696282711556107"].includes(message.author.id)) return
	if (!["1130564006449528842", "1142544785157144717", "1142544337360654406"].includes(message.channel.id)) return

	const coalReactions = message.reactions["🍅"].count
	if (coalReactions == 1 && !client.notifiedMessages.has(message.id)) {
		message.channel.createMessage({
			content: `<@${reactor.id}> has started a vote against <@${message.author.id}>. React with 10 🍅 emojis to delete their message and mute them for 30 minutes.`,
			messageReference: {
				channelID: message.channel.id,
				messageID: message.id,
			},
		})
		client.notifiedMessages.add(message.id)
	} else if (coalReactions >= 10) {
		message.member.edit({ communicationDisabledUntil: new Date(Date.now() + 1000 * 60 * 60 * 30) }).catch((_) => {
			console.log(_)
		})
		message.delete().catch((_) => {})
	}
}

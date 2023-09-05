const endpoint = "https://kapish.fun/discord/match?discordId="

exports.info = {
	name: "whois",
	description: "Lookup a Kapish user by their Discord account.",
	disabled: false,
	options: [{ name: "user", description: "The Discord user to lookup.", type: 9, required: true }],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction
	const user = data.options[0].value

	const response = await fetch(endpoint + user)
	const { success, userId, username } = await response.json()

	if (!success) return interaction.createMessage(`That user does not have a Kapish account linked.`)
	return interaction.createMessage(`[${username}](https://kapish.fun/users/${userId}/profile)`)
}

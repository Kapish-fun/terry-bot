const endpoint = "https://kapish.fun/discord/match?discordId="

exports.info = {
	name: "whois",
	description: "Lookup a Kapish user by their Discord account.",
	disabled: true,
	options: [{ name: "user", description: "The Discord user to lookup.", type: 9, required: true }],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	return interaction.createMessage(`this shit is NOT ready yet`)
}

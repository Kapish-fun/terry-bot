const path = require("path")

const endpoint = "https://kapish.fun/discord/match?discordId="

exports.info = {
	name: "verify",
	description: "Verify your Kapish user.",
	disabled: false,
	options: [],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	const response = await fetch(endpoint + member.id)
	const { success, userId, username } = await response.json()

	if (!success) {
		await member.removeRole(process.env.VERIFIED_ROLE, "User does not have a Kapish account")
		return interaction.createMessage("Couldn't find your Kapish account. Make sure your Discord account is linked in your [Account Settings](https://kapish.fun/my/settings).")
	}

	await member.addRole(process.env.VERIFIED_ROLE, "User has a Kapish account")
	return interaction.createMessage(`Welcome, ${username}!`)
}

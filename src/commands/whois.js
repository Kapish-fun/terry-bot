const fetch = require("node-fetch")

exports.info = {
	name: "whois",
	description: "Lookup a Crapblox user by their username",
	disabled: true,
	options: [{ name: "username", description: "The user's username.", type: 3, required: true }],
}

exports.run = async (client, interaction) => {
	const { data, member, guildID } = interaction
	const username = data.options[0].value

	await interaction.defer()
	const response = await fetch(`http://crapblox.com/get/user-info/user/${username}`).catch((_) => _)
	if (response?.message) return interaction.createMessage("epic fail")
	const json = await response.json().catch((_) => _)
	if (json?.message) return interaction.createMessage("epic fail")

	return interaction.createMessage(`${username} is id ${json.id}. they have ${json.roblox_robux} zuo.`)
}

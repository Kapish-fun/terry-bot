const RWService = require("../modules/RWService.js")

exports.info = {
	name: "openenvironment",
	description: "Run OpenEnvironment() on an RWService process.",
	disabled: false,
	options: [],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	await interaction.defer()

	const rcc = new RWService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.OpenEnvironment().catch((_) => _)
	if (response.message) interaction.createMessage(response.message)
	interaction.createMessage(response.return)
}

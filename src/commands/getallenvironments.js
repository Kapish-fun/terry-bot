const RWService = require("../modules/RWService.js")

exports.info = {
	name: "getallenvironments",
	description: "Run GetAllEnvironments() on an RWService process.",
	disabled: false,
	options: [],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	await interaction.defer()

	const rcc = new RWService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.GetAllEnvironments().catch((_) => _)
	if (response.message) interaction.createMessage(response.message)
	if (!response.return?.items?.string.length) return interaction.createMessage("no environments")
	interaction.createMessage("```json\n" + JSON.stringify(response.return?.items?.string, null, 4) + "\n```")
}

const RWService = require("../modules/RWService.js")

exports.info = {
	name: "getstatus",
	description: "Run GetStatus() on an RWService process.",
	disabled: false,
	options: [],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	const rcc = new RWService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.GetStatus().catch((_) => _)
	if (response.message) interaction.createMessage(response.message)
	interaction.createMessage("```json\n" + JSON.stringify(response.return, null, 4) + "\n```")
}

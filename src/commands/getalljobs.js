const RccService = require("../modules/RccService.js")

exports.info = {
	name: "getalljobs",
	description: "Run GetAllJobs() on an RccService process.",
	disabled: true,
	options: [],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	const rcc = new RccService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.GetAllJobs().catch((_) => _)
	if (response.message) interaction.createMessage(response.message)
	interaction.createMessage("```json\n" + JSON.stringify(response[0], null, 4).replace(/`/g, "\\`") + "\n```")
}

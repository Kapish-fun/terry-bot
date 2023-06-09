const RccService = require("../modules/RccService.js")

exports.info = {
	name: "getalljobs",
	description: "Run GetAllJobs() on an RccService process.",
	disabled: false,
	options: [],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	const rcc = new RccService()
	await rcc.CreateClient("65.21.123.32")

	const response = await rcc.GetAllJobs()
	interaction.createMessage("```json\n" + JSON.stringify(response[0], null, 4).replace(/`/g, "\\`") + "\n```")
}

const RccService = require("../modules/RccService.js")

exports.info = {
	name: "openjobex",
	description: "Run OpenJobEx() on an RccService process.",
	disabled: false,
	options: [
		{ name: "job", description: "The job ID.", type: 3, required: true },
		{ name: "script", description: "The script to run.", type: 3, required: true },
	],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction
	const jobid = data.options[0].value
	const script = data.options[1].value

	await interaction.defer()

	const rcc = new RccService()
	await rcc.CreateClient("65.21.123.32")

	const response = await rcc.OpenJobEx(jobid, script).catch((_) => _)
	if (response.message) interaction.createMessage("FUCK!!")
	else interaction.createMessage("```json\n" + JSON.stringify(response[0], null, 4) + "\n```")
}

const RccService = require("../modules/RccService.js")

exports.info = {
	name: "openjob",
	description: "Run OpenJob() on an RccService process.",
	disabled: true,
	options: [
		{ name: "job", description: "The job ID.", type: 3, required: true },
		{ name: "script", description: "The script to run.", type: 3, required: true },
		{ name: "expiration", description: "The expiration of the job.", type: 4, required: false },
	],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction
	const jobid = data.options[0].value
	const script = data.options[1].value
	const expiration = data.options[2]?.value

	await interaction.defer()

	const rcc = new RccService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.OpenJob(jobid, script, expiration).catch((_) => _)

	if (response.message) return interaction.createMessage(response.message)

	interaction.createMessage("```json\n" + JSON.stringify(response[0], null, 4) + "\n```").catch((_) => {
		interaction.createMessage(
			{ embeds: [] },
			{
				file: Buffer.from(JSON.stringify(response[0]?.OpenJobResult[0]?.value, null, 4), "base64"),
				name: "result.png",
			}
		)
	})
}

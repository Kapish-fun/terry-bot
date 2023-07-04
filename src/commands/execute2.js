const RWService = require("../modules/RWService.js")

exports.info = {
	name: "execute2",
	description: "Run Execute() on an RWService process.",
	disabled: false,
	options: [
		{ name: "environment", description: "The environment ID.", type: 3, required: true },
		{ name: "script", description: "The script to run.", type: 3, required: true },
	],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction
	const jobid = data.options[0].value
	const script = data.options[1].value

	const rcc = new RWService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.Execute(jobid, script).catch((_) => _)
	if (response.message) return interaction.createMessage(response.message)

	interaction.createMessage("```json\n" + JSON.stringify(response.return.items, null, 4) + "\n```").catch((_) => {
		interaction.createMessage(
			{ embeds: [] },
			{
				file: Buffer.from(JSON.stringify(response.return.items.LuaValue1.value, null, 4), "base64"),
				name: "result.png",
			}
		)
	})
}

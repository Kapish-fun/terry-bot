const RWService = require("../modules/RWService.js")

exports.info = {
	name: "closeenvironment",
	description: "Run CloseEnvironment() on an RWService process.",
	disabled: false,
	options: [{ name: "environment", description: "The environment ID.", type: 3, required: true }],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction
	const environment = data.options[0].value

	await interaction.defer()

	const rcc = new RWService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.CloseEnvironment(environment).catch((_) => _)
	if (response?.message) interaction.createMessage(response?.message)
	interaction.createMessage("done boss")
}

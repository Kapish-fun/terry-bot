const RccService = require("../modules/RccService.js")

exports.info = {
	name: "setrcc",
	description: "Set the connection details for RccService commands.",
	disabled: true,
	options: [
		{ name: "ip", description: "The IP address of RccService", type: 3, required: true },
		{ name: "port", description: "The port of RccService.", type: 4, required: true },
	],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction
	const ip = data.options[0].value
	const port = data.options[1].value

	client.rcc = {
		ip,
		port,
	}

	interaction.createMessage(`you got it boss, set to ${ip}:${port}`)
}

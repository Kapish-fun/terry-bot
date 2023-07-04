const RWService = require("../modules/RWService.js")

exports.info = {
	name: "getstandardoutmessages",
	description: "Run GetStandardOutMessages() on an RWService process.",
	disabled: false,
	options: [],
}

exports.run = async (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	await interaction.defer()

	const rcc = new RWService()
	await rcc.CreateClient(client.rcc.ip, client.rcc.port)

	const response = await rcc.GetStandardOutMessages().catch((_) => _)
	if (response?.message) interaction.createMessage(response?.message)

	let output = ""

	for (let i = 0; i < response.return?.items?.StandardOutMessage?.length; i++) {
		let log = response.return.items.StandardOutMessage[i]
		output += log.text + "\n"
	}

	if (!output) return interaction.createMessage("no unread messages")
	interaction.createMessage(
		{ embeds: [] },
		{
			file: output,
			name: "messages.txt",
		}
	)
}

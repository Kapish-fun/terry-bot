const { format } = require("util")

const endpoints = {
	headshot: "render/user/%d/headshot",
	bodyshot: "render/user/%d/bodyshot",
	asset: "render/asset/%d",
	clothing: "render/clothing/%d",
}

exports.info = {
	name: "render",
	description: "Render an asset.",
	disabled: false,
	options: [
		{
			name: "type",
			description: "The render type.",
			type: 3,
			required: true,
			choices: [
				{ name: "Headshot", value: "headshot" },
				{ name: "Bodyshot", value: "bodyshot" },
				{ name: "Asset", value: "asset" },
				{ name: "Clothing", value: "clothing" },
				{ name: "Mesh", value: "mesh" },
			],
		},
		{ name: "id", description: "The asset ID.", type: 4, required: true },
	],
}

exports.run = async (client, interaction) => {
	const { data, member, guildID } = interaction
	const type = data.options[0].value
	const id = data.options[1].value

	await interaction.defer()

	const response = await fetch(`http://${process.env.ARBITER_URL}/${format(endpoints[type], id)}?key=${process.env.ARBITER_KEY}`).catch((_) => _)
	if (response?.message) return interaction.createMessage("The arbiter is currently down.")

	const file = await response.text()
	if (!file) return interaction.createMessage("The arbiter did not return any data.")

	return interaction.createMessage({ embeds: [] }, { file: Buffer.from(file, "base64"), name: "render.png" })
}

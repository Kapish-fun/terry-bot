module.exports = (client, interaction) => {
	const { id, token, data, channel, member } = interaction

	const command = client.commands.get(data.name)

	if (!command) return interaction.createMessage("That command doesn't exist.")
	if (command.info.disabled && member.user.id !== process.env.OWNER && !client.admins.includes(member.user.id)) return interaction.createMessage("You do not have permission to run this command.")

	return command.run(client, interaction)
}

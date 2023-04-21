const { LLama } = require("llama-node")
const { LLamaRS } = require("llama-node/dist/llm/llama-rs.cjs")
const util = require("util")
const path = require("path")

const template = "Complete the instruction below.\n\n### Instruction:\n\n%s\n\n### Response:"

exports.info = {
	name: "ai",
	description: "Prompt alpaca-7b-q4.",
	disabled: false,
	options: [{ name: "prompt", description: "Your text prompt.", type: 3, required: true }],
}

exports.run = async (client, interaction) => {
	const { data, member, guildID } = interaction
	const prompt = data.options[0].value

	await interaction.defer()

	const llama = new LLama(LLamaRS)
	llama.load({ path: path.resolve(process.cwd(), "./ggml-alpaca-7b-q4.bin") })

	let output = ""
	let last_edit = 0

	llama.createCompletion(
		{
			prompt: util.format(template, prompt),
			numPredict: 512,
			temp: 0.2,
			topP: 1,
			topK: 40,
			repeatPenalty: 1,
			repeatLastN: 64,
			seed: Math.random() * 1_000_000_000,
			feedPrompt: true,
		},
		(response) => {
			if (!response.completed) {
				output += response.token
				if (last_edit < Date.now() - 0.75 * 1000) {
					last_edit = Date.now()
					interaction.editOriginalMessage({
						content: output.trim() || "[No output]",
						allowedMentions: {
							everyone: false,
							roles: false,
							users: false,
						},
					})
				}
			} else
				interaction.editOriginalMessage({
					content: output.trim() || "[No output]",
					allowedMentions: {
						everyone: false,
						roles: false,
						users: false,
					},
				})
		}
	)
}

const soap = require("strong-soap").soap
const crypto = require("crypto")

class RccService {
	async CreateClient(IP = "127.0.0.1", Port = "64989") {
		this.client = await soap.createClientAsync(__dirname + "/RCCService.wsdl", {}, `http://${IP}:${Port}/`)
		return this.client
	}

	async GetStatus() {
		if (!this.client) throw new Error("There is no client")
		return await this.client.GetStatusAsync({})
	}

	async GetStatus() {
		if (!this.client) throw new Error("There is no client")
		return await this.client.GetStatusAsync({})
	}

	async OpenJobEx(jobid, script) {
		if (!this.client) throw new Error("There is no client")
		return await this.client.OpenJobExAsync({
			job: {
				id: jobid,
				expirationInSeconds: 60,
				category: 0,
				cores: 1,
			},
			script: {
				name: jobid,
				script,
				arguments: {},
			},
		})
	}

	async OpenJob(jobid, script, expirationInSeconds = 60) {
		if (!this.client) throw new Error("There is no client")
		return await this.client.OpenJobAsync({
			job: {
				id: jobid,
				expirationInSeconds,
				category: 0,
				cores: 1,
			},
			script: {
				name: jobid,
				script,
				arguments: {},
			},
		})
	}

	async GetAllJobs() {
		if (!this.client) throw new Error("There is no client")
		return await this.client.GetAllJobsAsync({})
	}

	async Execute(jobID, script) {
		if (!this.client) throw new Error("There is no client")
		return await this.client.ExecuteAsync({
			jobID,
			script: {
				name: crypto.randomUUID(),
				script,
				arguments: {},
			},
		})
	}
}

module.exports = RccService

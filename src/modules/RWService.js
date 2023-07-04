const soap = require("strong-soap").soap
const crypto = require("crypto")
const XMLHandler = soap.XMLHandler
const xmlHandler = new XMLHandler()

class RccService {
	CreateClient(IP = "127.0.0.1", Port = "64989") {
		return new Promise((resolve, reject) => {
			soap.createClient(`http://${IP}:${Port}/RBXGS/WebService.dll?Handler=WSDL`, (err, client) => {
				client.setEndpoint(`http://${IP}:${Port}/RBXGS/WebService.dll?Handler=Default`)
				this.client = client
				resolve()
			})
		})
	}

	async describe() {
		if (!this.client) throw new Error("There is no client")
		return await this.client.describe()
	}

	GetStatus() {
		return new Promise((resolve, reject) => {
			if (!this.client) throw new Error("There is no client")
			this.client.GetStatus({}, (err, result, envelope) => {
				if (!result) {
					var root = xmlHandler.xmlToJson(null, envelope, null)
					result = root["Body"]
				}
				if (err) reject(err)
				resolve(result?.GetStatus)
			})
		})
	}

	OpenEnvironment() {
		return new Promise((resolve, reject) => {
			if (!this.client) throw new Error("There is no client")
			this.client.OpenEnvironment({}, (err, result, envelope) => {
				if (!result) {
					var root = xmlHandler.xmlToJson(null, envelope, null)
					result = root["Body"]
				}
				if (err) reject(err)
				resolve(result?.OpenEnvironment)
			})
		})
	}

	CloseEnvironment(environmentID) {
		return new Promise((resolve, reject) => {
			if (!this.client) throw new Error("There is no client")
			this.client.CloseEnvironment({ environmentID }, (err, result, envelope) => {
				if (!result) {
					var root = xmlHandler.xmlToJson(null, envelope, null)
					result = root["Body"]
				}
				if (err) reject(err)
				resolve(result?.CloseEnvironment)
			})
		})
	}

	Execute(environmentID, script) {
		return new Promise((resolve, reject) => {
			if (!this.client) throw new Error("There is no client")
			this.client.Execute(
				{
					environmentID: environmentID,
					script: script,
					arguments: {
						count: 0,
						items: [],
					},
					name: crypto.randomUUID(),
				},
				(err, result, envelope) => {
					if (!result) {
						var root = xmlHandler.xmlToJson(null, envelope, null)
						result = root["Body"]
					}
					if (err) reject(err)
					resolve(result?.Execute)
				}
			)
		})
	}

	GetStandardOutMessages(count = 15) {
		return new Promise((resolve, reject) => {
			if (!this.client) throw new Error("There is no client")
			this.client.GetStandardOutMessages({ maxCount: count }, (err, result, envelope) => {
				if (!result) {
					var root = xmlHandler.xmlToJson(null, envelope, null)
					result = root["Body"]
				}
				if (err) reject(err)
				resolve(result?.GetStandardOutMessages)
			})
		})
	}

	GetAllEnvironments() {
		return new Promise((resolve, reject) => {
			if (!this.client) throw new Error("There is no client")
			this.client.GetAllEnvironments({}, (err, result, envelope) => {
				if (!result) {
					var root = xmlHandler.xmlToJson(null, envelope, null)
					result = root["Body"]
				}
				if (err) reject(err)
				resolve(result?.GetAllEnvironments)
			})
		})
	}
}

module.exports = RccService

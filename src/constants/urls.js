const urlconf = require('./urlconf')

let instance

export default class URL {
  constructor (mode = 'dev') {
    if (!instance) {
      instance = this
      this.host = urlconf[mode].host
      this.port = urlconf[mode].port
    }

    return instance
  }

  baseUrl () {
    return `http://${this.host}:${this.port}`
  }

  fetchDataset () {
    return `${this.baseUrl()}/dataset/`
  }
}

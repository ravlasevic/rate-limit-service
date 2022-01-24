/**
*   Client constructor.
**/ 
function Client(limit = 1, seconds = 1) {
    this.timestamp = 0
    this.tokens = limit
    this.limit = limit
    this.seconds = seconds

    // Token bucket algorithm implementation.
    this.requestDone = function () {
        let currentDate = Date.now()
        
        if (currentDate - this.timestamp >= this.seconds * 1000) {
            this.timestamp = currentDate
            this.tokens = this.limit           
        } 

        this.tokens --

        if (this.tokens < 0) return false

        return true
    }
}

/** 
*   Configuration module.
**/
const clients = new Map();

// Map clients.
function newConfiguration(clientList) {
    clients.clear()

    clientList.forEach((client) => {
        clients.set(client.clientId, new Client(client.limit, client.seconds))
    })
}

// Get client configuration.
function getClient(clientId) {
    return clients.get(clientId)
}

function getMap() {
    return Array.from(clients.values())
}

module.exports = {
    getClient,
    newConfiguration,
    getMap
}

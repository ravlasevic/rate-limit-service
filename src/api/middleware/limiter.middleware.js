const clientConfiguration = require('../../modules/client-configuration') 

module.exports = async (req, res, next) => {
    try {
        // Get client configuration.
        const client = clientConfiguration.getClient(req.headers['client-id'])
        if (!client) return res.status(403).send('No configuration found.')

        // Check if request allowed.
        const allowed = client.requestDone()
        if (!allowed) return res.status(429).send('Request overload.')

        return next()
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
}

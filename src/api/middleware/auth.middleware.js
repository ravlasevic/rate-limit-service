const config = require('../../../config/config.json')

module.exports = async (req, res, next) => {
    try {
        // If no client-id return 400.
        if (!req.headers['client-id']) return res.status(400).send('Bad request.')

        if ((req.baseUrl && req.baseUrl.startsWith('/configure')) || 
            (req.originalUrl && req.originalUrl.startsWith('/configure'))) {
                
            if (config['configure-allowed-clients'].includes(req.headers['client-id'])) return next()
            /* 
                When requesting '/configure' endpoint and not listed in clients allowed, 
                return 401. 
            */
            return res.status(401).send('Not authorized.')
        }       

        return next()
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
}

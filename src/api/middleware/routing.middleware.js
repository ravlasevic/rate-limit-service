const db = require('../../db/db-connector')

module.exports = async (req, res, next) => {
    try {
        // Get sourcePath configuration.
        const sourcePathConfig = await db.get(
            'SELECT * FROM source_path WHERE source_path = ? OR source_path = ?', [req.originalUrl, req.baseUrl]
        )
        
        if (!sourcePathConfig || sourcePathConfig.length === 0) 
        return res.status(404).send('SourcePath not found.')

        // Add destinationUrl to request.
        req.destinationUrl = sourcePathConfig[0].destination_url

        return next()
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
}

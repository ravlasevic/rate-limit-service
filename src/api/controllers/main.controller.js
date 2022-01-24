'use strict';

const axios = require('axios')

module.exports = async (req, res) => {
    try {
        // Execute call to destinationUrl.
        const result = await axios.get(req.destinationUrl)    

        // Return result.
        if (typeof result === 'undefined' || typeof result.data === 'undefined') 
        return res.status(200).send({})

        return res.status(200).send(result.data)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

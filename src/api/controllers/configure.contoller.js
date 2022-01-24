'use strict';

const clientConfiguration = require('../../modules/client-configuration') 
const db = require('../../db/db-connector')
const Promise = require('bluebird')

// Configure.
async function configure (req, res) {
    try {
        const { routes = [], clients = [] } = req.body

        // Update sourcePath configuration.
        await db.run('DELETE FROM source_path')
        await Promise.mapSeries(routes, async (route) => {
            if (!route.sourcePath.startsWith('/configure')) return db.run(
                'INSERT INTO source_path(source_path, destination_url) VALUES(?, ?)',
                [ route.sourcePath, route.destinationUrl ]
            )
        })

        // Update client configuration.
        clientConfiguration.newConfiguration(clients)

        return res.status(200).send('Configuration created.')
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

// CRUD operations.
async function getCurrentConfiguration (req, res) {
    try {
        // Get sourePath configuration.
        const pathConfig = await db.get('SELECT * FROM source_path')

        // Get client configuration.
        const clientConfig = clientConfiguration.getMap()

        return res.status(200).send({
            routes: pathConfig,
            clients: clientConfig
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function createRoute (req, res) {
    try {
        const { sourcePath, destinationUrl } = req.body
        if (sourcePath.startsWith('/configure')) return res.status(400).send('Bad request.')

        // Create route.
        await db.run(
            'INSERT INTO source_path (source_path, destination_url) VALUES (?, ?)',
            [ sourcePath, destinationUrl ]
        )

        return res.status(200).send('Route created.')
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function editRoute (req, res) {
    try {
        const { routeId, destinationUrl } = req.body
        if (!routeId || !destinationUrl) return res.status(400).send('Bad request.')

        // Update route.
        await db.run(
            'UPDATE source_path SET destination_url = ? WHERE id = ?',
            [ destinationUrl, routeId ]
        )

        return res.status(200).send('Route updated.')
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

async function removeRoute (req, res) {
    try {
        const { routeId } = req.body
        if (!routeId) return res.status(400).send('Bad request.')

        // Remove route.
        await db.run('DELETE FROM source_path WHERE id = ?', [routeId])

        return res.status(200).send('Route removed.')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {
    configure,
    getCurrentConfiguration,
    createRoute,
    editRoute,
    removeRoute
}
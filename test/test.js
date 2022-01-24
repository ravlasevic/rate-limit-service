const { expect } = require('chai');
const chai = require('chai');
const request = require('supertest');

const app = require('../src/index');

describe('POST /configure', () => {
    it('should create configuration', async () => {
        await request(app)
            .post('/configure')
            .send({
                "routes": [
                    {
                        "sourcePath": "/items",
                        "destinationUrl": "https://google.com"
                    }
                ],
                "clients": [
                    {
                        "clientId": "1234",
                        "limit": 1000,
                        "seconds": 10
                    }
                ]
            })
            .set({'client-id': '777'})
            .expect(200)
    });

    it("should return 400 if no 'client-id' header provided", async () => {
        await request(app)
            .post('/configure')
            .send({})
            .expect(400)
    }); 

    it("should return 401 if 'client-id' not listed in clients allowed", async () => {
        await request(app)
            .post('/configure')
            .send({})
            .set({'client-id': '222'})
            .expect(401)
    });
});

describe('GET /configure/list-all', () => {
    it('should get current configuration', async () => {
        await request(app)
            .post('/configure')
            .send({
                "routes": [
                    {
                        "sourcePath": "/items",
                        "destinationUrl": "https://google.com"
                    }
                ],
                "clients": [
                    {
                        "clientId": "1234",
                        "limit": 1000,
                        "seconds": 10
                    }
                ]
            })
            .set({'client-id': 777})
            .expect(200)
        
        await request(app)
            .post('/configure/list-all')
            .set({'client-id': '777'})
            .expect(200)
            .then((res) => {
                expect(res.body).haveOwnProperty('routes')
                expect(res.body).haveOwnProperty('clients')
            })
    });  

    it("should return 400 if no 'client-id' header provided", async () => {
        await request(app)
            .post('/configure/list-all')
            .expect(400)
    }); 

    it("should return 401 if 'client-id' not listed in clients allowed", async () => {
        await request(app)
            .post('/configure/list-all')
            .set({'client-id': '222'})
            .expect(401)
    });
});

describe('POST /configure/create-route', () => {
    it('should create configuration', async () => {
        await request(app)
            .post('/configure/create-route')
            .send({
                "sourcePath": "/itemssss",
                "destinationUrl": "https://google.com"
            })
            .set({'client-id': 777})
            .expect(200)
    });  

    it("should return 400 if no 'client-id' header provided", async () => {
        await request(app)
            .post('/configure/create-route')
            .send({
                "sourcePath": "/itemssss",
                "destinationUrl": "https://google.com"
            })
            .expect(400)
    }); 

    it("should return 400 if 'sourcePath' starts with /configure", async () => {
        await request(app)
            .post('/configure/create-route')
            .send({
                "sourcePath": "/configure/another-configure",
                "destinationUrl": "https://google.com"
            })
            .set({'client-id': 777})
            .expect(400)
    }); 

    it("should return 401 if 'client-id' not listed in clients allowed", async () => {
        await request(app)
            .post('/configure/create-route')
            .send({
                "sourcePath": "/test",
                "destinationUrl": "https://google.com"
            })
            .set({'client-id': 222})
            .expect(401)
    });
});

describe('POST /configure/edit-route', () => {
    // it('should update configuration', async () => {            
    //     await request(app)
    //         .post('/configure/edit-route')
    //         .send({
    //             "routeId": 30,
    //             "destinationUrl": "https://yandex.ru"
    //         })
    //         .set({'client-id': 777})
    //         .expect(200)

    //     await request(app)
    //         .post('/configure/list-all')
    //         .set({'client-id': '777'})
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.body).haveOwnProperty('routes')
    //             expect(res.body).haveOwnProperty('clients')
    //         })
    // });  

    it("should return 400 if no 'client-id' header provided", async () => {
        await request(app)
            .post('/configure/edit-route')
            .send({
                "routeId": 30,
                "destinationUrl": "https://yandex.ru"
            })
            .expect(400)
    }); 

    it("should return 400 if there is no 'routeId' provided", async () => {
        await request(app)
            .post('/configure/edit-route')
            .send({
                "destinationUrl": "https://yandex.ru"
            })
            .set({'client-id': '777'})
            .expect(400)
    });

    it("should return 400 if there is no 'destinationUrl' provided", async () => {
        await request(app)
            .post('/configure/edit-route')
            .send({
                "routeId": 30
            })
            .set({'client-id': '777'})
            .expect(400)
    });

    it("should return 401 if 'client-id' not listed in clients allowed", async () => {
        await request(app)
            .post('/configure/edit-route')
            .send({
                "routeId": 30,
                "destinationUrl": "https://yandex.ru"
            })
            .set({'client-id': '222'})
            .expect(401)
    });
});

describe('POST /configure/remove-route', () => {
    // it('should remove configuration', async () => {
    //     await request(app)
    //         .post('/configure/list-all')
    //         .set({'client-id': '777'})
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.body).haveOwnProperty('routes')
    //             expect(res.body).haveOwnProperty('clients')
    //         })

    //     await request(app)
    //         .post('/configure/remove-route')
    //         .send({
    //             "routeId": 37
    //         })
    //         .set({'client-id': 777})
    //         .expect(200)

    //     await request(app)
    //         .post('/configure/list-all')
    //         .set({'client-id': '777'})
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.body).haveOwnProperty('routes')
    //             expect(res.body).haveOwnProperty('clients')
    //         })
    // });   

    it("should return 400 if no 'client-id' header provided", async () => {
        await request(app)
            .post('/configure/remove-route')
            .send({
                "routeId": 37
            })
            .expect(400)
    }); 

    it("should return 400 if there is no 'routeId' provided", async () => {
        await request(app)
            .post('/configure/remove-route')
            .send({})
            .set({'client-id': 777})
            .expect(400)
    });

    it("should return 401 if 'client-id' not listed in clients allowed", async () => {
        await request(app)
            .post('/configure/remove-route')
            .send({
                "routeId": 37
            })
            .set({'client-id': 222})
            .expect(401)
    });
});

describe('POST *', () => {
    it("should execute call and return result", async () => {
        await request(app)
            .post('/configure')
            .send({
                "routes": [
                    {
                        "sourcePath": "/items",
                        "destinationUrl": "https://google.com"
                    }
                ],
                "clients": [
                    {
                        "clientId": "1234",
                        "limit": 1000,
                        "seconds": 10
                    }
                ]
            })
            .set({'client-id': '777'})
            .expect(200)

        await request(app)
            .post('/items')
            .send({})
            .set({'client-id': '1234'})
            .expect(200)
    });

    it("should return 400 if no 'client-id' header provided", async () => {
        await request(app)
            .post('/items')
            .send({})
            .expect(400)
    });

    it("should return 403 if no client configuration found", async () => {
        await request(app)
            .post('/configure')
            .send({
                "routes": [
                    {
                        "sourcePath": "/items",
                        "destinationUrl": "https://google.com"
                    }
                ],
                "clients": [
                    {
                        "clientId": "1234",
                        "limit": 1000,
                        "seconds": 10
                    }
                ]
            })
            .set({'client-id': '777'})
            .expect(200)

        await request(app)
            .post('/items')
            .send({})
            .set({'client-id': '777'})
            .expect(403)
    });
    
    it("should return 429 if no client reached maximum requests", async () => {
        await request(app)
            .post('/configure')
            .send({
                "routes": [
                    {
                        "sourcePath": "/items",
                        "destinationUrl": "https://google.com"
                    }
                ],
                "clients": [
                    {
                        "clientId": "1234",
                        "limit": 0,
                        "seconds": 10
                    }
                ]
            })
            .set({'client-id': '777'})
            .expect(200)

        await request(app)
            .post('/items')
            .send({})
            .set({'client-id': '1234'})
            .expect(429)
    });

    it("should return 404 if sourcePath route not found", async () => {
        await request(app)
            .post('/configure')
            .send({
                "routes": [
                    {
                        "sourcePath": "/items",
                        "destinationUrl": "https://google.com"
                    }
                ],
                "clients": [
                    {
                        "clientId": "1234",
                        "limit": 10,
                        "seconds": 10
                    }
                ]
            })
            .set({'client-id': '777'})
            .expect(200)

        await request(app)
            .post('/itemss')
            .send({})
            .set({'client-id': '1234'})
            .expect(404)
    });
});

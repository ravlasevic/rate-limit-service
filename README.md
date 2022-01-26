#general
don't use strange defaults
read task more efficient !

#package.json
dependencies: 
	axios === supertest we don't need to use both	
	bluebird changes requests don't need to use it
dev-dependencies:
	all test deps (mocha, chai) go to dev-dependencies

#client-configuration.js
getMap() methods returning system info to client

#main.controller.js
request can be not get
should return multiple status codes

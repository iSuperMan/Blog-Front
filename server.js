const express = require('express') 
const http = require('http')
const config = require('./config')
const path = require('path')
const webpack = require('./webpack')

const app = express()
app.set('port', config.get('port'))

webpack(app)

app.get(/.*/, (req, res) => {
	res.sendFile(
		path.resolve(__dirname, 'public/index.html')
	)
})

const server = http.createServer(app)
server.listen(app.get('port'), function () {
	console.log('Start server on port ' + app.get('port'))
})
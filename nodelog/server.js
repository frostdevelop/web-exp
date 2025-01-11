/*
	Simple router from https://stackoverflow.com/questions/55113447/node-js-http-server-routing
*/
const http = require('http');
const fs = require('fs');
//const ex = require('express');

const server = http.createServer((req, res) => {
	
    req.on('error', err => {
        console.error(err);
        // Handle error...
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    res.on('error', err => {
        console.error(err);
        // Handle error...
    });
	
	let content = `[${(new Date()).toISOString()}] ${req.socket.remoteAddress} ${req.url} \n`;
	console.log(content);
	fs.appendFile('requests.log', content, err => {
  	if (err) {
    	console.error(err);
  	}
  	// done!
	});
	
	
	if (req.url === '/') {
		fs.readFile('./home.htm', (err, data) => {
			res.setHeader('Content-Type', 'text/html');
			res.end(data);
		})
	}else if(req.url === '/date'){
		res.end((new Date()).toISOString());
	}else{
		fs.readFile('./' + req.url, (err, data) => {
			if(err){
				res.statusCode = 404;
				res.end('404: File Not Found');
				return
			}
			res.end(data);
		})
	}
});


server.listen(80);

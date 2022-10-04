// Setup basic express server
const express = require('express');
const app = express();
//const cors = require('cors');
const path = require('path');
var redis = require('redis');
var redisClient = redis.createClient({
 // password  : '2DSsoWqWQ&AIsJ2heHhZ6I7ZF9VvFPkXMs+tmRLMPhb5bOpz&M4dbHjqaNEk2rzmQkDpalESI7h9!I%L'

});

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://3.18.87.25:8080","http://3.18.87.25"],
    credentials: true
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});


/* const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync(__dirname + '/ssl/udenar.key', 'utf8'),
 cert: fs.readFileSync(__dirname + '/ssl/udenar.crt', 'utf8')
};

var server = https.createServer(options, app);

var whitelist_cors_origin = ['https://iuris.udenar.edu.co',
                      'https://iurisapp.udenar.edu.co',
		      'https://cjuridicos.udenar.edu.co'
		     ];

var io = require('socket.io')(server, {
  cors: {
     origin: function (origin, callback) {
       if (whitelist_cors_origin.indexOf(origin) !== -1) {
          callback(null, true)
       } else {
          callback(new Error('Not allowed by CORS'))
       }
    },
    credentials: true
  }
} );
var port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server listening at port %d', port);
}); */


// Routing
//app.use(express.static(path.join(__dirname, 'public')));

//Conexion a Canales de redis
//var channelsApp =['nuewlybra','iuris'];
var channelsApp =['dfgfdgdffgfdgdfgf','LIuOgI52dWJxe0ZM'];
redisClient.subscribe(channelsApp);

io.on('connection', (socket) => {

//newpusher apps
  redisClient.on('message', function(channel, message){
  	message = JSON.parse(message);
   //	console.log(channel,'------------channel');
  //	console.log(message,'---------message....');
  	socket.emit(channel+message.channel, message.message);
  });
//newfin pusher apps



  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
   
  });

});

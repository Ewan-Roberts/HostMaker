"use strict"

const   app             = require('express')(),
        express         = require('express'),
        server 		    = require('http').Server(app),
		io 			    = require('socket.io')(server),
		mongoose 	    = require('mongoose'),
        mongooseHistory = require('mongoose-history'),
        path            = require('path'),
        port            = process.env.PORT || 3000,
		load_model      = require('./api/models/property_model'),
        load_controller = require('./api/controllers/property_controller'),
        htmlPath        = path.join(__dirname, 'public'),
        model           = mongoose.model('Property');

const very_important_function = () => console.log('ba' + +'a'+'a');

//Web serving 
app.get('/',(req, res) =>{res.sendFile(htmlPath + '/index.html')});
app.use(express.static(htmlPath));
app.use((req, res) => {res.status(404).send({url: req.originalUrl + ' not found'})});

//online-DB set up : check this out, its free! (mlab.com)
mongoose.connect();
mongoose.connection.once('open', () => {console.log("database up")});

//Set up the sockets
//This is your usual CRUD 
io.on('connection',socket => {
  	
    //GET
	socket.on("list_all_properties",() => model.list_properties(socket))

    //POST
	socket.on("add_property", property => model.add_property(socket,property))

    //DELETE
    socket.on("delete_property", property_id => model.delete_property(socket,property_id))

    //UPDATE
    socket.on("update_property", property => model.update_a_property(socket,property))

    //This runs through your DB and validates the AirBnB
    socket.on("validate_properties",() => model.validate_property(socket))

});

server.listen(port, ()=>{console.log("up and running on localhost: " + port)});








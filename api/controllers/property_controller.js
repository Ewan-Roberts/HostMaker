'use strict';

const   mongoose        = require('mongoose'),
        property_model  = mongoose.model('Property');

property_model.list_properties = socket => {

    property_model.find({}, (err, property_list) => {
        
        if(err) socket.emit("form_error",err)

        socket.emit('property_data',property_list)
    });
};

property_model.validate_property = socket =>{

    property_model.find({}, (err, property) => {
        
        if(err) socket.emit("form_error",err)

        for (var i = 0; i <= property.length; i++) {
            
            if(property[i] === undefined){continue}

            property[i].validate(err=>{
        
                if(err) {socket.emit("form_error",err)}
                socket.emit('property_data',property[i]) 
            })

        }
    });
}

property_model.add_property = (socket,property) =>{
    
    property_model.find({airbnbId: property.airbnbId}, (err,docs)=>{

        if(docs.length == 0) {

            new property_model(property).save((err, res) =>{
                
                if(err) socket.emit("form_error",err)

                console.log("added property: ")
                console.log(res)
                console.log("----------------")

                property_model.find({}, (err, property_list) => {
        
                    if(err) socket.emit("form_error",err)

                    socket.emit('property_data',property_list)
                });
            }); 

        } else {

            if(err) socket.emit("form_error", "This property already exists: "+property.airbnbId)
        }
    })
}

property_model.update_a_property = (socket,property) => {

    property_model.findOneAndUpdate({_id: property._id}, property, {new: true}, (err, res) =>{
        
        if(err) socket.emit("form_error",err)
            
        console.log("updated property: ")
        console.log(res)
        console.log("----------------")
    })
};

property_model.delete_property = (socket,property_id) =>{

    property_model.remove({
        _id: property_id
    }, (err, res) =>{
        
        if(err) socket.emit("form_error",err)

        console.log("deleted property: ")
        console.log(res)
        console.log("----------------")

    });
};

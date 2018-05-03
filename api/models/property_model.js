'use strict';
const   mongoose        = require('mongoose'),
        mongooseHistory = require('mongoose-history'),
        Schema          = mongoose.Schema,
        request         = require("request"),
        Agent           = require('socks5-http-client/lib/Agent'),
        randomUseragent = require('random-useragent');

const property_schema = new Schema({
    
    owner: {
        type: String,
        required: true
    },

    Created_date: {
        type: Date,
        default: Date.now
    },

    address: {
        line1: {
            type: String,
            default: "",
            required: true
        },
        line2: {
            type: String,
            default: ""
        },
        line3: {
            type: String,
            default: ""
        },
        line4: {
            type: String,
            default: "",
            required: true
        },
        postCode: {
            type: String,
            default: "",
            required: true
        },
        city: {
            type: String,
            default: "",
            required: true
        },
        country: {
            type: String,
            default: "",
            required: true
        }
    },

    airbnbId: {
        type: Number,
        required: true,
        validate: {
            validator: value => {
                
                console.log(value)
                console.log("validation called")

                return new Promise ((resolve, reject)=>{

                    request({
                        
                        url: 'http://www.airbnb.co.uk/rooms/'+value,
                        agentClass: Agent,
                        headers: {
                            'User-Agent': randomUseragent.getRandom(),
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        agentOptions: {
                            socksHost: 'localhost', // Defaults to 'localhost'.
                            socksPort: 9050 // Defaults to 1080.
                        }

                    }, (err, res) => {
                        
                        console.log(err);
                        console.log("status code is:")
                        console.log(res.statusCode)
                        console.log(res.request.uri)
                        
                        if (res.statusCode === 200){
                                
                                console.log("all good baby")
                                resolve(true)
                            
                        } else {
                            resolve(false)
                            // callback("error with request with status code: "+res.statusCode)
                        }
                    });
                })
            }
        }
    },

    numberOfBedrooms: {
        type: Number,
        min: 0,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }         
    },

    numberOfBathrooms: {
        type: Number,
        min: 1,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }  
    },

    incomeGenerated: {
        type: Number,
        min: 1,
        required: true
    }
});

property_schema.plugin(mongooseHistory)

mongoose.model('Property',property_schema);


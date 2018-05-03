const   assert      = require('assert'),
        path        = require('path'),
        mongoose    = require('mongoose'),
        model       = require("../api/models/todoListModel.js"),
        routes      = require('../api/routes/todoListRoutes'),
        Task        = mongoose.model('Tasks'),
        expect      = require('chai').expect;


describe('test property schema for required fields', function() {
    
    describe('Address and owner validation', function(done) {
        
        it('should be invalid if no owner is added', function(done) {

            new Task({}).validate(err => {
                expect(err.errors.owner).to.exist;
                done(); 
            });

        });

        it('should be invalid if no line1 is added', function(done) {

            new Task({}).validate(err => {
                
                expect(err.errors["address.line1"]).to.exist;
                done(); 
            });

        });

        it('should be invalid if no line4 is added', function(done) {

            new Task({}).validate(err => {
                
                expect(err.errors["address.line4"]).to.exist;
                done(); 
            });

        });

        it('should be invalid if no postCode is added', function(done) {

            new Task({}).validate(err => {
                
                expect(err.errors["address.postCode"]).to.exist;
                done(); 
            });

        });

        it('should be invalid if no city is added', function(done) {

            new Task({}).validate(err => {
                
                expect(err.errors["address.city"]).to.exist;
                done(); 
            });

        });

        it('should be invalid if no country is added', function(done) {

            new Task({}).validate(err => {
                
                expect(err.errors["address.country"]).to.exist;
                done(); 
            });

        });

        it('all validators throw errors if they are not present', function(done) {

            new Task({}).validate(err => {
                
                expect(err.errors.owner).to.exist;
                expect(err.errors["address.line1"]).to.exist;
                expect(err.errors["address.line4"]).to.exist;
                expect(err.errors["address.postCode"]).to.exist;
                expect(err.errors["address.city"]).to.exist;
                expect(err.errors["address.country"]).to.exist;
                done(); 
            });

        });

    });

    describe('bedroom validation', function(done) {

        it('throw errors on negative numbers', function(done) {

            new Task({numberOfBedrooms: -3}).validate(err => {
                expect(err.errors.numberOfBedrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

        it('throw errors on decimal point numbers', function(done) {

            new Task({numberOfBedrooms: 0.1}).validate(err => {
                expect(err.errors.numberOfBedrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

        it('throw errors on string', function(done) {

            new Task({numberOfBedrooms: "one"}).validate(err => {
                expect(err.errors.numberOfBedrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

        it('throw errors if nothing is added', function(done) {

            new Task({numberOfBedrooms: ""}).validate(err => {
                expect(err.errors.numberOfBedrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

    })

    describe('bathroom validation', function(done) {

        it('throw errors on less then 1 bathrooms', function(done) {

            new Task({numberOfBathrooms: 0}).validate(err => {
                expect(err.errors.numberOfBathrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

        it('throw errors on negative numbers', function(done) {

            new Task({numberOfBathrooms: -20}).validate(err => {
                expect(err.errors.numberOfBathrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

        //This is really just testing mongoose
        it('throw errors on string', function(done) {

            new Task({numberOfBathrooms: "one"}).validate(err => {
                expect(err.errors.numberOfBathrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

        it('throw errors if nothing is added', function(done) {

            new Task({numberOfBathrooms: ""}).validate(err => {
                expect(err.errors.numberOfBathrooms).to.exist;
                done()
                // expect(err.errors["address.line1"]).to.exist
            })
        })

    })

    xdescribe('AirbnbID validation', function(done) {

        it('throw errors if an ID is not a valid format', function(done) {

            this.timeout(3000);

            new Task({airbnbId: 'dewdwq'}).validate(err => {

                expect(err.errors.airbnbId).to.exist;
                done()

            })

        })

        it('throw errors if an ID is no longer valid', function(done) {

            this.timeout(3000);

            new Task({airbnbId: 242424242424}).validate(err => {
                
                expect(err.errors.airbnbId).to.exist;
                done()
                
            })

        })

        it('throw errors if an ID is too long or AirBnB doesnt give you a 200', function(done) {

            this.timeout(3000);

            new Task({airbnbId: 2354700}).validate(err => {
                
                expect(err.errors.airbnbId).to.exist;
                done()

            })
        })

        it('throw errors if an ID already exists in the database', function(done) {

            this.timeout(3000);

            new Task({airbnbId: 12345678901234567890}).validate(err => {
                
                expect(err.errors.airbnbId).to.exist;
                done()

            })
        })
    })
});



// new Task({
//     owner: "test",
//     address: {
//         line1: "test1",
//         line4: "test4",
//         postCode: "testPostCode",
//         city: "testCity",
//         country: "testCountry",
//     },
//     numberOfBedrooms: -3
// }).validate(err => {
//     expect(err.errors.numberOfBedrooms).to.exist;
//     done()
//     // expect(err.errors["address.line1"]).to.exist
// })
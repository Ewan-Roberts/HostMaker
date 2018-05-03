"use strict";

const socket = io.connect('http://localhost:3000');

socket.emit('list_all_properties')

socket.on('property_data', data =>{

	if(data.length == 0){return false}

	$(".relax").remove()

	$(".table-striped tbody ").empty()

	for (let i = 0; i < data.length; i++) {
			
		const $newdiv = $('<tr><th>'+data[i].owner+
			'</th><th>'+data[i].address.line1+ " "+data[i].address.line2+ " "+data[i].address.line3+ " "+data[i].address.line4+ " "+data[i].address.country+ " "+data[i].address.city+
			'</th><th>'+data[i].airbnbId+
			'</th><th>'+data[i].numberOfBedrooms+
			'</th><th>'+data[i].numberOfBathrooms+
			'</th><th>£'+data[i].incomeGenerated+
			'</th><th>'+"<button class='delete_property' uuid="+data[i]._id+">delete</button>"+"<button class='edit_property'>edit</button>"+
			'</th></tr>').data(data[i])

		$(".table-striped tbody").append($newdiv)
	}

	$(".edit_property").click(event =>{
		
		const line_item = $(event.target).parent().parent().data()

		const property_edit_state = $("<tr class = 'property_to_add'><th>"+
			"<input class = 'owner' value ="+line_item.owner+" required>"+
			"</th><th>"+
				"<div>line 1: <input class 	= 'line_1' form='add_property_form' value ="+line_item.address.line1+" required></div><br>"+
				"<div>line 2: <input class 	= 'line_2' form='add_property_form' value ="+line_item.address.line2+"></div><br>"+
				"<div>line 3: <input class 	= 'line_3' form='add_property_form' value ="+line_item.address.line3+"></div><br>"+
				"<div>line 4: <input class 	= 'line_4' form='add_property_form' value ="+line_item.address.line4+" required></div><br>"+
				"<div>postcode: <input class = 'postcode' form='add_property_form' value ="+line_item.address.postCode+" required></div><br>"+
				"<div>city: <input class 	= 'city' form='add_property_form' value ="+line_item.address.city+" required></div><br>"+
				"<div>country: <input class 	= 'country' form='add_property_form' value ="+line_item.address.country+" required></div><br>"+
			"</th><th><input class 	= 'airbnb_id' form='add_property_form' value ="+line_item.airbnbId+" required>"+
			"</th><th><input class 	= 'bedrooms' form='add_property_form' value ="+line_item.numberOfBedrooms+" required>"+
			"</th><th><input class 	= 'bathrooms' form='add_property_form' value ="+line_item.numberOfBathrooms+" required>"+
			"</th><th><input class 	= 'income_generated' form='add_property_form' value ="+line_item.incomeGenerated+" required>"+
			"</th><th><button class = 'update_property' form='add_property_form'>add</button>"+
			"</th></tr><form id='add_property_form' onsubmit='return false'></form>").data(line_item)

		$(".table-striped tbody").prepend(property_edit_state).hide().fadeIn()
		
		$(event.target).parent().parent().remove()

		$(".update_property").click(event =>{

			socket.emit("update_property",schema_constructor(event))

			$(event.target).parent().parent().remove()

			socket.emit('list_all_properties')
		})
	})

	$(".delete_property").click((event)=>{
		
		$(event.target).parent().parent().remove()

		const uuid = $(event.target).attr('uuid')

		socket.emit('delete_property', uuid)
		
		socket.emit('list_all_properties')

		if($("tbody th").length == 0) {$(".table-responsive").append("<div class = 'no-data'>Nothing in Database</div>")}

	})
}) 



$(".add_property_button").click(()=> {

	let i_wanna_take_you_to_the_foo_bar = $("<tr class = 'property_to_add'><th>"+
		"<input class = 'owner' required>"+
		"</th><th>"+
			"<div>line 1: <input class 	= 'line_1' form='add_property_form' required></div><br>"+
			"<div>line 2: <input class 	= 'line_2' form='add_property_form'></div><br>"+
			"<div>line 3: <input class 	= 'line_3' form='add_property_form'></div><br>"+
			"<div>line 4: <input class 	= 'line_4' form='add_property_form' required></div><br>"+
			"<div>postcode: <input class = 'postcode' form='add_property_form' required></div><br>"+
			"<div>city: <input class 	= 'city' form='add_property_form' required></div><br>"+
			"<div>country: <input class 	= 'country' form='add_property_form' required></div><br>"+
		"</th><th><input class 	= 'airbnb_id' form='add_property_form' required>"+
		"</th><th><input class 	= 'bedrooms' form='add_property_form' required>"+
		"</th><th><input class 	= 'bathrooms' form='add_property_form' required>"+
		"</th><th><input class 	= 'income_generated' form='add_property_form' required>"+
		"</th><th><button class = 'add_property' form='add_property_form' type='submit'>add</button>"+
		"</th></tr><form id='add_property_form' onsubmit='return false'></form>")

	$(".table-striped tbody ").prepend(i_wanna_take_you_to_the_foo_bar).hide().fadeIn()

	$(".add_property").click(()=>{

		socket.emit("add_property",schema_constructor())

		$(".table-responsive").append("<div class = 'relax'>Chill, im validating stuff...</div>")
		
		socket.emit('list_all_properties')

	})
})

$(".validate_data").click(()=> {
	
	socket.emit('validate_properties')

})

$(".test_add_property").click(()=>{
	$(".table-responsive").append("<div class = 'relax'>Chill</div>")
	socket.emit("add_property",{ 	
		owner: 'new',
  		address: 
   			{ 
   				line1: 'dadqw',
     			line2: 'w',
     			line3: 'lknli',
     			line4: 'ino',
     			postCode: 'ino',
     			country: 'ino',
     			city: 'oin' 
     		},
  		incomeGenerated: 89797,
  		airbnbId: 17941029,
  		numberOfBedrooms: '3',
  		numberOfBathrooms: '3' 
	})
})

$(".add_test_data").click(()=>{

	socket.emit("add_property",{
	    "owner": "carlos",
	    "address": {
	        "line1": "Flat 5",
	        "line4": "7 Westbourne Terrace",
	        "postCode": "W2 3UL",
	        "city": "London",
	        "country": "U.K."
	    },
	    "airbnbId": 3512500,
	    "numberOfBedrooms": 1,
	    "numberOfBathrooms": 1,
	    "incomeGenerated": 2000.34
  	});

  	socket.emit("add_property",{
	    "owner": "ankur",
	    "address": {
	        "line1": "4",
	        "line2": "Tower Mansions",
	        "line3": "Off Station road",
	        "line4": "86-87 Grange Road",
	        "postCode": "SE1 3BW",
	        "city": "London",
	        "country": "U.K."
	    },
	    "airbnbId": 1334159,
	    "numberOfBedrooms": 3,
	    "numberOfBathrooms": 1,
	    "incomeGenerated": 10000
  	});

  	socket.emit("add_property", {
	    "owner": "elaine",
	    "address": {
	        "line1": "4",
	        "line2": "332b",
	        "line4": "Goswell Road",
	        "postCode": "EC1V 7LQ",
	        "city": "London",
	        "country": "U.K."
	    },
	    "airbnbId": 12220057,
	    "numberOfBedrooms": 2,
	    "numberOfBathrooms": 2,
	    "incomeGenerated": 1200
  	});
})

const schema_constructor = event =>{

	const schema = {
		owner: 		$(".owner").val(),
		address:	
		{
			line1: 		$(".line_1").val(),
			line2: 		$(".line_2").val(),
			line3: 		$(".line_3").val(),
			line4: 		$(".line_4").val(),
			postCode: 	$(".postcode").val(),
			country: 	$(".country").val(),
			city: 		$(".city").val()
		},
		incomeGenerated: 	$(".income_generated").val(),
		airbnbId: 			$(".airbnb_id").val(),
		numberOfBedrooms: 	$(".bedrooms").val(),
		numberOfBathrooms: 	$(".bathrooms").val()

	}

	if(event !== undefined){
		schema._id = $(event.target).parent().parent().data()._id
	}

	return schema;
}

socket.on("form_error", err=>{console.log(err)})


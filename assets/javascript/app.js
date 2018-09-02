// displays the images
// takes an array parameter = ajax response
const displayImages = (arr) => {
	$('#result').empty(); // clears the result dom element
	let stillImage; // location for still image
	let movingImage; // location of gif

	let div = $('<div>').addClass('row'); // creates new div with a class of row

	// for each item in the array 
	arr.forEach(function(i){
		stillImage = i.images['480w_still'].url; // store location of still image
		movingImage = i.images.preview_gif.url; // store location of animated image

		let rating = i.rating.toUpperCase(); // create rating variable and store img rating

		let column = $('<div>').addClass('col-md-3 mb-3'); // create div element with col-md-3 mb-2 classes
		let card = $('<div>').addClass('card'); // create div elemente with card class
		let img = $('<img>').attr('src', stillImage); // create img elemente with source attribute of its img link
		let cardBody = $('<div>').addClass('card-body text-center'); // create div elemente with classes of: card-body text-center
		let cardTitle = $('<h5>').text("Rating: " + rating); // create h5 element with text displaying the img rating
 	
		img.css('width', '100%'); // add with to img

		img.attr('data-state', 'still'); // add attribute of data-state of still
		img.attr('data-still', stillImage); // add attribute of data-still with stillImage link 
		img.attr('data-moving', movingImage); // add attribute of data-moving with movingImage link
 
		cardBody.append(cardTitle); // append card title to card body
		card.append(img); // append img to the card element
		card.append(cardBody);	// append cardBody to card element
		column.append(card); // append the card div to column div
		div.append(column); // append column div to div element
	});
	$('#result').append(div); // display the result
};

// function gets images from Ghiphy 
// takes one parameter -> query 
const getImages = (query) => {
	const API_KEY = "kcH2xhkvaogw5NnHd7Oglc6azrxQVmuM"; // stores location of API Key
 	// stores query url
	let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + query + "&limit=10&offset=0&rating=G&lang=en";
	// stores result
	let result;
	// ajax request
	$.ajax({
		url: queryURL, 
		method: "GET"
	}).then(function(response){ // if there's a response
		result = response.data; // set the response to result variable
		displayImages(result); // call displayImages functions by passing it the result variable (array)
	});
}

// function displays new button to buttons area
// takes a string parametes -> name of the button
const displayButton = (text) => {
	let div = $('<div>').addClass('col-md'); // create new div with class of col-md
	// create button element with the following classes: btn btn-success mb-2 btn-block
	let btn = $('<button>').addClass('btn btn-success mb-2 btn-block'); 
	btn.attr('data-city', text); // give button attribute of data-city with value = user input (text)
	btn.text(text); // set the text of button = user input (text)
	div.append(btn); // append button to div
	$('#buttons').append(div); // display button to user
}

// button click handler
$(document).on('click', '#buttons .btn', function(){
	let city = $(this).attr('data-city'); // stores the clicked button data-city value
	getImages(city); // call getImages function and passes the city value 
});

// image click handler
$(document).on('click', 'img', function(){
	let imgState = $(this).attr('data-state'); // stores image state
	if(imgState === 'still') { // if image state if still
		$(this).attr('src', $(this).attr('data-moving')); // change link of img to animated link
		$(this).attr('data-state', 'moving'); // change image state to moving
	} else { // otherwise
		$(this).attr('src', $(this).attr('data-still')); // change the image link to still link
		$(this).attr('data-state', 'still'); // and change image state to still
	}
});

// handle add city btn click
$('#addBtn').click(function(e){
	e.preventDefault(); // prevent submit default
	let userInput = $('#addInput').val().trim(); // store user input
	if(userInput != '') // if user has entered a value/city
		displayButton(userInput); // call displayButton function by passing userinput 
	else // otherwise
		alert("You must enter a correct city"); // alert the user to input a valid city

	$('#addInput').val(' '); // reset the input value
});

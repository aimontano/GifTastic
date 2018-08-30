// displays the images
// takes an array parameter = ajax response
const displayImages = (arr) => {
	$('#result').empty();
	let stillImage; // location for still image
	let movingImage; // location of gif

	let div = $('<div>').addClass('row');

	arr.forEach(function(i){
		stillImage = i.images['480w_still'].url;
		movingImage = i.images.preview_gif.url;

		let rating = i.rating.toUpperCase();

		let column = $('<div>').addClass('col-md-3 mb-3');
		let card = $('<div>').addClass('card');
		let img = $('<img>').attr('src', stillImage);
		let cardBody = $('<div>').addClass('card-body text-center');
		let cardTitle = $('<h5>').text("Raging: " + rating);

		img.css('width', '100%');

		img.attr('data-state', 'still');
		img.attr('data-still', stillImage);
		img.attr('data-moving', movingImage);

		cardBody.append(cardTitle);
		card.append(img);
		card.append(cardBody);
		column.append(card);
		div.append(column);

		console.log(movingImage);
	});
	$('#result').append(div);
};

const getImages = (query) => {
	const API_KEY = "kcH2xhkvaogw5NnHd7Oglc6azrxQVmuM";

	let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + query + "&limit=10&offset=0&rating=G&lang=en";
	
	let result;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		result = response.data;
		console.log(result);
		displayImages(result);
	});
}

const displayButton = (text) => {
	let div = $('<div>').addClass('col-md');
	let btn = $('<button>').addClass('btn btn-success mb-2 btn-block');
	btn.attr('data-city', text);
	btn.text(text);
	div.append(btn);
	$('#buttons').append(div);
}

// button click handler
$(document).on('click', '#buttons .btn', function(){
	let city = $(this).attr('data-city');
	getImages(city);
});

// image click handler
$(document).on('click', 'img', function(){
	let imgState = $(this).attr('data-state');
	if(imgState === 'still') {
		$(this).attr('src', $(this).attr('data-moving'));
		$(this).attr('data-state', 'moving');
	} else {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');
	}
});

// handle add city btn click
$('#addBtn').click(function(e){
	e.preventDefault();
	let userInput = $('#addInput').val().trim();
	if(userInput != '') 
		displayButton(userInput);
	else 
		alert("You must enter a correct city");

	$('#addInput').val(' ');
});

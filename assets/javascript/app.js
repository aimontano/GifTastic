// displays the images
// takes an array parameter = ajax response
const displayImages = (arr) => {
	$('#result').empty();
	let imageURL; // location for still image
	let movingImage; // location of gif

	let div = $('<div>').addClass('row');

	arr.forEach(function(i){
		imageURL = i.images['480w_still'].url;
		movingImage = i.images.preview_gif.url;

		let rating = i.rating.toUpperCase();

		let column = $('<div>').addClass('col-md-3 mb-3');
		let card = $('<div>').addClass('card');
		let img = $('<img>').attr('src', movingImage);
		let cardBody = $('<div>').addClass('card-body text-center');
		let cardTitle = $('<h5>').text("Raging: " + rating);

		img.css('width', '100%');

		img.attr('data-status', 'still');
		img.attr('data-still', imageURL);
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

$(document).on('click', '#buttons .btn', function(){
	let city = $(this).attr('data-city');
	getImages(city);
});


// Function to render your items
function renderItems(collection) {
	// The `ul` where the items will be inserted
	const collectionList = document.getElementById('collection')

	// Loop through each item in the collection array
	collection.forEach(function(item) {

		// This can get annoying, so we can use “template literals” instead
		const itemDetails =
			`<div class="item">
				<a href="${item.linkTo}">
				
				<img src="${item.imageUrl}" />
				<p>${item.year} (${item.time})</p>
		
				</a>
				</div>
			`
			collectionList.insertAdjacentHTML('beforeend', itemDetails) // Which can we then insert

	})
}



// Fetch gets your JSON file.
fetch('data.json')
	.then(function(response) {
		return response.json();	
	})
	.then(function(collection){
		// And passes the data to the function, above!
		renderItems(collection) // In reverse order
	})

	
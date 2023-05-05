// Function to render your items
function renderItems(collection) {
  // The `ul` where the items will be inserted
  const collectionList = document.getElementById('collection')
 
  // Loop through each item in the collection array
  collection.forEach(function(item) {
 
   // This can get annoying, so we can use “template literals” instead
   const itemDetails =
    `<div class="item">
    <div class="mobile">
    
    
    <img src="${item.img}" />

    <p><em> ${item.year}</em></p>
    <em><pre>(Leading cause):(death rate)</pre></em>
    <p><em>${item.leading_cause1}: ${item.rate1}</em></p>
    <p><em>${item.leading_cause2}: ${item.rate2}</em></p>
    <p><em>${item.leading_cause3}: ${item.rate3}</em></p>
    <p><em>${item.leading_cause4}: ${item.rate4}</em></p>
    <p><em>${item.leading_cause5}: ${item.rate5}</em></p>
				</div>
     
      <div class="desktop">
      
      <p>${item.year}</p >
      
      </div>
     </div>
    `
    collectionList.insertAdjacentHTML('beforeend', itemDetails) // Which can we then insert
   
  
   })
  
 }

 
 
 // Fetch gets your JSON file.
 fetch('collection.json')
  .then(function(response) {
   return response.json(); 
  })
  .then(function(collection){
   // And passes the data to the function, above!
   renderItems(collection) // In reverse order
  })

  if (item.leading_cause1 == "COVID-19") { // If this is `true`
    listItem.classList.add('COVID-19') // Add this class to the whole `li`
  }
  if (window.innerWidth < 1030) {
   
		listItem.insertAdjacentHTML('beforeend', itemDetails) // Which can we then insert

		// You can build logic from your data, too
		if (!item.indifferent) { // If this is `false`
			listItem.classList.add('indifferent') // Add this class to the whole `li`
		}

		if (item.leading_cause1 == "COVID-19") { // If this is `true`
			listItem.classList.add('COVID-19') // Add this class to the whole `li`
		}

		if (item.primary_fur_color == "Black") { // If this is `true`
			listItem.classList.add('black') // Add this class to the whole `li`
		}
  }
 
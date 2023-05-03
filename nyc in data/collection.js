// Function to render your items
function renderItems(collection) {
  // The `ul` where the items will be inserted
  const collectionList = document.getElementById('collection')
 
  // Loop through each item in the collection array
  collection.forEach(function(item) {
 
   // This can get annoying, so we can use “template literals” instead
   const itemDetails =
    `<div class="item">
     <a href=" ">
     
     
     <p>${item.year} </p >
   
     </a >
     </div>
    `
    collectionList.insertAdjacentHTML
    ('beforeend', itemDetails) // Which can we then insert
 
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
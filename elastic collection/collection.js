// Function to render your items
function renderItems(home) {
    // The `ul` where the items will be inserted
    const collectionList = document.getElementById('home')
   
    // Loop through each item in the collection array
    collection.forEach(function(item) {
   
     // This can get annoying, so we can use “template literals” instead
     const itemDetails =
      `<div class="item">
       <a href=" ">
       
       < img src="${item.imageUrl}" />
       <p>${item.balloon-color} (${item.time})</p >
     
       </a >
       </div>
      `
      collectionList.insertAdjacentHTML('beforeend', itemDetails) // Which can we then insert
   
    })
   }
   
   
   
   // Fetch gets your JSON file.
   fetch('home.json')
    .then(function(response) {
     return response.json(); 
    })
    .then(function(home){
     // And passes the data to the function, above!
     renderItems(home) // In reverse order
    })
/**
 * Functionality of ShoppingList Module
 *      Developer            Date
 * Tejasree Bejjanki      05-sep-2020
 *    Developer            Updated On
 * Tejasree Bejjanki      06-sep-2020
 */


 /**
  * Consant variable which holds the InnerHTML of ShoppingList module.
  */
const shop = `
<div id="overlay">
  <div class="d-flex justify-content-center">
    <div class="custom-spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>
<div class="container">
  <div class="row">
    <div class="col-md-4">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="kitchen" onchange="checkboxChanged(this)" checked>
        <label class="form-check-label" for="defaultCheck1">
          Kitchen
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="LivingRoom" onchange="checkboxChanged(this)" checked>
        <label class="form-check-label" for="defaultCheck2">
          Living Room furniture
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="BedRoom" onchange="checkboxChanged(this)" checked>
        <label class="form-check-label" for="defaultCheck2">
          Bedroom furniture
        </label>
      </div>
      <button class="btn btn-primary" onclick="filterData()">Filter</button>
    </div>
    <div class="col-md-8">
      <div id="shoppingListItems" class="row">
      </div>
    </div>
  </div>
</div>`;

/**
 * Global Variables
 */
var category = []; // Not being generated dynamically from server
var furnitureData = []; // Holds the furniture data

/** Filtering Functionality START */

/**
 * To facilitate the filtering functionality
 */
function filterData() {
  // If No category is choosen to filter then alert a message
  if (category.length < 1) {
    alert("Please choose a category");
  }
  else {
    // get furniture data based on filter condition
    getFurnitureData();
  }
}

/**
 * This methos is to hold the categories of furniture when user checks the check box under filter criteria.
 * This method gets called on every checkbox state change 
 * @param {*} checkbox Event data send from DOM when checkbox is checked/unchecked
 */
function checkboxChanged(checkbox) {
  if (checkbox.checked) {
    //If the category heckbox is checked,push the id of checkbox into category after verification
    if (!category.includes(checkbox.id))
      category.push(checkbox.id);
  }
  else {
    //If the category heckbox is unchecked,push the id of checkbox into category after verification
    if (category.includes(checkbox.id))
      category = category.filter(function (value, index, arr) { return value !== checkbox.id });
  }
}

/** Filtering Functionality END */


/** AJAX Request START */
/**
 * BUilding the URL to make request
 */
function buildUrl() {
  // If no checkbox is checked, then choose all the categories available.
  // If any new category needs to be added, should be added here as well(since it is not dynamically being generated)
  if (category.length < 1) {
    category = ['kitchen', 'LivingRoom', 'BedRoom']
  }
  //Build the URL
  // Category is the Query parameter
  return 'https://nodejsfurnitureapi.herokuapp.com/getfurniture?category=' + category;
}
/**
 * Makes a http get request(AJAX) to get furniture data.
 */
function getFurnitureData() {
  // Show Loader
  document.getElementById("overlay").style.display = "block";
  
  const Http = new XMLHttpRequest();
  const url = buildUrl();
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4)
    // function call to renderPage with frniture data, Response received from server
      renderpage(JSON.parse(Http.responseText));
  }
}
/** AJAX Request START */

/**
 * Rendering Furniture data START
 */

/**
 * Generates DOM elements from the furniture data received from server
 * @param {*} furnitureData - Furniures data, that have to be rendered on Shop module
 */
function renderpage(furnitureData) {
  // Accessing the shop HTML by id. This method will be appending the nodes to this 
  var shoppingListItems = document.getElementById("shoppingListItems");
  // Clear the shoppingListItems child/sibling nodes
  shoppingListItems.querySelectorAll('*').forEach(n => n.remove());
  // Looping over the furniture data and generting DOM element for each item.
  for (var i = 0; i < furnitureData.length; i++) {
    var element = furnitureData[i];

    // Generating a card
    var columnClass = document.createElement("div"); // div with class card
    columnClass.className = "col-md-4 col-lg-4 col-sm-12 col-xs-12";
    var createCard = document.createElement("div");
    createCard.className = "card";
    columnClass.appendChild(createCard);

    // Image of the item on card
    var FurnitureImg = document.createElement("img"); //image(img)
    FurnitureImg.className = "card-img-top";
    FurnitureImg.src = element.src; // look into designs fold in the workspace
    FurnitureImg.id = "img" + element.id;
    FurnitureImg.alt = "Image not found";
    createCard.appendChild(FurnitureImg);

    // Generate card Body
    var cardBody = document.createElement("div"); // div for card body
    cardBody.className = "card-body";
    createCard.appendChild(cardBody);

    // Card Tile - Name of the Item
    var cardTitle = document.createElement("h4"); // h4 - heading
    cardTitle.className = "card-title";
    var cardTitleText = document.createTextNode(element.name);
    cardTitle.append(cardTitleText);
    cardBody.appendChild(cardTitle);

    // Card Text - Details of the Item (Price)
    var cardText = document.createElement("p"); // p - paragraph with plain text
    cardTitle.className = "card-text";
    var priceText = document.createTextNode("Price: " + element.price);
    cardText.append(priceText);
    cardBody.appendChild(cardText);

    // Card Text - Details of the Item (Item Category)
    var boldText = document.createElement("b"); // for bold text

    var cardTitleCategory = document.createElement("p"); // p - paragraph with plain text
    cardTitleCategory.className = "card-text";
    var cardTitleCategoryText = document.createTextNode("Category: " + element.category);
    cardTitleCategory.append(cardTitleCategoryText);
    boldText.append(cardTitleCategory);
    cardText.append(boldText);
    // Hide Loader
    document.getElementById("overlay").style.display = "none";
    // Attach the element(card with Item detils and image) created to Shop DOM
    shoppingListItems.appendChild(columnClass);
  }
}
/**
 * Rendering Furniture data END
 */
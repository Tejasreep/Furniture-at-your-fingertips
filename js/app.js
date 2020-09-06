/**
 * This JS File includes the Routing of our application.
 *      Developer           Date
 * Tejasree Bejjanki      05-sep-2020
 */

 // Not Mandatory to import, Few versions make it madatory
/* 
import { home } from './home'
import { shop } from './shoppingList' */


 /**
  * SPA Implementation by replacing the content based on locaton hash
  * @param {*} fragmentId - Carries the location hash value (anchor tag part in URL) 
  * @param {*} callback  - call back to change the value on every change of hash
  */
function getContent(fragmentId, callback) {
// content to be replaced in Shell Page
  var pages = {
    home: home, // refer to home.js
    shop: shop // refer to shoppingList.js 
  };
  callback(pages[fragmentId]);
}

/**
 * This method loads the content into shell HTML, based on the location hash.
 * @param - fragmentId To load the content based on the location hash in URL.
 *          stores the location hash value
 */
function loadContent() {
// accessing the DOM by means of id-myApp (shell HTML page)
  var contentDiv = document.getElementById("myApp"),
  //remove the # symbol from location hash and store the value in fragmentId
    fragmentId = location.hash.substr(1);
  // function call to getcontent
  getContent(fragmentId, function (content) {
    // call back 
    // replace the content into Shell HTML
    contentDiv.innerHTML = content;
  });
  // On Load of shopping module 
  if (fragmentId === "shop") {
    // function call to getFurnitureData -  For function body, refer to shoppingList.js
    getFurnitureData();
  }
}

/**
 * location.hash - anchor portion of URL.
 * If the location hash is null then set #home as default value
 */
if (!location.hash) {
  location.hash = "#home";
}

/** Function call to loadContent */
loadContent();

 /**
  * hashchange is event that gets triggered when anchor tag part changed
  * this line listens for the change in the anchor path
  */
window.addEventListener("hashchange", loadContent);



/* Local storage - Block 3 Part 5 Application state */

// Execute in strict mode to prevent some common mistakes
"use strict";

// Function to add an item from local storage to the page
function showItem(listElement, index) {
    // Get the key for this index, and value for the key
    var key = localStorage.key(index);
    var value = localStorage.getItem(key);

    // Create a list item element
    var itemElement = document.createElement("LI");

    // Set text to the value in storage
    itemElement.innerText = key + " = " + value + " ";

    // Function to log a message in the console
    function logMessage() {
        // Look for this message in the JavaScript console...
        console.log("Item at index", index, "has key", key);
    }

    // Log a message in the console when the list item is clicked
    itemElement.addEventListener("click", logMessage);

    // Function to remove the item
    function removeItem(event) {
        // Remove item from local storage by key
        localStorage.removeItem(key);

        // Look for this message in the JavaScript console...
        console.log("Item with key", key, "removed");

        // Refresh the page again
        showItems();

        // Stop this event "bubbling up" to itemElement click listener
        event.stopPropagation();
    }

    // Create a remove button
    var removeButton = document.createElement("BUTTON");
    removeButton.innerText = "Remove itemzzz";

    // Remove the entry when the button is clicked
    removeButton.addEventListener("click", removeItem);

    // Add the button to the list item
    itemElement.appendChild(removeButton);

    // Add the list item to the list element
    listElement.appendChild(itemElement);
}

// Function to show what's in local storage on the page
function showItems() {
    var listElement = document.getElementById("js-list");

    // Remove contents of the list from DOM by removing first child until there are no more
    while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
    }

    // Loop through each item in storage by index
    for (var index = 0; index < localStorage.length; index++) {
        showItem(listElement, index);
    }
}

// Function to store an item in local storage based on form inputs
function storeItemFromForm(event) {
    // Prevent the button click from submitting the form
    // This is like returning false to prevent an invalid form submitting
    event.preventDefault();

    // Read the form data from the form element into a FormData object
    var formElement = document.getElementById("js-form");
    var data = new FormData(formElement);
    var key = data.get("key");
    var value = data.get("value");

    // If the key input is not empty...
    if (key) {
        // ...store a local storage item using the key and value from the form
        localStorage.setItem(key, value);

        // Look for this message in the JavaScript console...
        console.log("Set item", key, "=", value);
    }

    // Refresh the page again
    showItems();
}

// Function to connect event listeners and start the application
function initialize() {
    // A rough check for local storage support
    if (!window.localStorage) {
        // This check is not 100% reliable, but is sufficient for our demo, see e.g.
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability

        // This could be more elegant too, but is sufficient for our demo
        document.getElementById("js-form").outerHTML =
            "<h1>Error: localStorage not supported!</h1>";
    } else {
        // Refresh the page
        showItems();

        // Connect functionality to the Store button
        var storeButton = document.getElementById("js-set");
        storeButton.addEventListener("click", storeItemFromForm);
    }
}

// Connect event listeners and start the application when the page loads
window.addEventListener("load", initialize);

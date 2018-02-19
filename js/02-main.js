
// Firebase loader, initialize firebase right away!!
(function() {
  // Initialize firbase
  firebase.initializeApp(config.firebaseInit);
})();

// Sleep function using promises
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function to display the modal dialog
function showDialog(title, message, buttonText) {
  $("#modal-dialog-title").html(title);
  $("#modal-dialog-message").html(message);
  $("#modal-dialog-button-text").html(buttonText);
  $("#show-dialog").click();
}

// function to close the modal dialog
function closeDialog() {
  $("#modalDialog").click();
}

// Finished
console.log("Finished loading: model-dialog.js ");

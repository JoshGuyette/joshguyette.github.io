
// Firebase loader, initialize firebase right away!!
(function() {
  // Initialize firbase
  firebase.initializeApp(config.firebaseInit);
})();

// setState is a way to save runtime cross-page values
// If I setState("logged-in", true), then access in html like "{{ stateInformation.name }}"
var fabspaStated = { };
function setState(name, value) {
  fabspaStated[name] = value;
}

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

// Firebase loader, initialize firebase right away!!
(function () {
  // Initialize firbase
  firebase.initializeApp(config.firebaseInit);
})();

// state is a way to dynamically manage the root scope without needing access to $rootScope
// example: state.set("test", true), then access it in html like "{{ state.test }}"
var state = {
  set: function (name, value) {
    if (name == "set" || name == "get") { throw new exception("bad key name in set()"); }
    state[name] = value;
  },
  get: function (name) {
    if (name == "set" || name == "get") { throw new exception("bad key name in get()"); }
    return state[name];
  }
};

// Sleep function using promises
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// This function capitalizes the first character of each word in a string
// Credit: https://stackoverflow.com/questions/5086390/jquery-title-case
function titleCase(str) {
  return (str ? str.replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  }) : null);
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
console.log("Finished loading: main.js ");

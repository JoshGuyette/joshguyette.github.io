// This is just support for firebase, firebase is initialized at the beginning of main.js

// onAuthStateChanged event handler, handler added at the end of this script
function onAuthStateChanged(user) {
    if (user) {
        // Move from the welcome page to the dashboard page
        pageNavigate("dashboard");

        // Start an async timer to monitor for inactivity while signed in.
        // Used for auto-logout.
        pollInactivityTimeout();
    }
    state.set("currentUser", user);
    state.set("idleTime", 0);
}

//var user = firebase.auth().currentUser;
    
//if (user) {
  // User is signed in.
//  firebase.auth().currentUser.reload();
//  onAuthStateChanged(user);
//}

// Returns true if the current user is logged in
function isLoggedIn() {
    var currentUser = firebase.auth().currentUser;
    return currentUser != null;
}

// A function for sending out verification e-mails
function sendEmailVerification(header, body) {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        showDialog(header, body, "OK");
        return true;
    })
    .catch(function (err){
        return false;
    });
    return true;
}

// Sign-out of firebase
function firebaseSignOut(){
    if (firebase.auth().currentUser) {
        firebase.auth().signOut().then(function () {
            return true;
        }).catch(function (err) {
            return false;
        });
    }
    return true;
}

// Monitor for user inactivity
async function pollInactivityTimeout() {
    var user = firebase.auth().currentUser;
    // If user logs out break the loop
    while (user != null)
    {
        await sleep(1000);
        state.set("idleTime", state.get("idleTime") + 1);
        if (state.get("idleTime") > config.inactivityLogout) {
          pageNavigate("logout");
          break;
        }
        user = firebase.auth().currentUser;
    }
}

// Handles sign-up's using an email address
function emailSignUp(email, password)
{
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function () {
            sendEmailVerification("E-Mail Verification", "Please verify the e-mail we just sent you.");
            return true;
        })
        .catch(function (error) {
            console.log(error.code + ": " + error.message);
            if (error.code == "auth/weak-password") {
                showDialog("Sign-up Error", "The password is too weak.", "OK");
            } else {
                showDialog("Firebase Error", error.message, "OK");
            }
            return false;
        });
    return true;
}

// Handle email-based password resets
function emailPasswordReset(email)
{
    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
            showDialog("Password Reset", "Email Sent!", "OK");
            return true;
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == "auth/invalid-email") {
                showDialog("Password Reset Error", errorMessage, "OK");
            } else if (errorCode == "auth/user-not-found") {
                showDialog("Password Reset Error", errorMessage, "OK");
            }
            console.log(error);
            return false;
        });
    return true;
}

// Handle email-based sign-in
function emailSignIn(email, password)
{
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function () {
            return true;
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                showDialog("Login Error", "E-Mail or password was incorrect", "OK");
            } else {
                showDialog("Firebase Error", errorMessage, "OK");
            }
            console.log(error);
            return false;
        });
    return true;
}

// Ask firebase for an updated user object
function refreshCurrentUser() {
    firebase.auth().currentUser.reload();
    return firebase.auth().currentUser
}

//
// Firebase loader, initialize firebase onAuthStateChanged event handler
//
(function () {
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
})();

// Finished
console.log("Finished loading: firebase.js ");
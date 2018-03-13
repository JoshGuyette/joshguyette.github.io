//
// This script file is used to setup bindings and is responsibile for most site configuration
//

// This variable is bound to the $rootScope 
var config = {
  // Used for the navbar title
  appName: "Joshua Guyette",
  // Reference
  appVersion: "Beta 1",
  // Number of seconds of idle time before a user logs off
  inactivityLogout: 300,
  // Refresh the site when a user logs out, cleaning out any private information save in javascript variables.
  refreshPageOnLogout: true,
  // This is used to make the connect to firebase
  firebaseInit: {
    apiKey: "AIzaSyDEgB2dkMchvVjdHgVtGT_HgKG9NZA_d4o",
    authDomain: "fabspa-js.firebaseapp.com",
    databaseURL: "https://fabspa-js.firebaseio.com",
    projectId: "fabspa-js",
    storageBucket: "fabspa-js.appspot.com",
    messagingSenderId: "792011811972"
  },
};

// This is the defination for navbar, controls when pages are available, and which pages are default.
// See documentation for details. This variable is bound to the $rootScope 
var navbar = {
  elements: [
    {
      name: "Welcome",
      path: "welcome",
      url: "pages/welcome.html",
      // This is the site's home page and this page provides authentication
      types: ["site-page", "home", "authentication"]
    },
    {
      // This is the user's home page and is also used to verify e-mail addresses
      name: "Dashboard",
      path: "dashboard",
      url: "pages/dashboard.html",
      types: ["user-page", "home", "verify-email"]
    },
    {
      name: "About Me",
      path: "about",
      url: "pages/about.html",
      // This page is always available
      types: ["site-page"]
    },
    {
      name: "Portfolio",
      path: "portfolio",
      url: "pages/portfolio.html",
      // This page is always available
      types: ["site-page"]
    },    {
      name: "Resume",
      path: "resume",
      url: "pages/resume.html",
      // email-verified-required means this page is only accessible if the user has verified their e-mail
      types: [ "user-page", "email-verify-required" ]
    },
    {
      name: "Settings",
      path: "settings",
      url: "pages/settings.html",
      // User settings page, "settings" can be used with "site-page" too
      types: ["user-page", "settings"]
    },
    {
      name: "Logout",
      path: "logout",
      url: "pages/site.html/logout.html",
      // This pseudo page is available if logged in
      types: ["logout"]
    }
  ]
};

var indexPage = {
  // Used for the window title
  titlePrefix: "Professional Profile - ",
  titleSuffix: " - Josh Guyette",
  // Additional globally scoped javascripts should be listed here
  javaScripts: [
    {
      href: "js/custom.js"
    }
  ],
  // CSS stylesheets are loaded dynamically, field names are the same as in link tags
  cssSheets: [
    {
      href:
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
      integrity:
        "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm",
      crossorigin: "anonymous"
    },
    {
      // Style names: cerulean, cosmo, cyborg, darkly, flatly, journal, litera, lumen, lux,
      //              materia, minty, pulse, sandstone, simplex, sketchy, slate, solar, spacelab,
      //              superhero, united, yeti.
      href:
        "https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.0.0/spacelab/bootstrap.min.css"
    },
    {
      // NOT FULLY IMPLEMENTED, need font files for /src/fonts folder
      href:
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    },
    {
      href: "/styles/site.css/modal-dialog.css"
    },
    {
      href: "/styles/site.css/navbar.css"
    },
    {
      href: "/styles/custom.css"
    },
    {
      href: "/styles/site.css/final.css" 
    }
  ]
};

// This is called in the angularjs controller to make some functions
// available to the pages... Bindings {{ isLoggedIn() }} or loops.
// This is called inside the controller, must be a function since none
// of the reference functions are declared yet.
function loadScopeFunctions($rootScope)
{
  $rootScope["showDialog"] = showDialog;
  $rootScope.closeDialog = closeDialog;
  $rootScope.pageNavigate = pageNavigate;
  $rootScope.isLoggedIn = isLoggedIn;
}

// Finished
console.log("Finished loading: config.js ");

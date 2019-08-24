//
// This script file is used to setup bindings and is responsibile for most site configuration
//

// This variable is bound to the $rootScope 
var config = {
  // Used for the navbar title
  appName: "Locksmith Pool",
  // Reference
  appVersion: "Beta 1",
  // Number of seconds of idle time before a user logs off
  inactivityLogout: 300,
  // Refresh the site when a user logs out, cleaning out any private information save in javascript variables.
  refreshPageOnLogout: true,
  // This is used to make the connect to firebase
  firebaseInit: {
    apiKey: "AIzaSyAskdAnagVusl8I9Lljkq4jpnem5rzjimA",
    authDomain: "locksmith-pool.firebaseapp.com",
    databaseURL: "https://locksmith-pool.firebaseio.com",
    projectId: "locksmith-pool",
    storageBucket: "locksmith-pool.appspot.com",
    messagingSenderId: "185412028758",
    appId: "1:185412028758:web:13ed29099b286f0f"
  },
};

// This is the defination for navbar, controls when pages are available, and which pages are default.
// See documentation for details. This variable is bound to the $rootScope 
var navbar = {
  elements: [
    {
      name: "Home",
      path: "home",
      url: "pages/home.html",
      // This is the site's home page and this page provides authentication
      types: ["site-page", "home"]
    },
    {
      // This is the user's home page and is also used to verify e-mail addresses
      name: "Dashboard",
      path: "dashboard",
      url: "pages/dashboard.html",
      types: ["user-page", "home", "verify-email"]
    },
    {
      name: "Locksmiths",
      path: "locksmiths",
      url: "pages/locksmiths.html",
      // This page is always available
      types: ["site-page"]
    },
    {
      name: "Settings",
      path: "settings",
      url: "pages/settings.html",
      // User settings page, "settings" can be used with "site-page" too
      types: ["user-page", "settings"]
    },
    {
      name: "Login",
      path: "login",
      url: "pages/login.html",
      // This page is always available
      types: ["site-page", "authentication"]
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
  titlePrefix: "Locksmith Pool - ",
  titleSuffix: "",
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

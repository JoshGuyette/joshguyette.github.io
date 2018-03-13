//
// This is the function that gets called for the onReady event
//
function onReady() {
  //
  // Put your code that requires being placed in on-ready event in here
  //
}

//
// Document onReady event handler
//
$(document).ready(function() {
  // Global click handler, used to collapse the navbar when it "looses focus" and
  $(document).bind("click", function(e) {
    var target = e.target;

    if ($("#navbar-content").hasClass("show")) {
      $("#navbar-content").collapse("hide");
    }
  });

  // Init inactivity logout
  // If either of these two events occurs, it zeroes the idleTime
  $(this).mousemove(e => state.set("idleTime",  0));
  $(this).keypress(e => state.set("idleTime", 0));

  // Custom onReady
  onReady();
  
  // Finished
  console.log("Finished onReady(): onReady.js");
});

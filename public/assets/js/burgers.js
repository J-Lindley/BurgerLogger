// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: newDevoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(function() {
      console.log("changed devoured to", newDevoured);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newBurgerName = $("#burger")
      .val()
      .trim();

    if (newBurgerName.length > 0) {
      var newBurgerName = {
        name: $("#burger")
          .val()
          .trim(),
        devoured: $("[name=burger]:checked")
          .val()
      };

      // Send the POST request.
      $.post("/api/burgers", newBurgerName
      )
        .then(function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        })
        // .catch(function(err) {
        //   console.log(err);
        // });
    } else {
      alert("please enter a name");
    }
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burger/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});

$(document).ready(function () {
  //this triggers the sign in modal
  $("#submit").on("click", function () {
    $("#myModal").on("shown.bs.modal");
  });
  // this triggers the profile modal
  $("#profile").on("click", function () {
    $("#profileModal").on("shown.bs.modal");
  });
  // this triggers the update/delete event modal
  $(".updateBtn").on("click", function () {
    $("#eventUpdate").on("shown.bs.modal");
  });
  // this triggers userUpdate modal
  $("#updateUser").on("click", function () {
    $("#profileUpdate").on("shown.bs.modal");
  });

  //this move events cards from events div to myEvents div

  $(".going").on("click", function () {
    $("#id1").prependTo($("#myEvent"));
  });
  //this moves events from myEvents to Events
  $(".notGoing").on("click", function () {
    //this needs to move event cards from events div to Events div
    $("#id1").prependTo($("#eventArea"));
  });


  //NEEDS EDIT (formatting on page)
  //loads eventData to eventCards @ #eventArea onload
  //function postEvents() {
  $.get("/api/events", function (events) {
    if (events.length !== 0) {
      for (var i = 0; i < events.length; i++) {
        //creates eventCard for each event from eventsTable
        var eventCard = $("<div>");
        eventCard.addClass("card");
        eventCard.attr("id", events[i].id);
        eventCard.append("<h5 class='card-title'>" + events[i].title + "</h5");
        eventCard.append("<h6>" + events[i].date + "</h6>");
        eventCard.append("<h6>" + events[i].time + "</h6>");
        eventCard.append("<h6>" + events[i].pet_types + "</h6>");
        eventCard.append("<h6>" + events[i].address + "</h6>");
        eventCard.append(
          "<a href='#' class='card-link'>" + events[i].link + "</a>"
        );
        eventCard.append("<hr class='my-4'>");
        eventCard.append(
          "<button type='button' class='btn btn-success btn-sm going'>" +
          "GO" +
          "</button>"
        );
        eventCard.append(
          "<button type='button' class='btn btn-danger btn-sm notGoing'>" +
          "NO" +
          "</button>"
        );
        eventCard.append(
          "<button class='btn btn-warning btn-sm updateBtn'data-toggle='modal'data-target='#eventUpdate'role='button'id='updatebtn'>" +
          "Update" +
          "</button>"
        );
        eventCard.append("<hr class='my-4'>");
        //adds events to div
        $("#eventArea").prepend(eventCard);
      }
    }
  });
  //};

  //commented out because of login system
  // //this collects userData on click
  // $("#addUser").on("click", function() {
  //   //userData
  //   var userData = {
  //     user_name: $("#uName").val(),
  //     user_photo: $("#uPhoto").val(),
  //     email: $("#uEmail").val(),
  //     pet_names: $("#uPets").val(),
  //     pet_Types: $("#petType").val()
  //   };
  //   // sending userData to userTables
  //   $.ajax("/users", {
  //     type: "POST",
  //     data: userData
  //   }).then(function() {
  //     console.log("created new user");
  //     console.log(userData);
  //     location.reload();
  //   });
  // });


  //get the id of someone who is posting an event before the ajax call to post is made. 
  //grab their email when they login 
  var currentUserId;

      
  


  
  function getEvents() {
    $.get("/api/events", function (data) {
      events = data;
    });
    location.reload();
  }

  //this collects eventData on click **WORKS!
  $("#addEvent").on("click", function (event) {
    event.preventDefault();
    //eventData
    var eventData = {
      title: $("#eName").val(),
      date: $("#eDate").val(),
      time: $("#etime").val(),
      address: $("#eAdd").val(),
      link: $("#eLink").val(),
      pet_types: $("#partyType").val(),
      host_name: $("#hName").val(),
      newUserId: currentUserId
    }
    //sending eventData to eventTables
    $.post("/events", eventData, getEvents);
    console.log(eventData);
    location.replace("/");
  });

  //this updates userData
  $("#updateUser").on("click", function (userData) {
    $.ajax({
      method: "PUT",
      url: "/api/users",
      data: userData
    }).then(function () {
      location.reload();
    });
  });

  //this updates eventData
  $("#updateEvent").on("click", function (eventData) {
    $.ajax({
      method: "PUT",
      url: "/api/events",
      data: eventData
    }).then(function () {
      location.reload();
    });
  });


  //this deletes eventData **needs button? 
  $("#deleteEvent").on("click", function () {

    $.ajax({
      method: "DELETE",
      url: "/api/events/1"
    }).then(function () {
      location.reload();
    });
  });

  //for sign in **connected with HTML
  // When the form is submitted, we validate there's an email and password entered

  $("form.login").on("submit", function (event) {

    event.preventDefault();
    var emailInput = $("input#uEmail");
    var passwordInput = $("input#uPassword");
    //currentUserEmail = emailInput;
    //console.log(currentUserEmail);

    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };


    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {

    $.post("/api/login", {
      email: email,
      password: password

    }).then(function (data) {
      currentUserEmail = email; 
      console.log(currentUserEmail);
    // get the logged in user id first so we can use it to post events related to that user. 
    $.get("/api/users/" + currentUserEmail, function (data) {
      var users = data;
      console.log(users);
      currentUserId = users.id;
      console.log(currentUserId);
    });
    //empty the model body and create a new <p> to close the model. 
    $(".modal-body").empty();
    $(".modal-body").text("Login successfull! Close this model and continue with adding or browsing for available events!")  
    //window.location.replace('/');
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    });

  }

  //create user **connected with HTML
  // When the new member button is clicked, we validate the email and password are not blank
  $("#signup").on("submit", function (event) {
    event.preventDefault();
    var emailInput = $("#email");
    var passwordInput = $("#password");
    var petInput = $("#petType");
    var petNameInput = $("#userPet");
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      pet_types: petInput.val().trim(),
      pet_names: petNameInput.val().trim()

    };

    if (!userData.email || !userData.password) {
      return;
    }
    console.log(userData);
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.pet_types, userData.pet_names);
    emailInput.val("");
    passwordInput.val("");
    petInput.val("");
    petNameInput.val("")
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, pet_types, pet_names) {
    $.post("/api/signup", {
      email: email,
      password: password,
      pet_types: pet_types,
      pet_names: pet_names
    }).then(function (data) {
      window.location.replace('/');
      // If there's an error, handle it by throwing up a boostrap alert

      //hide or empty the add member button and the new member form after creating a member

      $("button#newMembers").hide();




    }).catch(handleLoginErr);

  }

  function handleLoginErr(err) {
    alert(err.responseText);
  }

  // onClick #signIn validates email then populates profileData & myEvents
  // $("#signIn").on("click", function() {
  //   //function using username & email find define userName.ID accessing userData emailAddress.id accesing eventData
  //   var userSignin = userData.name.val();
  //   var emailSignin = userData.email.val();
  //   //loops through user finding log in
  //   for (i = 0; i < userData.length; i++) {
  //     if (
  //       userSignin === userData[i].name &&
  //       emailSignin === userData[i].email
  //     ) {
  //       loadMyData();
  //     } else {
  //       console.log("Please Check your info or create a member profile");
  //     }
  //   }
  //   function loadMyData() {
  //     //this populates data in profile modal
  //     $.ajax(currentURL + "/api/", userData, function(userData) {
  //       $("#userName").text(userData.name);
  //       $("#userPhoto").attr("src", userData.photo);
  //       $("#userEmail").text(userData.email);
  //       $("#petType").text(userData.petType);
  //       $("#petNames").text(userData.petNames);
  //     });
  //   }
  // });

  //console.log(currentUserEmail);



});

// Initialize Firebase and change the values of the config values with your own Firebase config values.
var config = {
    apiKey: "AIzaSyCep-XJFBsDYDbtvp-LnmariNbFWtp8GHc",
    authDomain: "today-s-project-d97c6.firebaseapp.com",
    databaseURL: "https://today-s-project-d97c6.firebaseio.com",
    projectId: "today-s-project-d97c6",
    storageBucket: "today-s-project-d97c6.appspot.com",
    messagingSenderId: "987746593485",
    appId: "1:987746593485:web:53731b5f0a260598"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  // Initial Variables (SET the first set IN FIREBASE FIRST)
  // Note remember to create these same variables in Firebase!
  var name = "";
  var destination = "";
  var firstTrainTime = 0;
  var frequency = 0;

$('.submit-button').on("click", function (event) {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train-time").val();
    frequency = $("#frequency").val();


    // newRow = $("<tr>");
     $("#new-table-row").append("<td>" + name + "</td>");
    $("#new-table-row").append("<td>" + destination + "</td>");
    $("#new-table-row").append("<td>" + frequency + "</td>");

    // Change what is saved in firebase
    // database.ref().set({
    //     name: name,
    //     destination: destination,
    //     firstTrainTime: firstTrainTime,
    //     frequency: frequency
    // });




})
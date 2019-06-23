// Issues:
// input form not taking military time
// not sure if arrival time is correct

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

  var database = firebase.database();

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

    var tBody = $("#table-body");
    var tRow = $("<tr>");
    var tdName = $("<td>").text(name);
    var tdDestination = $("<td>").text(destination);
    var tdFrequency = $("<td>").text(frequency);
    var tdArrival = $("<td>").text(tArrival);
    var tdMinutes = $("<td>").text(tMinutes);
    tRow.append(tdName, tdDestination, tdFrequency, tdArrival, tdMinutes);
    tBody.append(tRow);
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");



    // Change what is saved in firebase
    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
})

// Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());
  
        // Log the value of the various properties
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().firstTrainTime);
        console.log(snapshot.val().frequency);

        // First time split into array
        var timeArr = snapshot.val().firstTrainTime.split(":");
        console.log(timeArr);
        var trainTime = moment().hours(timeArr[0]);
        console.log("trainTime: " + trainTime.format("hh:mm"));
        var maxMoment = moment.max(moment(),trainTime);
        console.log("maxMoment: ", + maxMoment);

        if (maxMoment === trainTime){
            tArrival = trainTime.format("hh:mm");
            console.log("tArrival"+ tArrival);
            tMinutes = trainTime.diff(moment(), "minutes");
            console.log("tMinutes:", + tMinutes);
        }
        else { 
            // calculate difference between the times
            var differenceTimes = moment().diff(trainTime, "minutes");
            // time apart (remainder)
            var tRemainder = differenceTimes % snapshot.val().frequency;
            // minutes until next train
            tMinutes = snapshot.val().frequency - tRemainder;
            // next train arrival time
            tArrival = moment().add(tMinutes, "m").format("hh:mm");
        }

        console.log("tMinutes: " + tMinutes);
        console.log("tArrival: "+ tArrival);
  
        // Change the HTML
        // (moved this)
  
        // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });


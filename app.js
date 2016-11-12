// Create Angular App Module
var app = angular.module("hour-tracker", ["firebase"]);

// Create Angular App Controller
app.controller("HourTrackerCtrl", function($scope, $window, $firebaseArray) {
  // Connect to the database
  var ref = firebase.database().ref().child("volunteers");
  $scope.volunteers = $firebaseArray(ref);

  // Add Volunteer hours to the database
  $scope.addHours = function() {
    // Format date to easily readable MM-DD-YYYY format
    var date = ($scope.date.getMonth() + 1) + '-' + $scope.date.getDate() + '-' + $scope.date.getFullYear();

    // Set the amount of hours served depending on volunteer role
    var hours = 0;
    if ($scope.role.name == "roleOne")
      hours = 2;
    else if ($scope.role.name == "roleTwo")
      hours = 3;
    else if ($scope.role.name == "roleThree")
      hours = 4;

    // Copy volunteer role name off scope
    var role = $scope.role.name;

    // Copy location name off scope
    var location = $scope.location.name;

    // Make volunteer name database ref ready
    var name = $scope.volunteerName.replace(" ", "-");

    // Connect to volunteer-specific data space
    var volunteerRef = firebase.database().ref().child("volunteers/" + name);
    var volunteer = $firebaseArray(volunteerRef);

    // Add the session hours to the volunteer
    volunteer.$add({
      "date": date,
      "role": role,
      "hours": hours
    });
  }
});

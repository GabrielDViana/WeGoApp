angular.module('starter')

.service('serviceLocation', function() {

  var location = {}

  var setLocation = function(latitude, longitude) {
    location.latitude = latitude,
    location.longitude = longitude
  }

  var getLocation = function() {
    return location;
  }

  return {
    setLocation: setLocation,
    getLocation: getLocation
  }

})

angular.module('starter')

.service('serviceCreateCompany', function() {

  var company = {}

  var setCompany = function(name, description, latitude, longitude, image) {
    company.name = name,
    company.description = description,
    company.latitude = latitude,
    company.longitude = longitude,
    company.image = image
  }

  var getCompany = function() {
    return company;
  }

  return {
    setCompany: setCompany,
    getCompany: getCompany
  }

})

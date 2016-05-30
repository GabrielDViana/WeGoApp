angular.module('starter')

.service('serviceCompany', function() {

  var company = {}

  var setCompany = function(name, description, adress, latitude, longitude,
    token, days, time_opens, time_closes) {
    company.name = name,
    company.description = description,
    company.adress = adress,
    company.latitude = latitude,
    company.longitude = longitude,
    company.token = token,
    company.days = days,
    company.time_opens = time_opens,
    company.time_closes = time_closes
  }

  var getCompany = function() {
    return company;
  }

  return {
    setCompany: setCompany,
    getCompany: getCompany
  }

})

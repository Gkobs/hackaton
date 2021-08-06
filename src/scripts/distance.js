var map;
var originLatitude;
var originLongitude;


var API_GEO_URL = '';

var getCoords = function() {
// check for Geolocation support
if (navigator.geolocation) {
    console.log('Geolocation is supported!');
}
  else {
    console.log('Geolocation is not supported for this Browser/OS.');
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;

    originLatitude = parseFloat(`${crd.latitude}`);
    originLongitude = parseFloat(`${crd.longitude}`);

  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options); 
}

function initMap() {

  // The map, centered on Central Park
  var center = {lat: 38.71498298124079, lng: -9.145882005009437};
  const options = {zoom: 15, scaleControl: true, center: center, mapId: '4c387b22c5ef189f'};
  map = new google.maps.Map(
      document.getElementById('map'), options);

  map.data.setStyle({visible: false});
  // Locations of landmarks
  var origin = {lat: 38.72022768665229, lng: -9.154320280359785};
  var destination = {lat: 38.71498298124079, lng: -9.145882005009437};
  // The markers for The Dakota and The Frick Collection
  /*var mk1 = new google.maps.Marker({position: origin, map: map});
  var mk2 = new google.maps.Marker({position: destination, map: map});
*/
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map); 
  // Existing map object displays directions
  // Create route from existing points used for markers
  const route = {
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING'
  }

  directionsService.route(route,
    function(response, status) { // anonymous function to capture directions
      if (status !== 'OK') {
        window.alert('Directions request failed due to ' + status);
        return;
      } else {
        directionsRenderer.setDirections(response); // Add route to the map
        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        if (!directionsData) {
          window.alert('Directions request failed');
          return;
        }
        else {
          document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
        }
      }
    })
  }

  var loadMap = function(){

   

    var inputFirstName = document.getElementById('InputFirstName').value;
    var inputLastName = document.getElementById('InputLastName').value;
    var inputPhone = document.getElementById('InputPhone').value;
    var inputSituation = document.getElementById('InputEmail').value;

    console.log(inputFirstName + ' ' + inputLastName + ' ' + inputPhone + ' ' + inputSituation);
    console.log(typeof inputFirstName);

    if(inputFirstName !== '' && inputLastName !== '' && inputPhone !== '' && inputSituation !== ''){

      document.getElementById('form').style.display='none';
      document.getElementById('center').style.display='inline';
      
      getCoords();
      initMap();
    }
    
    
  }

  var toggleForm = function() {

    document.getElementById('form').style.display='block';
    document.getElementById('center').style.display='none';
  }
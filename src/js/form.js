var API_GEO_URL = '';

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

   
  
    console.log(locationRightFormat);

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

 
  console.log("é aqui caralhooo");

console.log('ready');

var getUserStartingLocation = function(obj){
  var success = function(position) {
    var coords = {
      start_latitude: position.coords.latitude,
      start_longitude: position.coords.longitude
    };
    console.log(coords);
    //forward to angular page with coords as parameters
    //call the sunset api using lat and long
    //display the person's representatives
    document.location.href = 'browse';
  };
  var error = function() {
    alert('Error getting location');
  };

	if (!navigator.geolocation){
	  alert('Geolocation is not supported by your browser');
	} else {
  	navigator.geolocation.getCurrentPosition(success, error);
  }
};

document.getElementById('getLocation').onclick=getUserStartingLocation;


var firebase = require("firebase");
var fs = require('fs');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAStCkc69EhE5CBf0JUguncJqmmeX6isUw",
    authDomain: "firechip-23417.firebaseapp.com",
    databaseURL: "https://firechip-23417.firebaseio.com",
    projectId: "firechip-23417",
    storageBucket: "firechip-23417.appspot.com",
    messagingSenderId: "706710591657"
};
firebase.initializeApp(config);

var ref = firebase.database().ref('lights');

ref.set({
	lightzero: true
});

var gpio = require("gpio");
 
// Calling export with a pin number will export that header and return a gpio header instance
var gpio3 = gpio.export(3, {
   // When you export a pin, the default direction is out. This allows you to set
   // the pin value to either LOW or HIGH (3.3V) from your program.
   direction: gpio.DIRECTION.OUT,
 
   // set the time interval (ms) between each read when watching for value changes
   // note: this is default to 100, setting value too low will cause high CPU usage
   interval: 200,
 
   // Due to the asynchronous nature of exporting a header, you may not be able to
   // read or write to the header right away. Place your logic in this ready
   // function to guarantee everything will get fired properly
   ready: function() {
   }
});

// fs.writeFile("/sys/class/gpio/export", "1013", function(err) {});
// fs.writeFile("/sys/class/gpio/gpio1013/direction", "out", function(err) {});
// fs.writeFile("/sys/class/gpio/gpio1013/value", "1", function(err) {});


ref.on("value", function(snapshot) {
	updateLights(snapshot.val());
	
	//data = snapshot.val();
	//if ( data['lightzero'] === 1 ) {	
	//	fs.writeFile("/sys/class/gpio/gpio1013/value", "1", function(err) {});
	//} else {
	//	fs.writeFile("/sys/class/gpio/gpio1013/value", "0", function(err) {});
	//}	

});

function updateLights(lights) {
    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            if(lights[key]) {
                gpio3.set();
            } else {
                gpio3.set(0);
            }
        }
    }
}

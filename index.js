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

fs.writeFile("/sys/class/gpio/export", "1013", function(err) {});
fs.writeFile("/sys/class/gpio/gpio1013/direction", "out", function(err) {});
fs.writeFile("/sys/class/gpio/gpio1013/value", "1", function(err) {});


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
                fs.writeFile("/sys/class/gpio/gpio1013/value", "1", function(err) {});
            } else {
                fs.writeFile("/sys/class/gpio/gpio1013/value", "0", function(err) {});
            }
        }
    }
}

var five = require("johnny-five");
var board = new five.Board();

five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  temperature.on("data", function() {
    console.log(this.celsius);
  });
});
var express = require('express');
var five = require("johnny-five");

var app = express();
var board = five.Board({ "port": "COM3" });

var temperature;
var relay;

var celcius;

board.on("ready", function () {
    relay = new five.Relay(13);
    temperature = new five.Thermometer({
        controller: "LM35",
        pin: "A0"
    });

    temperature.on("change", function () {
        celcius = this.celsius + " °C";
    });

});




app.get('/ligar', function (req, res) {
    relay.on();
    res.send('Ligado');
});

app.get('/desligar', function (req, res) {
    relay.off();
    res.send('Desligado');
});

app.get('/temperatura', function (req, res) {
    res.send(celcius);
});

app.get('/', function (req, res) {
    res.send('FIAP IoT');
});

var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);
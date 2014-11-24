var commander = require('commander');
var http = require('http');

commander
  .version('0.0.1')
  .option('-t, --tty-buf <value>', 'set the tty buffer to read from')
  .option('-s, --unix-socket <value>', 'set the UNIX socket to write to')
  .option('-b, --baudrate [n]', 'set the baudrate for the serial port', parseInt)
  .parse(process.argv);

if(commander.baudrate === undefined) commander.baudrate = 9600;

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort(commander.ttyBuf, {
  baudrate: commander.baudrate
});

console.log(commander.unixSocket);

var socket = http.createServer();
socket.listen(commander.unixSocket);

serialPort.on('open', function()
{
  serialPort.on('data', function(data) {
    //socket.parse();

    //socket.write();

    //socket.flush(); //end?
    console.log('data received: ' + data);
  });
  /*
  serialPort.write("ls\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
  */
});

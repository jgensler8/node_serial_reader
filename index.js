var commander = require('commander');
var net = require('net');

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

var socket = net.createConnection(commander.unixSocket, function()
{
  serialPort.on('open', function()
  {
    console.log("opened");
    
    var json = "";
  
    serialPort.on('data', function(data) {
      if(String(data).indexOf("0000000") === 0)
      {
        //write the json from arduino to the socket
        socket.write(json);
        
        //also log for the user
        console.log(json);
        
        //reset the json variable
        json = "";
      }
      else
      {
         json += data;
      }
      //console.log('data received: ' + data);
    });
  });
});
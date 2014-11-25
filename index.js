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

var socket = http.createServer();
socket.listen(commander.unixSocket);

serialPort.on('open', function()
{
  console.log("opened");
  
  var json = "";

  serialPort.on('data', function(data) {
    if(String(data).indexOf("0000000") === 0)
    {
      //var obj = JSON.parse(json);
      //socket.parse();

      //socket.write();

      //socket.flush(); //end?
      console.log(json);
      json = "";
    }
    else
    {
       json += data;
    }
    //console.log('data received: ' + data);
  });
  /*
  serialPort.write("hello world!\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
  */
});

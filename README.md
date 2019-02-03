# ez-serial-read
## A package that makes the usage of [the serialport package](https://github.com/node-serialport/node-serialport) easier.

<br><br>
### This package was made to make reading an Arduino serial comm easier as normally you have to write many lines of code and end up getting a buffer instead of a string.

<br><br><br><br>

# Install:
```
>  npm i --save ez-serial-read
```


<br><br><br><br><br><br><br><br><br><br><br>
# Usage:
(Arguments prefixed with `?` are optional and will have a default value)
```js
var success = ezSerial(comPort, ?baudRate, callback); // basic initialization
// typeof success = boolean


ezSerial.listAll(result => { // list all open serial ports
    // typeof result = object array
});
```
<br><br><br><br><br><br><br><br>


# Example:
```js
const ezSerial = require("ez-serial-read");

var success = ezSerial("COM4", 9600, data => { // serial port, baud rate, data callback - if you don't know your serial port, run the listAll method like demonstrated below this snippet
    // this function gets called every time a line is being received and the "data" variable contains that line
    console.log(data);
});

if(success) { // the ezSerial() function returns a boolean value that is true, if the connection could be established and false, if not
    console.log("Successfully connected to the serial port!");
}
else {
    console.log("Couldn't connect!");
}
```
<br><br><br><br>


## If you don't know your COM ports, use this:
```js
const ezSerial = require("ez-serial-read");

ezSerial.listAll(console.log);
```
This lists all serial ports to the console. It will look something like this:

```js
[ { comName: 'COM3',
    manufacturer: 'FTDI',
    serialNumber: 'A702H5DS',
    pnpId: 'FTDIBUS\\VID_0403+PID_6001+A702H5DSA\\0000',
    locationId: undefined,
    vendorId: '0403',
    productId: '6001' },
  { comName: 'COM1',
    manufacturer: '(Standard port types)',
    serialNumber: undefined,
    pnpId: 'ACPI\\PNP0501\\0',
    locationId: undefined,
    vendorId: undefined,
    productId: undefined },
  { comName: 'COM4', //       <-           <-           <-           <- this is the actual port of our arduino we want to talk to, so we need to enter "COM4" in the initialization function
    manufacturer: 'Arduino LLC (www.arduino.cc)',
    serialNumber: '85633323530351905232',
    pnpId: 'USB\\VID_2341&PID_0043\\85633323530351905232',
    locationId: 'Port_#0003.Hub_#0003',
    vendorId: '2341',
    productId: '0043' } ]
```
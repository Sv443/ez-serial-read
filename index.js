const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const parser = new Readline();

/**
 * Initialize the serial port listener
 * @param {String} serialPort The serial port that should be listened on. For example: "COM4" or "/dev/ttyS0". To find out all your connected serial devices use the method `listAll()`
 * @param {Number} [baudRate=9600] The baud rate. It defaults to 9600 if left empty
 * @param {Function} callback Callback function which gets executed every time a line of data gets received. This function only has one attribute
 * @returns {Boolean} True, if connection could be established, false if not or the parameters were wrong
 */
module.exports = function (serialPort, baudRate, callback) {
    if(typeof baudRate != "number" || isNaN(parseInt(baudRate)) || baudRate <= 0) baudRate = 9600;
    if(serialPort == null || typeof serialPort != "string" || serialPort === "" || typeof callback != "function" || callback == null) return false;

    try {
        var port = new SerialPort(serialPort, {
            baudRate: baudRate
        });
        
        port.pipe(parser);
        
        port.on("open", () => {
            parser.on("data", data => {
                callback(data.toString());
            });
            return true;
        });
    }
    catch(err) {
        return false;
    }
}

/**
 * Returns all your open serial connections
 * @param {Function} callback Callback function - it has one attribute: an array of objects which contain the serial comm name, manufacturer, SN and other ID's **OR** an error message if one occurs
 */
module.exports.listAll = function(callback) {
    try {
        SerialPort.list().then(res => {
            callback(res);
        }).catch(err => {
            callback(err);
        });
    }
    catch(err) {
        callback(err);
    }
}

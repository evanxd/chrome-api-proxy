/* global ChromeApiProxy */
'use strict';

var extensionId = 'dacgaojeadgpmpmbfoibmncggacokdjd';
var proxy = new ChromeApiProxy(extensionId);

proxy.call('chrome.serial.getDevices')
.then(function(devices) {
  var path;
  devices.forEach(function(device) {
    if (device.path.match('cu.usbmodem')) {
      path = device.path;
    }
  });
  var options = {
    bitrate: 57600,
  };
  return proxy.call('chrome.serial.connect', path, options);
})
.then(function(info) {
  var connectionId = info.connectionId;
  var flag = false;
  setInterval(function(){
    flag = !flag;
    var data = [144, 0, flag ? 1 : 0];
    proxy.call('chrome.serial.send', connectionId, data);
  }, 100);
});

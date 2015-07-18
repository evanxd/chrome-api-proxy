/* global ChromeApiProxy */
'use strict';

var extensionId = 'dacgaojeadgpmpmbfoibmncggacokdjd';
var proxy = new ChromeApiProxy(extensionId);

proxy.call('chrome.serial.getDevices').then(function(devices) {
  var message = '<ul>';
  devices.forEach(function(device) {
    message += ('<li>' + device.path + '</li>');
  });
  message += '</ul>';
  document.querySelector('#message').innerHTML = message;
});

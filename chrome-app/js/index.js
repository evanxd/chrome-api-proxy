'use strict';

chrome.runtime.onConnectExternal.addListener(function(port) {
  var state = document.querySelector('#state');
  state.innerHTML = 'Connected';

  // Send serialport data to the Webpage.
  chrome.serial.onReceive.addListener(function(info) {
    port.postMessage({ type: 'serial', info: info });
  });

  port.onMessage.addListener(function(message) {
    var callId = message.callId;
    var params = message.params;
    if (!params) {
      params = [];
    }
    params.push(function(data) {
      port.postMessage({ callId: callId, data: data });
    });
    // Convert Array to ArrayBuffer.
    if (message.call === 'chrome.serial.send') {
      params[1] = new Uint8Array(params[1]).buffer;
    }
    var call = window;
    var objects = message.call.split('.');
    objects.forEach(function(object) {
      call = call[object];
    });
    call instanceof Function && call.apply(null, params);
  });
});

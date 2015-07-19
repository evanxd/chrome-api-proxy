'use strict';

chrome.runtime.onConnectExternal.addListener(function(port) {
  var state = document.querySelector('#state');
  state.innerHTML = 'Connected';

  port.onMessage.addListener(function(message) {
    var callId = message.callId;
    var params = message.params;
    if (!params) {
      params = [];
    }
    params.push(function(data) {
      port.postMessage({ callId: callId, data: data });
    });
    params.forEach(function(param, i) {
      if (message.call.indexOf('send') !== -1 && typeof param === 'object') {
        params[i] = buffer2ArrayBuffer(param);
      }
    });
    var call = window;
    var objects = message.call.split('.');
    objects.forEach(function(object) {
      call = call[object];
    });
    call instanceof Function && call.apply(null, params);
  });

  function buffer2ArrayBuffer(buffer) {
    var buf = new ArrayBuffer(buffer.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0; i < buffer.length; i++) {
      bufView[i] = buffer[i];
    }
    return buf;
  }
});

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
    var call = window;
    var objects = message.call.split('.');
    objects.forEach(function(object) {
      call = call[object];
    });
    call instanceof Function && call.apply(null, params);
  });
});

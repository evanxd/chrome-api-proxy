'use strict';

chrome.app.runtime.onLaunched.addListener(function() {
  var appWindows = chrome.app.window.getAll();
  // Make sure launch index.html just one time.
  if (appWindows.length === 0) {
    chrome.app.window.create('index.html', {
      hidden: true
    });
  }
});

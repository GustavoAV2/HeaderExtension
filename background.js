chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    var headers = JSON.stringify(details.requestHeaders);
    chrome.storage.local.set({ headersValues: headers }, function() {
      console.log('Headers stored');
    });

    for (let header of details.requestHeaders) {
      if (header.name.toLowerCase() === 'authorization') {
        chrome.storage.local.set({ authToken: header.value }, function() {
          console.log('Authorization Token stored:', header.value);
        });
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders", "blocking"]
);

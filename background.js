/* Regex-pattern to check URLs against.
   It matches URLs like: http[s]://[...]stackoverflow.com[...] */
var urlRegex = /https?\:\/\/www\.youtube.com\/playlist\?list\=/;

/* A function creator for callbacks */
function doStuffWithDOM(element) {
    //alert('Found: ' + element);
}

/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("Extension triggered.");
    /*...check the URL of the active tab against our pattern and... */
    if (urlRegex.test(tab.url)) {
        /* ...if it matches, send a message specifying a callback too */
        chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                                doStuffWithDOM);
    }
    console.log("Background completed.")
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    if (tab.url.indexOf("youtube.com") != -1) {
      //alert("Youtube load complete");
      console.log("Extension triggered.");
      /*...check the URL of the active tab against our pattern and... */
      if (urlRegex.test(tab.url)) {
          /* ...if it matches, send a message specifying a callback too */
          chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                                  doStuffWithDOM);
      }
      console.log("Background completed.")
    }
  }
});

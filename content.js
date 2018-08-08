/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  /* If the received message has the expected format... */
  if (msg.text && (msg.text == "report_back")) {
    /* Call the specified callback, passing
       the web-pages DOM content as argument */
    userID = "UCInsZlvlbBVXDbTXYMkdNtg";
    deleteMessage = "One or more videos have been removed from the playlist because they were deleted from YouTube."
    if(document.getElementById("owner-name").firstChild.href.toString().includes(userID)){
      console.log("This is a personal playlist.");
      //console.log(document.querySelector("#container > yt-formatted-string").innerHTML.toString());
      if(document.querySelector("#container > yt-formatted-string").innerHTML.toString().includes(deleteMessage)) {
        console.log("Deletions detected.");
      }
    }
    else console.log("This is a foreign playlist.");

    //console.log(document.getElementById("title").firstChild.href)
    //console.log(document.querySelector('#title > a').innerText);
    sendResponse(document.getElementById("title").firstChild.innerText);
  }
});

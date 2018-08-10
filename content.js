chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  /* If the received message has the expected format... */
  if (msg.text && (msg.text == "report_back")) {
    /* Call the specified callback, passing
       the web-pages DOM content as argument */
    userID = "UCInsZlvlbBVXDbTXYMkdNtg";
    deleteMessage = "One or more videos have been removed from the playlist because they were deleted from YouTube."
    //get creator of playlist, check against user ID
    if (document.getElementById("owner-name").firstChild.href.toString().includes(userID)) {
      //get, print title
      console.log("This is a personal playlist: " + document.querySelector("#title > a").innerHTML);
      //get playlistID from link on page
      playlistId = document.querySelector("#title > a").href.toString().split('&list=')[1];
      console.log("PlaylistID: " + playlistId);
      //check if alert exists and if it is 'deletions'
      alertMessage = document.querySelector("#container > yt-formatted-string");
      //if (alertMessage && alertMessage.innerHTML.toString().includes(deleteMessage)) {
        console.log("Deletions detected.");
        defineRequest(playlistId);
      //}
    } else console.log("This is a foreign playlist: " + document.querySelector("#title > a").innerHTML);
    sendResponse(document.getElementById("title").firstChild.innerText);
  }
});

function defineRequest(playlistId){
  jQuery(document).ready(function() {

        APIKey = "<GET THIS FROM ONLINE>",
        baseURL = "https://www.googleapis.com/youtube/v3/";

    jQuery.get(baseURL + "playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + APIKey, function(data) {
        console.group("Retrieved Items");
        for(var i = 0; i < data.items.length; i++){
          if(data.items[i].snippet.title == "Deleted video" || data.items[i].snippet.title == "Private video"){
            console.error(i + 1 + ": " + data.items[i].snippet.title);
          }
          else console.log(i + 1 + ": " + data.items[i].snippet.title);
        }
        console.info("Page Break");
        console.groupEnd();
        console.log(data.items);
    });

});
}

/** Wypełnia kod HTML panelu informacjami dotyczącymi aktualnej i kolejnej audycji */
self.port.on('updateCurrentBroadcastInfo', function (strCurrentBroadcastInfo) {

	  var jsonObject = JSON.parse(strCurrentBroadcastInfo);    

    var currentBroadCastInfo = document.getElementById('currentBroadCastInfo');
    currentBroadCastInfo.innerHTML = jsonObject.broadcasts[0].title;
    var currentBroadCastStartFormatted = document.getElementById('currentBroadCastStartFormatted');
    currentBroadCastStartFormatted.innerHTML = jsonObject.broadcasts[0].start_formatted;

    var nextBroadCastInfo = document.getElementById('nextBroadCastInfo');
    nextBroadCastInfo.innerHTML = jsonObject.broadcasts[1].title;
    var nextBroadCastStartFormatted = document.getElementById('nextBroadCastStartFormatted');
    nextBroadCastStartFormatted.innerHTML = jsonObject.broadcasts[1].start_formatted;

});


/** Przechwytuje zdarzenie klikniecia i uruchamia urele w nowej zakladce */
$(window).click(function (event) {
  var t = event.target;  
  
  /** jesli klikniety <a> bedacy rodzicem rodzicem <img> */
  if (t.nodeName == "IMG") {
    t = t.parentNode;    
  }
  
  // Don't intercept the click if it isn't on a link.
  if (t.nodeName != "A") {
    return;
  }

  // Don't intercept the click if it was on one of the links in the header
  // or next/previous footer, since those links should load in the panel itself.
  /*if ($(t).parents('#header').length || $(t).parents('.nextprev').length)
    return;*/

  // Intercept the click, passing it to the addon, which will load it in a tab.
  event.stopPropagation();
  event.preventDefault();
  self.port.emit('click', t.toString());
});


/** Wypełnia kod HTML panelu podcastami wybranej audycji */
self.port.on('updateLastFavouriteBroadcasts', function (strLastFavouriteBroadcasts) {

    var jsonObject = JSON.parse(strLastFavouriteBroadcasts);

    var strLastFavouriteBroadcastsHTML = '';    
    for (i=0; i<jsonObject.broadcasts.length; i++) {

      /* Kod HTML interfejse uruchamiajacego podcast audycji */
      //var strLastFavouriteBroadcastsItemPlayHTML = '<div class="lastFavouriteBroadcastsItemPlay" onclick="playOnlinePodcast(\''+jsonObject.broadcasts[i].audio_file_name+'\');playInterfaceState( $(this) );" title="Posłuchaj teraz"></div>';
      var strLastFavouriteBroadcastsItemPlayHTML = '<div class="el-bt-bg" onclick="playOnlinePodcast(\''+jsonObject.broadcasts[i].audio_file_name+'\', '+jsonObject.broadcasts[i].id+');playInterfaceState( $(this) );" title="Posłuchaj teraz"><div class="el-bt"></div></div>';

      /* Kod HTML z avatarem audycji  */
      //var strLastFavouriteBroadcastsItemLeftHTML = '<div class="lastFavouriteBroadcastsItemLeft"> ' + strLastFavouriteBroadcastsItemSubpageHTML1 + ' <img src="'+jsonObject.broadcasts[i].avatar_file_name+'" border="0" class="lastFavouriteBroadcastsImage" /> ' + strLastFavouriteBroadcastsItemSubpageHTML2 + ' </div>';
      var strLastFavouriteBroadcastsItemLeftHTML = '<a href="'+ jsonObject.broadcasts[i].url +'" class="el-bt-img"><img src="'+jsonObject.broadcasts[i].avatar_file_name+'" class="el-img" border="0" /></a>';

      /* Kod HTML z tytułem i datą audycji */
      var strLastFavouriteBroadcastsItemRightHTML = '<p><a href="'+ jsonObject.broadcasts[i].url +'" class="el-link">' + jsonObject.broadcasts[i].title + '<br />' + jsonObject.broadcasts[i].publication_date + '</a></p></div>';
      

      strLastFavouriteBroadcastsHTML = strLastFavouriteBroadcastsHTML + '<div class="list-el"> <div class="el-header"> ' + strLastFavouriteBroadcastsItemPlayHTML + strLastFavouriteBroadcastsItemLeftHTML + strLastFavouriteBroadcastsItemRightHTML + ' </div>  <div id="podcast_player_container'+ jsonObject.broadcasts[i].id +'" class="audio_container"></div> </div>';
    }


    var lastFavouriteBroadcasts = document.getElementById('lastFavouriteBroadcasts');
    //lastFavouriteBroadcasts.innerHTML = strLastFavouriteBroadcasts;
    lastFavouriteBroadcasts.innerHTML = strLastFavouriteBroadcastsHTML;

});


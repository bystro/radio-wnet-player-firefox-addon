/** Wypełnia kod HTML panelu informacjami dotyczącymi aktualnej i kolejnej audycji */
self.port.on('updateCurrentBroadcastInfo', function (strCurrentBroadcastInfo) {

	  var jsonObject = JSON.parse(strCurrentBroadcastInfo);
    
    
    if(jsonObject.broadcasts[0] == null) {
      $('.list-el list-el-first').hide();
      return false;
    }
    else {
      $('#currentBroadCastInfo').text(jsonObject.broadcasts[0].title);    
      $('#currentBroadCastStartFormatted').text(jsonObject.broadcasts[0].start_formatted);
      $('.list-el list-el-first').show();
    }
    
    if(jsonObject.broadcasts[1] == null) {
      $('.el-first-content').hide();
    }
    else {
      $('.el-first-content').show();
      $('#nextBroadCastInfo').text(jsonObject.broadcasts[1].title);    
      $('#nextBroadCastStartFormatted').text(jsonObject.broadcasts[1].start_formatted);      
    }

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
    for (i=0; i<3; i++) {

      if(jsonObject.broadcasts[i] != null) {
        $('#podcast-list-el'+i).show();        
      }
      else {
        $('#podcast-list-el'+i).hide();
        continue;  
      }      

      $('#podcast'+i+' .el-data').attr('podcast-url', jsonObject.broadcasts[i].audio_file_name);
      $('#podcast'+i+' .el-bt-img').attr('href', jsonObject.broadcasts[i].url);      
      $('#podcast'+i+' .el-img').attr('src', jsonObject.broadcasts[i].avatar_file_name);
      $('#podcast'+i+' .el-link').html(jsonObject.broadcasts[i].title + '<br />' + jsonObject.broadcasts[i].publication_date);
      $('#podcast'+i+' .el-link').attr('href', jsonObject.broadcasts[i].url);
      
    }

});


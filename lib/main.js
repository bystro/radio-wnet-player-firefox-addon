var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = self.data;
var tabs = require("sdk/tabs");

var button = ToggleButton({
  id: "radio-wnet",
  label: "Radio WNET Player",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  badge: '',
  onChange: handleChange
});

var panel = panels.Panel({
  width: 335,
  height: 440,
  contentURL: self.data.url("panel.html"),
  onHide: handleHide,
  contentScriptFile: [data.url("jquery-2.1.4.min.js"),
                      data.url("panel.js")]
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}


function currentBroadcastInfo() {

  //"console.log(document.body.innerHTML);" +
  getFirstParagraph = "self.port.emit('loaded', document.body.innerHTML);"

  pageWorker = require("sdk/page-worker").Page({
    contentScript: getFirstParagraph,
    contentURL: "http://www.radiownet.pl/wnetplayer/MobileAppApi/getCurrentBroadcastInfo.php"
  });

  pageWorker.port.on("loaded", function(strCurrentBroadcastInfo) {
    //console.log(strCurrentBroadcastInfo);    

    panel.port.emit('updateCurrentBroadcastInfo', strCurrentBroadcastInfo);
    require('sdk/timers').setTimeout(currentBroadcastInfo, 1000 * 60);   

  });

}


function lastFavouriteBroadcasts() {

  //"console.log(document.body.innerHTML);" +
  getFirstParagraph = "self.port.emit('loaded', document.body.innerHTML);"

  pageWorker = require("sdk/page-worker").Page({
    contentScript: getFirstParagraph,
    contentURL: "http://www.radiownet.pl/wnetplayer/MobileAppApi/getBroadcastListByEtherId.php?etherId=2064"
  });

  pageWorker.port.on("loaded", function(strLastFavouriteBroadcasts) {    

    panel.port.emit('updateLastFavouriteBroadcasts', strLastFavouriteBroadcasts);
    require('sdk/timers').setTimeout(lastFavouriteBroadcasts, 1000 * 60 * 5);

  });

}


currentBroadcastInfo();
lastFavouriteBroadcasts();

panel.port.on("click", function(url) {
  tabs.open(url);
});

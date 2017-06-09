$(document).ready(function() {
  console.log("jQuery ready");

var jukebox = {
  musicLibrary: [],

  initialize: function() {
    SC.initialize({
      client_id: 'fd4e76fc67798bfa742089ed619084a6',
    })
    this.getSearchBtn();
  },
// ======== ACTIVATE SEARCH BUTTON =========
  getSearchBtn: function() {
    var self = this;
    $('#searchBtn').on('click', function(){
      self.getSongInfo();
    });
  },
// ======= SEARCH SONG AND DISPLAY ON CONSOLE ========
  getSongInfo: function() {
    var self = this;
    var searchText = $('#search').val();
    console.log("search:", searchText);
    SC.get('/tracks', {
      q: searchText
    }).then(function(tracks){
      console.log("==SC.get:tracks==");
      console.log("tracks:", tracks);
      self.musicLibrary = tracks;
      self.displayTrackList(tracks);
      self.activateListItems();
    });
  },
  // ======= DISPLAY TRACK LIST =======
  displayTrackList: function(songs) {
    console.log("==displayTrackList==");
    var songName;
    for (var i = 0; i < songs.length; i++) {
      songName = songs[i].title;
      $('#trackList').append('<li>'+songName+'</li>');
    }
  }
};
jukebox.initialize();
});

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
      songID = songs[i].id;
      $('#song_result').append("<li id='" + songID + "'>" + songName + "</li>");
    };
  },
  // ======= ACTIVATE SEARCH RESULTS =======
  activateListItems: function() {
    console.log("==activateListItems==");
    var self = this;
    $('#song_result').children('li').each(function(nextItem){
      $(this).on('click', function(e){
        console.log('==click==');
        console.log(this.id);
        console.log("this", this);
        self.playSelectedSong(this.id);
      });
    });
  },
// ======== STREAM TRACK =======
  playSelectedSong: function(trackId) {
    console.log("==playSelectedSong==");
    SC.stream("/tracks/" + trackId).then(function(player) {
      self.player = player;
      player.play();
    });
    jukebox.activateAudioButtons();
  },
// ======= AUDIO BUTTONS ========
  activateAudioButtons: function(){
      console.log("== activateAudioButtons ==");
      var audioPlayer = $('#audioPlayer');
      $('#playBtn').on('click', function(event){
          console.log('-- playBtn --');
          player.play();
      });
      $('#pauseBtn').on('click', function(event){
          console.log('-- pauseBtn --');
          player.pause();
      });
  }
}; //CLOSES JUKEBOX
jukebox.initialize();
}); //CLOSES JQUERY

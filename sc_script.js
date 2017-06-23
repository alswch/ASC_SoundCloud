<<<<<<< HEAD
SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
})
console.log("SC:", SC);;

=======
>>>>>>> test
$(document).ready(function() {
  console.log("jQuery ready");

var jukebox = {
<<<<<<< HEAD
  musicLibrary: [
    {title:"New Face", artist:"PSY", url:"music/New Face.mp3"},
    {title:"Through The Night", artist:"IU", url:"music/ThroughTheNight.mp3"},
    {title:"Wild Flower", artist:"Park HyoShin", url:"music/WildFlower.mp3"}
  ],

  initialize: function() {
    this.activateUI();
    this.audioPlayer();
=======
  musicLibrary: [],
  currentTrack: null,

  initialize: function() {
    SC.initialize({
      client_id: 'fd4e76fc67798bfa742089ed619084a6',
    })
>>>>>>> test
    this.getSearchBtn();
  },
// ======== ACTIVATE SEARCH BUTTON =========
  getSearchBtn: function() {
    var self = this;
    $('#searchBtn').on('click', function(){
<<<<<<< HEAD
        console.log("-- click:search --");
        // self.getSearchItem();
    });
  },

  // ======= ACTIVATE SAVE BUTTON =========
  activateUI: function() {
    var self = this;
    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", function(){
      self.saveNewSong();
    });
  },
// ======= ADD NEW SONG =======
  saveNewSong: function() {
    var self = this;    //this is the key code
    var title = document.getElementById('title').value;
    var artist = document.getElementById('artist').value;
    var url = document.getElementById('url').value;
    var nextMusic = new jukebox.Music(title, artist, url);
    jukebox.musicLibrary.push(nextMusic);
    this.createPlaylist();
    this.activatePlaylist();
  },
// ====== MUSIC CONSTRUCTOR ======
  Music: function(title, artist, url) {
    this.title = title;
    this.artist = artist;
    this.url = url;
  },
// ====== DISPLAY MUSIC PLAYLIST =======
  createPlaylist: function() {
    var nextListItem = "";
    for (var i = 0; i < jukebox.musicLibrary.length; i++) {
      nextMusic = jukebox.musicLibrary[i];
      nextMusicTitle = nextMusic.title;
      nextListItem += "<li id='title_" + i + "'>" + nextMusicTitle + "</li>"
    };
    document.getElementById('songList').innerHTML = nextListItem;
  },
// ====== CREATE CLICKABLE LINK FOR PLAYLIST ========
  activatePlaylist: function() {
  var listArray = document.getElementById('songList').getElementsByTagName('li');
  console.log(listArray);
    for (var i = 0; i < listArray.length; i++) {
      nextListItem = listArray[i];
      nextListItem.addEventListener("click", jukebox.displaySelectedSong);
    };
  },
  // ======= DISPLAY SELECTED SONG INFO ========
  displaySelectedSong: function(event) {
    var titleID = event.currentTarget.id;
    var titleIndex = titleID.indexOf("_") + 1;
    var songIndex = titleID.substring(titleIndex);
    var selectedSong = jukebox.musicLibrary[songIndex];
    var songTags = document.getElementById("selectedSong").getElementsByTagName("p");
    songTags[0].innerText = selectedSong.title;
    songTags[1].innerText = selectedSong.artist;
    songTags[2].innerText = selectedSong.url;
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = selectedSong.url;
    audioPlayer.play();
  },

  // ====== AUDIO PLAYER CONTROL=======
  audioPlayer: function() {
    var self = this;
    var audioPlayer = document.getElementById('audioPlayer');
    // ====== PLAY BUTTON ACTION ======
    document.getElementById('playBtn').addEventListener("click", function(){
      audioPlayer.play();
    });
    // ====== PAUSE BUTTON ACTION ======
    document.getElementById('pauseBtn').addEventListener("click", function(){
      audioPlayer.pause();
    });
  }
}
jukebox.initialize();
});

// var backBtn = document.getElementById('backBtn');
// var pauseBtn = document.getElementById('pauseBtn');
// var nextBtn = document.getElementById('nextBtn');
=======
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
        self.currentTrackInfo(this.id);
      });
    });
  },
// ======== STREAM TRACK =======
  playSelectedSong: function(trackId) {
    // console.log("==playSelectedSong==");
    SC.stream("/tracks/" + trackId).then(function(player) {
      self.player = player;
      console.log("player:", player);
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
  },
  // ====== CURRENT TRACK INFO ======
  currentTrackInfo: function(trackId) {
    console.log("==currentTrackInfo==", trackId);
    for (var i = 0; i < this.musicLibrary.length; i++) {
      var nextTrackInfo = this.musicLibrary[i]
      if (trackId == nextTrackInfo.id) {
        this.currentTrack = nextTrackInfo;
        break;
      }
    }
    var trackArtwork = document.getElementById("artwork");
    console.log(trackArtwork);
    trackArtwork.src = this.currentTrack.artwork_url;
    var trackTags = $('#selectedTrack').children();
    trackTags[0].innerText = this.currentTrack.title;
    trackTags[1].innerText = this.currentTrack.artwork_url;
    trackTags[2].innerText = this.currentTrack.description;
    trackTags[3].innerText = this.currentTrack.user.username;

  }



}; //CLOSES JUKEBOX
jukebox.initialize();
}); //CLOSES JQUERY
>>>>>>> test

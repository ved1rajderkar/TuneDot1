new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      volume: 1,
      username: "",
      loggedIn: false,
      userLikes: {},
      tracks: [
        {
          name: "Kill This Love 💔",
          artist: "BlackPink",
          cover: "/TuneDot/img/1.jpg",
          source: "/TuneDot/mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=2S24-y0Ij3Y&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "DDU DU DDU DU 🔫 ",
          artist: "BlackPink",
          cover: "/TuneDot/img/2.jpeg",
          source: "/TuneDot/mp3/Lyrical_ Chammak Challo _ Ra One _ ShahRukh Khan _ Kareena Kapoor [oAVhUAaVCVQ].mp3",
          url: "https://www.youtube.com/watch?v=IHNzOHi8sJs&ab_channel=BLACKPINK",
          favorited: true
        },

        {
          name: "Lovesick Girls",
          artist: "BlackPink",
          cover: "/TuneDot/img/3.jpeg",
          source: "/TuneDot/mp3/Radhe Title Track _ Radhe - Your Most Wanted Bhai _ Salman Khan & Disha Patani _ Sajid Wajid [jA3XkD8k8-A].mp3",
          url: "https://www.youtube.com/watch?v=dyRsYk0LyA8&ab_channel=BLACKPINK",
          favorited: false
        },

        {
          name: "Playing With Fire 🔥",
          artist: "BlackPink",
          cover: "/TuneDot/img/4.jpeg",
          source: "/TuneDot/mp3/Tesher - Jalebi Baby (Original Version) (Official Lyric Video) [IFtwhMK64H8].mp3",
          url: "https://www.youtube.com/watch?v=9pdj4iJD08s&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "Raftaarein",
          artist: "Honey Singh",
          cover: "/TuneDot/img/maxresdefault (1).jpg",
          source: "/TuneDot/mp3/_Raftaarein_ Song With Lyrics _ Ra.One _ Shahrukh Khan, Kareena Kapoor [4G5ScpHkuLA].mp3",
          url: "https://www.youtube.com/watch?v=Amq-qlqbjYA&ab_channel=BLACKPINK",
          favorited: true
        },
        {
          name: "Angreji Beat",
          artist: "Honey Singh",
          cover: "/TuneDot/img/fsg.jpg",
          source: "/TuneDot/mp3/Angreji Beat (Original Video)_ Yo Yo Honey Singh _ Gippy Grewal _ Rimpy Prince _ Veet Baljit [YEf_hnXBbyI].mp3",
          url: "https://youtu.be/YEf_hnXBbyI?si=FZEj9-IjRIzqe6Wk",
          favorited: false
        },
        {
          name: "Blue Eyes",
          artist: "Honey Singh",
          cover: "/TuneDot/img/OIP.jpg",
          source: "/TuneDot/mp3/Blue Eyes Full Video Song Yo Yo Honey Singh _ Blockbuster Song Of 2013 [NbyHNASFi6U].mp3",
          url: "https://youtu.be/NbyHNASFi6U?si=qPyYJ3mrX_2XV93a",
          favorited: true
        },
        {
          name: "MILLIONAIRE",
          artist: "Honey Singh",
          cover: "/TuneDot/img/maxresdefault.jpg",
          source: "/TuneDot/mp3/MILLIONAIRE SONG (Full Video)_ @YoYoHoneySingh _ GLORY _ BHUSHAN KUMAR [XO8wew38VM8].mp3",
          url: "https://youtu.be/XO8wew38VM8?si=ONIR2Cvlxqr3FQ4w",
          favorited: false
        },
        {
          name: "Desi Kalakaar",
          artist: "Honey Singh",
          cover: "/TuneDot/img/4c3a54331de5d1c051915adb662a60e7.600x600x1.jpg",
          source: "/TuneDot/mp3/Official_ Desi Kalakaar Full VIDEO Song _ Yo Yo Honey Singh _ Honey Singh New Songs 2014 [KhnVcAC5bIM].mp3",
          url: "https://youtu.be/KhnVcAC5bIM?si=HhUZlcXgsBb9-gpC",
          favorited: false
        },
        {
          name: "Brown Rang",
          artist: "Honey Singh",
          cover: "/TuneDot/img/22.jpg",
          source: "/TuneDot/mp3/22 (1).mp3",
          url: "https://youtu.be/eizmCZv3aKI?si=a5QR4OUxaj_CiNHy",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
      showLikedBox: false,
      showHistoryBox: false,
      historyTracks: []
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    loginUser() {
      if (!this.username) return;
      this.loggedIn = true;
      // Load likes for this user from localStorage
      const likes = localStorage.getItem("likes_" + this.username);
      if (likes) {
        this.userLikes = JSON.parse(likes);
      } else {
        this.userLikes = {};
      }
      // Update tracks' favorited status
      this.tracks.forEach(track => {
        const key = track.name + "|" + track.artist;
        track.favorited = !!this.userLikes[key];
      });
    },
    favorite() {
      const track = this.tracks[this.currentTrackIndex];
      track.favorited = !track.favorited;
      const key = track.name + "|" + track.artist;
      if (track.favorited) {
        this.$set(this.userLikes, key, true);
      } else {
        this.$delete(this.userLikes, key);
      }
      // Save likes for this user
      if (this.loggedIn) {
        localStorage.setItem("likes_" + this.username, JSON.stringify(this.userLikes));
      }
    },
    playTrack(track) {
      const idx = this.tracks.findIndex(t => t.name === track.name && t.artist === track.artist);
      if (idx !== -1) {
        this.currentTrackIndex = idx;
        this.currentTrack = this.tracks[idx];
        this.resetPlayer();
      }
    },
    setVolume() {
      if (this.$refs.audio) {
        this.$refs.audio.volume = this.volume;
      }
    },
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  },
  mounted() {
    // Touch support for progress bar
    const progress = this.$refs.progress;
    if (progress) {
      progress.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          this.clickProgress({ pageX: e.touches[0].pageX });
        }
      });
    }
    this.setVolume();
  },
  computed: {
    likedTracks() {
      return this.tracks.filter(t => t.favorited);
    }
  },
  watch: {
    currentTrack(newTrack) {
      // Add to history if not already last played
      if (!this.historyTracks.length || this.historyTracks[this.historyTracks.length - 1].name !== newTrack.name) {
        this.historyTracks.push(newTrack);
        // Optional: keep history max 20
        if (this.historyTracks.length > 20) this.historyTracks.shift();
      }
    },
    volume(val) {
      this.setVolume();
    }
  }
});

window.onload = function() {

  //var document = document;

  var canvas = document.getElementsByClassName('power-core')[0];
  var laserGridToggle = document.getElementsByClassName('oh-god-turn-it-off-please-my-computer-is-on-fire')[0];
  var powerStation = document.getElementsByClassName('power-station')[0];
  var music = document.getElementsByClassName('the-music')[0];
  var mute = document.getElementById('mute');

  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;

  var lineW = 2;
  var distortion = 1.05;
  var loopIndex = 30;
  var lineCount = w/30;

  var laserGridOnline = true;

  /*var song = new Audio('static/audio/power-glove--power-core.ogg','static/audio/power-glove--power-core.mp3');
  var duration = song.duration;
  
  if (song.canPlayType('audio/mpeg;')) {
    song.type= 'audio/mpeg';
    song.src= 'static/audio/power-glove--power-core.mp3';
  } else {
    song.type= 'audio/ogg';
    song.src= 'static/audio/power-glove--power-core.ogg';
  }

  song.play();

  console.log(song);
  */

  function resizeCanvas() {
    if(powerStation.offsetWidth <= 768){
      //console.log(this);
      canvas.height = 200;
    }else{
      canvas.height = 400;
    }
    canvas.width = powerStation.offsetWidth;
    w = canvas.width;
    h = canvas.height;
    lineCount = w/30;


  }
  resizeCanvas();

  var cx = w,
      cy = h/2,
      cx2 = w*2,
      cy2 = canvas.height;

  var flip = {
    
    theSwitch: function () {
      window.requestAnimationFrame(flip.table);
    },

    table: function(){

      if(loopIndex>=30){
        cx = w;
        cy = h/2;
        cx2 = w*2;
        cy2 = canvas.height;

        loopIndex = 1;
      }else{
        loopIndex++;
      }

      ctx.clearRect(0,0,w,h);

      var lineX = 1;

      for(var i=0; i<=22; i++) {

        ctx.beginPath();
        ctx.moveTo(0, lineX);
        ctx.lineTo(w, lineX);
        ctx.lineWidth = lineW;
        ctx.strokeStyle = 'pink';
        ctx.stroke();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "deeppink";

        lineX = h / 2 - (lineX * distortion);

      }


      for(var j=0; j<=lineCount; j++) {

        ctx.beginPath();
        ctx.moveTo(cx-j*30, cy);
        ctx.lineTo(cx2-j*90, cy2);
        ctx.lineWidth = lineW;
        ctx.strokeStyle = 'pink';
        ctx.stroke();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "deeppink";

      }

      cx--;
      cx2 -=3;
      
      if(laserGridOnline === true){
        window.requestAnimationFrame(flip.table);
      }
    }
  };


  flip.theSwitch();

  window.addEventListener('resize', resizeCanvas, false);

  /*mute.addEventListener("click", function(e) {
    if(song.muted !== true){
      song.muted = true;
      this.className = "fa fa-volume-off";
    }else{
      song.muted = false;
      this.className = "fa fa-volume-up";
    }
  });*/
  
  setTimeout(function(){
    music.className = "the-music animated bounceInLeft ";
  },500);

  laserGridToggle.addEventListener("click", function(e) {
    if(laserGridOnline === true){
      laserGridOnline = false;
      laserGridToggle.innerHTML = "Actually this LASER GRID is too awesome. I don't care about the wellbeing of my computer. Turn it back on!";
    }else{
      laserGridOnline = true;
      window.requestAnimationFrame(flip.table);
      laserGridToggle.innerHTML = "My computer is on fire, please turn of this terribly coded and inefficient LASER GRID.";
    }
  });
};
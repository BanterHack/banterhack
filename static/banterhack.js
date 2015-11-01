window.onload = function() {

  var $ = document;

  var canvas = $.getElementsByClassName('power-core')[0];
  var laserGridToggle = $.getElementsByClassName('oh-god-turn-it-off-please-my-computer-is-on-fire')[0];
  var powerStation = $.getElementsByClassName('power-station')[0];
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;

  var lineW = 2;
  var distortion = 1.05;
  var loopIndex = 30;
  var lineCount = w/30;

  var laserGridOnline = true;

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
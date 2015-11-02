window.addEventListener("DOMContentLoaded", function() {

  var canvas = document.getElementsByClassName('power-core')[0],
      laserGridToggle = document.getElementsByClassName('oh-god-turn-it-off-please-my-computer-is-on-fire')[0],
      powerStation = document.getElementsByClassName('power-station')[0],
      music = document.getElementsByClassName('the-music')[0],
      ctx = canvas.getContext('2d'),
      w = canvas.width,
      h = canvas.height,
      cx = w,
      cy = 0,
      cx2 = w*2,
      cy2 = canvas.height,
      lineW = 2,
      distortion = 1.13,
      loopIndex = 30,
      lineCount = w/30,
      laserGridOnline,
      horizontalLineCount = 10,
      laserInterval;


  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
    
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  }

  function theLaserGrid(){
     
    if(loopIndex>=30){
      cx = w;
      cy = 0;
      cx2 = w*2;
      cy2 = canvas.height;

      loopIndex = 1;
    }else{
      loopIndex++;
    }

    ctx.clearRect(0,0,w,h);

    var lineY = 1;

    for(var i=0; i<=horizontalLineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.lineTo(w, lineY);
      ctx.lineWidth = lineW;
      ctx.strokeStyle = 'pink';
      ctx.stroke();
      ctx.shadowBlur = 10;
      ctx.shadowColor = "deeppink";

      lineY = (lineY + 8) * distortion;
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
  }

  function runLaserGrid() {
    if(typeof laserInterval != "undefined") clearInterval(laserInterval);
    laserInterval = setInterval(theLaserGrid, 33);
  }

  function stopLaserGrid() {
    clearInterval(laserInterval);
  }

  function resizeCanvas() {
    if(powerStation.offsetWidth <= 768){
      canvas.height = 100;
      horizontalLineCount = 6;
    }else{
      canvas.height = 200;
      horizontalLineCount = 10;
    }
    canvas.width = powerStation.offsetWidth;
    w = canvas.width;
    h = canvas.height;
    lineCount = w/30;
  }

  function toggleLaserGrid(check) {
    if(check !== true){
      laserGridOnline = !laserGridOnline;
      setCookie('laserGrid', laserGridOnline, 1);
      window.requestAnimationFrame(theLaserGrid);
    }

    if(laserGridOnline === true){
      laserGridToggle.innerHTML = "My computer is on fire, please turn of this terribly coded and resource-hungry LASER GRID.";
      runLaserGrid();
    }else{
      laserGridToggle.innerHTML = "Actually this LASER GRID is too awesome. I don't care about the wellbeing of my computer. Turn it back on!";
      stopLaserGrid();
    }
  }

  function begin() {
    if((getCookie('laserGrid') === "")){
      laserGridOnline = true;
    }else{
      laserGridOnline = JSON.parse(getCookie('laserGrid'));
    }

    window.addEventListener('resize', resizeCanvas, false);

    resizeCanvas();
    theLaserGrid();
    toggleLaserGrid(true);

    setTimeout(function(){
      music.className = "the-music animated bounceInRight ";
    },200);
  }

  begin();

  laserGridToggle.addEventListener("click", function(e) {
    toggleLaserGrid();
  });
  
});
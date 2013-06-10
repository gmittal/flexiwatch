/* Current Gestures for Mobile:
tap 1: start
tap 2: stop
slide: reset
*/
var tenthseconds = 0;
var countSec = 0;
var seconds = 0;
var countMin = 0;
var minutes = 0;
var running = false;
var numClicks = 0;
var stopwatch;
var numLaps = 0;
var lapMin1 = 0;
var lapSec1 = 0;
var lapTenth1 = 0;
var lapMin = 0;
var lapSec = 0;
var lapTenth = 0;

function init() {                       // INIT
  if (running === true) {  
  stopwatch = setInterval(tick, 100);
  } else if (running === false) {
  clearInterval(stopwatch);  
  displayStartFactor();
  }
}

function touchInput() {
  numClicks++;
  if (running === true) {
    running = false;
  } else {
  running = true;
  }
  init();
}

function checkMobile() {
document.addEventListener('touchstart', touchInput, false);
event.preventDefault();
if ($(document).width() > 500) {
$(document).bind('click', function() {
  touchInput();  
});
} //end if
  
   $(function() {      
      $(document).swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
         document.removeEventListener('touchstart', touchInput, false);
         running = true;
          
          if (direction == "up") {
            resetStopwatch();
            document.addEventListener('touchstart', touchInput, false);
          } // end direction up if

          if (direction == "down") {
            resetStopwatch();
            document.addEventListener('touchstart', touchInput, false);
          } // end direction down if
          
          if (direction == "right") {
            running = false;
            if (running === false) {
            init();
            displayStartFactor();
            lapStopwatch();
            running = true;
            init();
            document.addEventListener('touchstart', touchInput, false);
            } else {
            
            }
           } // end direction right if
          
          if (direction == "left") {
            running = false;
            if (running === false) {
            init();
            displayStartFactor();
            lapStopwatch();
            running = true;
            init();
            document.addEventListener('touchstart', touchInput, false);
            } else {
            
            }
          } // end direction left if
          
          
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
      });
     
    });
   
  
  if ($(document).width() > 500) {
      $(document).bind("dblclick", function() {
        resetStopwatch();
      });
  }
}



$(document).ready(function() {
checkMobile();
  $("body").append("<div id=\"title\">stop<span id=\"less\">watch</span></div><br /><div id=\"watchWrapper\"><div id=\"dispSpacing\"></div><div id=\"watchDisplay\"></div><div id=\"startStop\"></div></div><br /><div id=\"lapBox\"></div>");
checkZero();
displayStartFactor();
updateDisplay();
});


function tick() {
  tenthseconds++;
  if (tenthseconds > 9) {
    tenthseconds = 0;
    countSec++;
  }
  if (countSec > 59) {
    countSec = 0;
    countMin++;
  }
  checkZero();  
  displayStartFactor();
  updateDisplay();
}


function convertMilliseconds() {
var result = (tenthseconds * 1000);
}


function displayStartFactor() {
  if (running === true) {
    $("#startStop").html("<b>STOP</b>");
  } else if (running === false) {
    $("#startStop").html("<b>START</b>"); 
  }
}


function checkZero() {
if (seconds < 10) {
    seconds = "0" + countSec;
  } else {
    seconds = countSec;
  } 
  if (minutes < 10) {
    minutes = "0" + countMin;
  } else {
    minutes = countMin;
  }
}

function resetStopwatch() {
tenthseconds = 0;
countSec = 0;
seconds = 0;
countMin = 0;
minutes = 0;
running = false;
clearInterval(stopwatch);
clearLaps();
checkZero();
displayStartFactor();
updateDisplay();
}

function lapStopwatch() {
  numLaps++;
  /* lapMin = minutes - lapMin1;
  lapSec = seconds - lapSec1;
  lapTenth = tenthseconds - lapTenth1;
  if (numLaps == 1) {
  lapMin1 = minutes;
  lapSec1 = seconds;
  lapTenth1 = tenthseconds;
  $("#lapBox").prepend("Lap " + numLaps + ": <span class=\"lapnums\">" + lapMin1 + ":" + lapSec1 + "." + lapTenth1 + "</span><br /><br />");
  } else {
  $("#lapBox").prepend("Lap " + numLaps + ": <span class=\"lapnums\">" + lapMin + ":" + lapSec + "." + lapTenth + "</span><br /><br />");
    lapMin1 = lapMin;
    lapSec1 = lapSec;
    lapTenth1 = lapTenth;
  } */
  $("#lapBox").prepend("LAP " + numLaps + ": <span class=\"lapnums\">" + minutes + ":" + seconds + "." + tenthseconds + "</span><br /><br />");
}

function clearLaps() {
  $("#lapBox").html(""); 
  numLaps = 0;
}

function displaySettings() {

} 

function updateDisplay() {
  $("#watchDisplay").html("<div class=\"nums\" id=\"minutes\"><b>" + minutes + "</b></div>:<div class=\"nums\" id=\"seconds\">" + seconds + "</div>.<div class=\"nums\" id=\"tenthseconds\">" + tenthseconds + "</div>");
}
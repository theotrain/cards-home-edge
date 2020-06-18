// $(".card").click(function(){
//   var id = parseInt($(this).attr('id')[1]);
//   showCard(id);
// });
let cardTotal = 4
let cardNum = 0
let firstClick = true
let phoneWidth = 690;

// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
window.addEventListener("resize", resizeWindow);

function resizeWindow() {
  vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

var transitionEvent = whichTransitionEvent();


$("#nav-left").click(prevCard);
$("#nav-right").click(nextCard);
$("#scene").click(function() {
  if (firstClick) {
    firstClick = false;
    $(".card").addClass("stack");
    // nextCard();
    setTimeout(function() {
      $('#card-section-nav').removeClass('wide');
      $('#card-section-controls').css("visibility", "visible");
      // $('#card-section-quotes').show();
      $('#card-section-quotes').removeClass('show-preclick');
      $('#card-section-quotes').addClass('show-postclick');
      // $('.card, .is-flipped').css('transition-duration', '1s, 1s, 0.65s');
      nextCard();
    }, vw <= phoneWidth ? 0 : 1000);
  } else {
    nextCard();
  }
  
});

function nextCard() {
  cardNum += 1;
  if (cardNum > cardTotal) { cardNum = 0 }
  if (cardNum == 0) {
    showCard(1, true);
    return;
  }
  showCard(cardNum);
}
function prevCard() {
  cardNum -= 1;
  if (cardNum < 0) { cardNum = cardTotal }
  if (cardNum == 0) {
    showCard(1, true);
    return;
  }
  showCard(cardNum);
}

// $(document).ready(function() {
//   $('.card-quotes').hide();
//   // $('#quote1').fadeIn();
//   // $('#c1').toggleClass('is-flipped');
//   // $(".card").removeClass('is-flipped');
// });
var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;


function showCard(id, allFaceDown=false) {
  $(".card").removeClass('is-flipped');
  $('.card-quotes').hide();
  $('#quote' + id).fadeIn();
  // i need to remove the card section from #scene
  // i need to remove the card section from #top-card
  // and reinsert it at the end of #scene
  var new_top = $('#c' + id)[0];
  var old_top = $('#top-card').children()[0];
  var top_card = $('#top-card')[0];
  $('#c' + id).remove();
  $('#scene').append(old_top);
  $('#top-card').children().remove();
  $('#top-card').append(new_top);
  $('#top-card').remove();
  $('#scene').append(top_card);
  if (!allFaceDown) {
    setTimeout(function() {$("#c" + id).toggleClass('is-flipped');}, 50);
  }
  if (isSafari) {
    $("#top-card").addClass('topstyle');
    $("#c" + id).one(transitionEvent,
      function(event) {
        // Do something when the transition ends
        // console.log('transition ended');
        $("#top-card").removeClass('topstyle');
      }
    );
  }
}

// function allFaceDown(oldTopCardId) {
//   $(".card").removeClass('is-flipped');
//   $('.card-quotes').hide();
//   var new_top = $('#c1')[0];
//   var old_top = $('#top-card').children()[0];
//   var top_card = $('#top-card')[0];
//   $('#c' + id).remove();
//   $('#scene').append(old_top);
//   $('#top-card').children().remove();
//   $('#top-card').append(new_top);
//   $('#top-card').remove();
//   $('#scene').append(top_card);
//   setTimeout(function() {$("#c" + id).toggleClass('is-flipped');}, 50);
  
// }

//disable links for testing only
$(".card-quotes a").on("click", function(event){
  event.preventDefault();
});


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            nextCard();
        } else {
            prevCard();
        }                       
    } 
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

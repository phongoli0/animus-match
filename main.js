$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var can_click_card = true;
var images = [
  "altair.jpg",
  "arno.jpg",
  "bayek.jpg",
  "connor.jpg",
  "edward.jpg",
  "evie.jpg",
  "ezio.jpg",
  "kassandra.jpg",
  "jacob.jpg"
];
var attempts = 0;
var accuracy = 0;
var gamesPlayed = 0;

function initializeApp() {
  shuffle(images);
  randomizeAndGenerateCards();
  $(".card").click(cardClicked);
  $(".resetButton").click(resetGame);
  winModal();
}


function pickSound() {
  var player = new Audio("audio/hidden-blade.mp3");
  player.play();
}
function wrongSound() {
  var player = new Audio("audio/ac-dmg.mp3");
  player.play();
}
function matchSound() {
  var player = new Audio("audio/respawn.mp3");
  player.play();
}
function resetSound() {
  var player = new Audio("audio/eagle.mp3");
  player.play();
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function randomizeAndGenerateCards() {
  var doubleImages = images.concat(images);
  for (var i = 0; i < doubleImages.length; i++) {
    var container = $("<div>").addClass("cardContainer");
    var card = $("<div>").addClass("card");
    var front = $("<img>")
        .addClass("front")
        .attr("src", "images/" + doubleImages[i]);
    var back = $('<img src="images/back.jpg">')
        .addClass("back");
    card.append(back, front);
    container.append(card);
    $(".gameArea").append(container);
  }
}

function cardClicked() {
  if (can_click_card === false) {
    return;
  }
  if (first_card_clicked === null) {
    first_card_clicked = $(this);
    first_card_clicked.parent().addClass("click");
    pickSound();
    openModal();
    return;
  } else {
    second_card_clicked = $(this);
    second_card_clicked.parent().addClass("click");
    pickSound();
    var first_card_src = first_card_clicked.find(".front").attr("src");
    var second_card_src = second_card_clicked.find(".front").attr("src");
    if (first_card_src === second_card_src) {
      match_counter++;
      attempts++;
      displayStats();
      matchSound();
      accuracy = match_counter / attempts;
      if (match_counter === total_possible_matches) {
        openModal();
      }
      first_card_clicked = null;
      second_card_clicked = null;
      return;
    } else {
      attempts++;
      displayStats();
      accuracy = match_counter / attempts;
      can_click_card = false;
      setTimeout(hideBothCards, 1000);
    }
  }
}

function hideBothCards() {
  wrongSound();
  first_card_clicked.parent().removeClass("click");
  second_card_clicked.parent().removeClass("click");
  first_card_clicked = null;
  second_card_clicked = null;
  can_click_card = true;
}

function displayStats() {
  $("#gamesPlayed").text(gamesPlayed);
  $("#attempts").text(attempts);
  $("#accuracy").text(accuracy.toFixed(2) + "%");
}

function resetStats() {
  match_counter = 0;
  attempts = 0;
  accuracy = 0;
  displayStats();
}

function resetGame() {
  resetSound();
  gamesPlayed++;
  resetStats();
  $(".gameArea").empty();
  shuffle(images);
  randomizeAndGenerateCards();
  $(".card").click(cardClicked);
}

function winModal(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
  }
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
  }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
    }
  }
    openModal = function() {
      modal.style.display = "block";
  }
}


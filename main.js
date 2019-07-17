$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 1;
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
  themeSong();
  winModal();
}

function themeSong() {
  var player = new Audio("audio/theme-song.mp3");
  var pauseButton = document.getElementById("pause");
  player.play();
  player.loop = true;
  player.volume = .6;
  pauseButton.onclick = function() {
    player.pause();
  }
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
function winSound(){
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
        .addClass("back vibrate");
    card.append(back, front);
    container.append(card);
    $(".gameArea").append(container);
  }
}

function cardClicked() {
  if (can_click_card === false || $(this).parent().hasClass("click")) {
    return;
  }
  if (first_card_clicked === null) {
    first_card_clicked = $(this);
    first_card_clicked.parent().addClass("click");
    pickSound();
    return;
  } else {
    second_card_clicked = $(this);
    second_card_clicked.parent().addClass("click");
    can_click_card = false;
    pickSound();
    var first_card_src = first_card_clicked.find(".front").attr("src");
    var second_card_src = second_card_clicked.find(".front").attr("src");
    if (first_card_src === second_card_src) {
      can_click_card = false;
      match_counter++;
      attempts++;
      displayStats();
      matchSound();
      can_click_card = true;
      accuracy = match_counter / attempts;
      if (match_counter === total_possible_matches) {
        can_click_card = false;
        openModal();
        winSound();
      }
      first_card_clicked = null;
      second_card_clicked = null;
      return;
    } else {
      can_click_card = false;
      attempts++;
      displayStats();
      accuracy = match_counter / attempts;
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
  $("#accuracy").text((accuracy*100).toFixed(2) + "%");
}

function resetStats() {
  match_counter = 0;
  attempts = 0;
  accuracy = 0;
  displayStats();
}

function resetGame() {
  gamesPlayed++;
  resetStats();
  $(".gameArea").empty();
  shuffle(images);
  randomizeAndGenerateCards();
  $(".card").click(cardClicked);
}

function winModal() {
  var modal = document.getElementById("myModal");
  openModal = function() {
    modal.style.display = "block";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}


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
    var front = $("<div>").addClass("front");
    var back = $('<img src="images/back.jpg">').addClass("back");
    var image = $("<img>")
      .addClass("imageMod")
      .attr("src", "images/" + doubleImages[i]);
    front.append(image);
    card.append(front, back);
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
    first_card_clicked.find(".back").addClass("hide");
    console.log(first_card_clicked);
    return;
  } else {
    second_card_clicked = $(this);
    second_card_clicked.find(".back").addClass("hide");
    var first_card_src = first_card_clicked.find(".front img").attr("src");
    var second_card_src = second_card_clicked.find(".front img").attr("src");
    if (first_card_src === second_card_src) {
      match_counter++;
      attempts++;
      displayStats();
      accuracy = match_counter / attempts;
      if (match_counter === total_possible_matches) {
        alert("you won");
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
  first_card_clicked.find(".back").removeClass("hide");
  second_card_clicked.find(".back").removeClass("hide");
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
  gamesPlayed++;
  resetStats();
  $(".gameArea").empty();
  shuffle(images);
  randomizeAndGenerateCards();
  $(".card").click(cardClicked);
}

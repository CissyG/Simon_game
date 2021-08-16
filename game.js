var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var start = false;
var counter = 0;

$(document).keypress(function () {
  if (start === false) {
    start = true;
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("#level-title").text("level " + level);
  userClickPattern = [];
  counter = 0;
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(counter, userChosenColour);
  counter++;
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel, name) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("Success");
    playSound(name);
    if (currentLevel === level - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("Wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}

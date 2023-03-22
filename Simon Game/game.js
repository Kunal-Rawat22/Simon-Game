var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyboardClick = 0;
var level = 0;

//starting point
$("body").keydown(function (e) { 
    if (keyboardClick === 0)
    {
        setTimeout(function () {
            nextSequence();
        }, 400);
        keyboardClick++;
    }
});

function nextSequence()
{
    $("#level-title").html("Level " + ++level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var randomId = "#" + randomChosenColour;
    $(randomId).fadeOut(100).fadeIn(100); //$("#"+randonChosenColour).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour);
}

//input answer
$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//checking answer
function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (currentLevel + 1 === level) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 700);
        }
    }
    else
        restart();
}

//wrong option
function restart()
{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    },200);
    $("#level-title").html("Game Over, Press A Key to Restart");
    level = 0;
    userClickedPattern = [];
    keyboardClick = 0;
    gamePattern =[];
}

//sound
function playSound(name) { 
    var audio = new Audio("sounds/" + name + ".mp3");
    console.log(audio);
    audio.play();
}
//animation
function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function ()
    {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}





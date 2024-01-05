var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function newSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var length = userClickedPattern.length;
    checkAnswer(length);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100)
}

var level = 0;
$("body").on("keydown", function(event){
    newSequence();
    $("h1").text("Level " + level);
})


function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
        if(currentLevel === gamePattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
}
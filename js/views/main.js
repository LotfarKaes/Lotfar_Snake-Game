/**
 * Created by lotfar kaes on 16.10.2016.
 */

var isGameOver;
var direction = "right"; //Default direction
var score;
var highscore;
var updateInterval;
var snake_array = []; 
var myDisplayResolution = window.devicePixelRatio || 1;

//Create an object
var rendererOptions = {
antialiasing: false,
transparent: false,
resolution: 1
};

//Create the renderer
var renderer = PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, rendererOptions );

//Add the canvas to the HTML document
document.body.appendChild( renderer.view );

//Create a container object called the `stage`
var stage = new PIXI.Container();
renderer.backgroundColor = 0x660033;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize( window.innerWidth, window.innerHeight );

//Detect if devise is mobile
var isMobile = /iPhone|iPad|iPod|Android/i.test( navigator.userAgent );
var gameOverText;

if ( !isMobile ) {
    document.addEventListener( 'keydown', onKeyDown );

    gameOverText = 'Game Over!\nplease press space to restart';
}
else { 
    document.addEventListener( 'touchstart', onTouchStart, false );
    document.addEventListener( 'touchend', onTouchEnd, false );

    gameOverText = 'Game Over!\ntap one the screen to restart';

    var currentX;
    var prevX;
    var currentY;
    var prevY;
}

// Set the width and height of our boxes
var boxWidth = 30 * myDisplayResolution;
var boxHeight = 30 * myDisplayResolution;

// Create the snake head
var playerBox = new PIXI.Graphics();
playerBox.lineStyle( 1, 0xBB22FF, 1 );
playerBox.beginFill( 0xFFFFFF );
playerBox.drawRect( 0, 0, boxWidth, boxHeight );
playerBox.endFill();

// Create the food
var goalBox = new PIXI.Graphics();
goalBox.beginFill( 0x0000FF );
goalBox.drawRect( 0, 0, boxWidth, boxHeight );
goalBox.endFill();

// Add boxes to the stage
stage.addChild( goalBox );

snake_array.push( playerBox );

//Set test item for Score
var text = new PIXI.Text( '', {fontFamily: 'Arial', fontSize: 35 * myDisplayResolution, fill: 0xffffff, align: 'left'} );
stage.addChild( text );

//Set test item for Score
var highScore = new PIXI.Text( '', {fontFamily: 'Arial', fontSize: 35 * myDisplayResolution, fill: 0xffffff, align: 'right'} );
stage.addChild( highScore );

//Set test item for Game Over
var gameOverText = new PIXI.Text( gameOverText, {fontFamily: 'Arial', fontSize: 35 * myDisplayResolution, fill: 0xffffff, align: 'center'} );
gameOverText.visible = false;
stage.addChild( gameOverText );

//Update Stage on time interval
function update() {
    renderer.render( stage );

    checkPosition();
}

//Call when Game Over
function showGameOver() {
    isGameOver = true;
    clearInterval( updateInterval );
    gameOverText.position.x = ( window.innerWidth - gameOverText.width ) / 2;
    gameOverText.position.y = ( window.innerHeight - gameOverText.height ) / 2;
    gameOverText.visible = true;
    renderer.render( stage );
    direction = "right";
}

//Set random position of food item
function goalBoxSpawn() {
    var randomX = Math.floor( Math.random() * ( window.innerWidth - 2 * boxWidth ) / boxWidth );
    var randomY = Math.floor( Math.random() * ( window.innerHeight - 2 * boxHeight ) / boxHeight );

    goalBox.position.x = boxWidth * randomX;
    goalBox.position.y = boxHeight * randomY;
}

function checkPosition() {
    if ( snake_array[ 0 ].position.x <= 0 || snake_array[ 0 ].position.x >= window.innerWidth - 1.25 * boxWidth ) {
        showGameOver();
    }

    if ( snake_array[ 0 ].position.y <= 0 || snake_array[ 0 ].position.y >= window.innerHeight - 1.25 * boxHeight ) {
        showGameOver();
    }

    //Update motion of the snake's body
    for ( var i = snake_array.length - 1; i >= 1; i-- ) {
        snake_array[i].position.x = snake_array[i - 1].position.x;
        snake_array[i].position.y = snake_array[i - 1].position.y;
    }

    if ( direction === "right" ) {
        snake_array[ 0 ].position.x += boxWidth;
    } else if ( direction === "left" ) {
        snake_array[ 0 ].position.x -= boxWidth;
    } else if ( direction === "up" ) {
        snake_array[ 0 ].position.y -= boxHeight;
    } else if ( direction === "down" ) {
        snake_array[ 0 ].position.y += boxHeight;
    }

    //Check for collisions between the snake and its own body
    for (var i = snake_array.length - 1; i >= 1; i--)
    {
        if ((snake_array[0].x == snake_array[i].x) &&
            (snake_array[0].y == snake_array[i].y))
        {
            showGameOver();
            break;
        }
    }

    // If the player and target are at the same position, spawn the target in another position
    if ( goalBox.position.x === snake_array[ 0 ].position.x && goalBox.position.y === snake_array[ 0 ].position.y ) {
        score++;
        saveHighscore();
        text.setText( 'Score: ' + score.toString() );

        //Add item to body
        var newPart = new PIXI.Graphics();
        newPart.lineStyle( 1, 0xBB22FF, 1 );
        newPart.beginFill( 0xFFFFFF );
        newPart.drawRect( 0, 0, boxWidth, boxHeight );
        newPart.endFill();

        newPart.x = snake_array[ snake_array.length - 1 ].x;
        newPart.y = snake_array[ snake_array.length - 1 ].y;
        snake_array.push( newPart );
        stage.addChild( newPart );

        goalBoxSpawn();
    }
}

//Fire on touchstart event
function onTouchStart( event ) {
    event.preventDefault();

    prevX = snake_array[ 0 ].position.x;
    prevY = snake_array[ 0 ].position.y;
}

//Fire on touchend event
function onTouchEnd( event ) {
    event.preventDefault();

    if ( isGameOver ) {
        gameOverText.visible = false;
        renderer.render( stage );
        init();
        return;
    }

    currentX = snake_array[ 0 ].position.x;
    currentY = snake_array[ 0 ].position.y;

    var touches = event.changedTouches;
    if ( Math.abs( currentY - prevY ) > 0 ) {
        if ( touches[0].pageX > snake_array[ 0 ].position.x && Math.abs( snake_array[ 0 ].position.x - touches[0].pageX ) > 100 ) {
            direction = "right";
        } else if ( touches[0].pageX < snake_array[ 0 ].position.x && Math.abs( snake_array[ 0 ].position.x - touches[0].pageX ) > 100 ) {
            direction = "left";
        }
    }

    if ( Math.abs( currentX - prevX ) > 0 ) {
        if ( touches[0].pageY > snake_array[ 0 ].position.y && Math.abs( snake_array[ 0 ].position.y - touches[0].pageY ) > 100 ) {
            direction = "down";
        } else if ( touches[0].pageY < snake_array[ 0 ].position.y && Math.abs( snake_array[ 0 ].position.y - touches[0].pageY ) > 100 ) {
            direction = "up";
        }
    }
}

function onKeyDown( key ) {
    if ( isGameOver && key.keyCode === 32 ) {
        gameOverText.visible = false;
        renderer.render( stage );
        init();
        return;
    }

    if ( key.keyCode === 87 || key.keyCode === 38 ) {
        direction = "up";
    }

    if ( key.keyCode === 83 || key.keyCode === 40 ) {
        direction = "down";
    }

    if ( key.keyCode === 65 || key.keyCode === 37 ) {
        direction = "left";
    }

    if ( key.keyCode === 68 || key.keyCode === 39 ) {
        direction = "right";
    }
}

//Start from the beginning
function init() {
    score = 0;
    highscore = initializeScore();
    if ( snake_array.length > 0 ) {
        for ( var i = 0; i < snake_array.length; i++ ) {
            stage.removeChild( snake_array[ i ] );
        }
    }
    snake_array = [];
    isGameOver = false;
    text.setText( 'Score: ' + score.toString() );
    highScore.setText( 'High Score: ' + highscore.toString() );
    highScore.position.x = window.innerWidth - highScore.width;
    playerBox.position.x = boxWidth;
    playerBox.position.y = boxHeight;
    if ( isMobile ) {
        currentX = boxWidth;
        currentY = boxHeight;
        prevX = 0;
        prevY = 0;
    }
    renderer.render( stage );
    snake_array.push( playerBox );
    stage.addChild( playerBox );
    goalBoxSpawn();
    updateInterval = setInterval( update, 150 );
}

function initializeScore() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.highscore !== undefined) {
            return localStorage.highscore;
        }
    }
    return 0;
}

function saveHighscore() {
    if (score > highscore) {
        highscore = score;
        highScore.setText( 'High Score: ' + highscore.toString() );

        if(typeof(Storage) !== "undefined") {
            localStorage.highscore = score;
        }
    }
}
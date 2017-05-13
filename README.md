## Lotfar_Snake Game
Create a simple snake game. The snake game build with browser based and responsive for different mobile screens (phone+tablet). Implement with html, css and Javascript using pixi.js
## Help Line:
http://www.pixijs.com/
https://en.wikipedia.org/wiki/Snake_(video_game)
## Requirements:
  Proficient understanding of web markup, including HTML5 and CSS3
  Experience in JavaScript frameworks and HTML5 game engines (e.g. pixi.js, Phaser, react.js, ES6) 
## Features: 
##### Snake game based on browser, mobile and tablet device.
##### This is algorithm for mobile devices without using control buttons.
##### Touch algorithm on the mobile devices.
##### Define canvas on html page.
##### Create food and snake on the page.
##### Snake can be controlled by arrows.
##### Snake food will be placed randomly on screen.
##### Snake extends itself after eating the food.
##### Every food intake gives 1 point.
##### If the snake hits a boundary, Game is over. 
##### Game is over when snake gets in contact with itself.
##### Dimensions of food should be equal to dimension of one segment of the snake.
##### Dimension of food should be 16px X 16px.
##### The game area should be of size 800px X 800px.
##### "Play Again" button should appear once the game is over.
##### In the subsequent gameplays, Display the score and highest score.

## Implement process:
1. Download pixi.min.js
2. Create project.
3. Add index.html file and include Js file with engine and game logic (main.js)
4. Implement game logic
Project Implementation –  Step by step - “Every single line of comments.”
I want implement the game with good performance. PIXI.js could help me to do it, because it works with WebGL by default. other things - responsive design. with JS i could catch the pixel ratio size and could use it to scale the elements of the game based on these features that i implement snake game.
innerWidth - 1.25 and -2  
window.innerWidth - 2 * boxWidth - this part of code.  I put food item not near border, so user could have more chance to not end the game when snake touch game play border.
 window.innerWidth - 1.25 * boxWidth - some correction for checking when snake touch right part of the game play border.
1)	How to define canvas on html page?
Create the renderer. This helper function will automatically detect which renderer you should be using. WebGL is the preferred renderer as it is a lot faster. If webGL is not supported by
the browser then this function will return a canvas rendere.

2) How to create food and snake on the page?
Create an object for snake head name is playerBox. The Graphics class contains methods used to draw primitive shapes such as lines, circles and rectangles to the display, and to color and fill them.  For food object name is goalbox using PIXI.Graphics.
3) How to implement touch algorithm on mobile device?
I Detect if device is mobile or browser. If is not mobile, then it goes to onKeyDown method. The event type should be "keydown", notice that you don't need the on prefix.
4) Explain about object, method and value 
PIXI.autoDetectRendere : This helper function will automatically detect which renderer you should be using. WebGL is the preferred renderer as it is a lot faster. If webGL is not supported by the browser, then this function will return a canvas rendered.
appendChild : The appendChild() method appends a node as the last child of a node.
PIXI.Container(): A Container represents a collection of display objects. It is the base class of all display objects that act as a container for other objects.

## Version
	Lotfar Snake Game: 4.0.1
## Current Version
	My Bank Accounts Model: 4.0.1 ###Release date Version 4.0.1 -- 12th May, 2017
## License
	MIT
## Author
	Lotfar kaes

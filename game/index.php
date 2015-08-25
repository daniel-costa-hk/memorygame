<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<html>
<head>



<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link href="css/memorygame.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/classes.js"></script>
<script type="text/javascript" src="js/memorygame.js"></script>


<title>Memory Game</title>


</head>



<body onkeydown="DisplayKey(event);">




<!-- JUSTIFY ID ADDED WAY TOO EXTENSIVELY DUE TO SIZZLE WAY OF CSS LOOKUP -->


<div id="main-container" >
	
	<div id="game-container">
	
		<div id="rules">
			<span id="close-rules">X</span>
			<p class="rules-title">Welcome to the MemoryGame</p>
			<p class="how">How to Play</p>
			
			
			<div class="help-container">
				<p> Use the Arrow Keys to navigate</p><span id="keyboard-image" class="rules-image"></span>
			</div>
			
			<div class="help-container">
				<span id="enter-image" class="rules-image"></span><p> Press Enter to flip a card </p>
			</div>
			
			<div class="help-container">
				<span id="flip-image" class="rules-image"></span><p> Win points when you flip two cards of the same color</p>
			</div>
			
			<div class="help-container">
				<span id="time-image" class="rules-image"></span>
				<p> Fight against time and flip all cards </p>
			</div>

		</div>
		
		
		<div id="lostgame-wrapper">
			<span id="close-lost">X</span>
			<p id="mainlost" class="lost-text">You lost!</p>
			<span class="lost-image"></span>
			<p class="lost-text">You can do better right..? Try again!</p>
			
		</div>
		
		<div id="user-input">
			<span id="close-input">X</span>
			<p class="user-info big">You did it! Congratulations! </p>
			<p class="user-info">
				Put your name in the immortal Hall of Fame!			
			</p>
			
			<p id="finalscore" class="user-info">Final Score: <span id="finalscore-value">0</span> points</p>
			<span class="medal"></span>
			<div id="user-input-wrapper">
			<div id="nameinput" ><input id="name_field" disabled="true" onfocusin="inputFocusIn(event)" onfocusout="inputFocusOut(event)" type="text"  class="userinput-field" /></div>
			<div id="emailinput" ><input id="mail_field" disabled="true" onfocusin="inputFocusIn(event)" onfocusout="inputFocusOut(event)" type="text"  class="userinput-field" /></div>
			</div>
			
			<div class="save-wrapper"><span title="Save Result" id="save-icon" class="rules-image"></span></div>
			
			<div id="userwarning"><p>Please provide quality input.</p></div>
		</div>
		
		
	
		<div class="container-wrapper">
			
			<div id="help-icon">?</div>
		
		
			<div id="container-left" class="container">
				<div id="card-wrapper" ></div>
			</div>
			
			
			
			<div id="container-right" class="container">
				<span id="logo"></span>
				<div id="gameinfo"></div>
				<div id="highscores">
					<span class="title">Top Scores</span>
					<div id="scorewrapper-users">
					
					
					</div>
					
					<span id="more-icon"></span>
					
					<div id="allscorewrapper"></div>
				</div>
				<div id="timer-wrapper">
					<span id="timer">0:00 second(s)</span>
				</div>
				
				
				<div id="restart" class="button">Start Game</div>
			</div>
		
		
		
		</div>
	
	</div>
</div>







</body>
</html>
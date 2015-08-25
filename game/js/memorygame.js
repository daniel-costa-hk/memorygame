/*
 * 
 * 		File name: 		memorygame.js
 * 		Description:	Handles the main events
 * 
 * 
 * 
 */

// inital variables
var numberRows = 4;
var images_url = "images";
var current_url = window.location.href;
var timeLimit = 49000;

var images_info = {
		'card1':'colour1.gif',
		'card2':'colour2.gif',
		'card3':'colour3.gif',
		'card4':'colour4.gif',
		'card5':'colour5.gif',
		'card6':'colour6.gif',
		'card7':'colour7.gif',
		'card8':'colour8.gif',
};


var ajaxCall = {
		
	highscores:current_url+'serverside/ajax/highscores.php',
	saveUser:current_url+'serverside/ajax/saveuser.php',
	allscores: current_url+'serverside/ajax/allscores.php',
		
};

//keyboard events
var keys_arrow = {left: 37, up: 38, right: 39, down: 40, enter:13 };


// control
var repeat_game = false;

// id
var gameinfo_id = "gameinfo";
var restartbutton_id = "restart";
var cardwrapper_id = "card-wrapper";

/* var closerules_id = "close-rules";
var rules_id = "rules"; */

var timer_id = "timer";
var input_id = "user-input";
var saveuserbutton_id = "save-icon";
var userwarning_id = "userwarning";
var inputname_id = "name_field";
var inputmail_id = "mail_field";


// debug controll
var debug_status = true;

// dom cached elements for quicker access
var rules_wrapper;
var closerules_button;
var saveuser_button;
var restart_button; 
var card_wrapper;
var name_input;
var email_input;
var helpicon;

var saveuser_buttonclick=true;


var cards_array = []; // stores the cards
var game_active_base=false;


// objects to be instantiated on window.load event
var randomMan; //to retrieve random array numbers
var renderMan; // view based class to refresh the dom element
var controller; // controls the flow of the game
var cardCollection; // stores all the cards

/*-------------------------------------------------
 * 
 * 	Animation Related functions
 * 
 * 
 -------------------------------------------------*/
function inputFocusIn(event){ event.srcElement.value =""; }
function inputFocusOut(event){ }

/*	Name: 			allScoresAjax
 * 	Description: 	Inserts the Allscores field on the view
 */
function allScoresAjax(){
		new Ajax.Request(ajaxCall.allscores, {
			method:'get',
			onSuccess: function(transport){
				var allScores = transport.responseText.evalJSON();
				gameview.updateAllScores(allScores);				
			}
		  	//onSuccess:callback
		});

}  // allScoresAjax


/*	Name: 			highScoresAjax
 * 	Description: 	Updates the highscores on the interface
 */
function highScoresAjax(){

		new Ajax.Request(ajaxCall.highscores, {
			method:'get',
			onSuccess: function(transport){
				var scores = transport.responseText.evalJSON();
				gameview.updateScores(scores);
			}
		  	//onSuccess:callback
		});

}  // highScores Ajax

/*
 * 	Name: VerifyEmail
 * 	Description: Return true if a string is in a valid email format
 * 
 */
function VerifyEmail(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}


/*
 * 	Name: saveUser
 * 	Description:
 * 
 */
function saveUser(username, email,score){
	
	if(username!=="" && username != "Your email" && VerifyEmail(email)){
		
		new Ajax.Request(ajaxCall.saveUser, {
		method:'get',
		parameters: {user: username, mail: email, score:score},
		onSuccess: function(transport){
		  	var result = transport.responseText.evalJSON();
		  	var result_text= result==true?'Information Saved. Your name is in the Immortal Hall of Fame!':'There was a problem saving the score sorry';
		  	gameview.displayWarningLabel(result_text);
		  	}
		});
		return true;
	}  // 

	else return false;
	
};


/*
 * 	Name: 		 bind_start_click_event
 * 	Description: binds the click event 
 * 
 */
function bind_start_click_event() {
	
	restart_button = document.getElementById('restart');	
	
	restart_button.onclick = function() { 
		
		if(repeat_game){ 
			clearInterval(gameview.clockTimer);
			init_game();
			
		} 
		repeat_game =true;
		this.innerHTML= "Restart Game";
		game_active_base = true;
		gameview.timerActive = true;
		gameview.initTimer(timeLimit);
		gameview.updateGameInfo('Go! Go! Go!');
		
		return false;

	};
	
} //restart click event ends here


/*
 * 	Name: 		 bind_saveuser_click_event
 * 	Description: binds the click event 
 * 
 */
function bind_saveuser_click_event() {
	
	saveuser_button = document.getElementById(saveuserbutton_id);
	
	saveuser_button.onclick = function() { 

		if(saveuser_buttonclick && gamecontroller.isGameOver()) {
			
			if(saveUser(gameview.getNameInput().value, gameview.getEmailInput().value,gameview.timeScore)){
				saveuser_buttonclick = false;
				gameview.disableInput(gameview.getNameInput());
				gameview.disableInput(gameview.getEmailInput());
				gameview.getWarningLabel().innerHTML ="";
			}
			else { gameview.fade(gameview.getWarningLabel(),'fast','fadein'); }

			return false;
		
		}  //save user button clickends here
	};
} //restart click event ends here

/*
 * 	Name: debug
 * 	Description:
 */
function debug(string){ if(window.console && debug_status ==true) console.log(string); }

/*
 * 	Name: press_action
 * 	Description:  
 * 
 */
function press_action(){
	
	if(!gamecontroller.maxClicks()){
			
		var card= cardCollection.getCardById(gameview.getSelectedCardId());

		if(!card.isActive()) { 
			gameview.updateGameInfo('You already found this Card. Select another one!'); 
		}
		
		else {
		 gameview.updateClickStatus(card.id);

		 	if(gamecontroller.isClicked(card))  {
		 		gameview.updateGameInfo('Card has already been selected. Select another one!');
		 	}
			
			else {
			
				gamecontroller.addClickedCard(card);

				if(gamecontroller.clickCountEnd()){  //clicked two cards can compare
					
					if(gamecontroller.compareCards()){ //theyre the same card?
						
						//update controller
						gamecontroller.addHit();

						if(gamecontroller.isVictory()){
							gamecontroller.setGameOver(true);
							gameview.endGame('won');
						}
						
						else {	
							//update interface
							gameview.updateCardContainer('win',gamecontroller.getClickedCards()); // open cards to user
							gameview.updateGameInfo('You got the color right! Great!');	
							cardCollection.deactivateCards(gamecontroller.getClickedCards());
							gamecontroller.resetCards(); //reset game controller
						}
						
					} //compare Cards ends here
					
					else{
						gameview.updateCardContainer('lost',gamecontroller.getClickedCards()); // open cards to user
						gameview.cleanGameInfo();
						gameview.updateGameInfo('Nop bad guess!');	
						gamecontroller.resetCards();
					} 
					
				} //if ends here
				
				else {
					gameview.updateGameInfo('Select one more...');
				}
			} //else ends here
			
		} // if the card is active or not really
		 		 	
	} //max clicks
	
}  //bind_square_click_event



/*
 * 	Name: 		 Setups Cards
 * 	Description: Creates Card Instances and stores them
 *  in a Card Collection
 * 
 */
function setup_data(){
	
	 var image_temp;
	 var unique_index=1;
	 
	 for(var imageInstance in images_info){
		
		 // build basic info data
		 
		 for(var i=0;i<2;i++) {
			 var image_id = imageInstance;
			 image_temp = new Image(); 
			 image_temp.src = images_url+"/"+images_info[imageInstance];
			 
			 var temp_card = new Card(unique_index,image_id);
			 temp_card.setImage(image_temp);
			 temp_card.setHtml();
			 
			 cardCollection.addCard(temp_card);
		
			 unique_index++;
		 } 
	 } //for ends here	
}
	



/*
 * 	Name: setup_objects_data
 * 	Description:
 */
function setup_objects_data(){
	
	 // fill objects
	 cardCollection.setShuffleCollection(randomMan.shuffle(cardCollection.getCollection())); 
	 gameview.fillCardContainer(cardCollection.getShuffleCollection());
	 // Set cards
	 gameview.setCards(cardCollection.getCollectionIds());  //stores cached id's for quicker dom manipulation
	 gameview.setSelectedCard(0); //sets card index 1 as the first selected 
	 
	 gamecontroller.setNumberCards(cardCollection.getSize());
	 gameview.updateGameInfo('Press "Start Game" to begin the game');
 
}
	

/*
 * 	Name: 			reset_game
 * 	Description:	Resets whatever variables or objects it needs to restart a game again
 * 
 */
function reset_game(){
	init_game();
}

/*
 * 	Name: setup_objects
 */
function setup_objects(){

	// operation related object
	randomMan= new RandomMan();
	
	// loosely approach on the mvc pattern
	gamecontroller 	= new GameController();  		// controller   
	cardCollection 	= new CardCollection(); 		// stores data
	gameview 		= new GameView(numberRows,cardwrapper_id,gameinfo_id,restartbutton_id,timer_id,input_id,inputname_id,inputmail_id, userwarning_id);	// view
		
}

/*
 * 
 * 
 */
function init_game(){

	// cache variables from the dom element
	card_wrapper = document.getElementById('card-wrapper');
	
	//operation related
	setup_objects();
	setup_data();
	setup_objects_data();
}


function bind_button_events(){
	
	// bind click actions
	bind_start_click_event();
	bind_saveuser_click_event();
}


/*
 * 	Name: Display Key
 * 	Description: Listens to the keyboard events 
 * 	and calls the appropriate function or object
 */
function DisplayKey(event){
	
	if(game_active_base==true){
		for(var key in keys_arrow) {
			if(keys_arrow[key]===event.which) {
				if(key === 'enter') {
					press_action();
				}
				else {
					gameview.moveCard(key);
				}
			}
		}	
	}
}  //DisplayKey ends here


/* 
 *  Operations done after the full document is loaded
 */
window.onload=function(){
	init_game();
	bind_button_events();
	
	//rules
	if(!gamecontroller.isOldUser())  gameview.displayRules();	
	//fetch_high_scores();
	highScoresAjax();
	//fetch top 10 scores
	allScoresAjax();
	
};

/*
 * 
 * 		File name: 		classes.js
 * 		Description:	Class structure for the game 
 * 
 * 		Classes:		
 * 
 * 		GameView
 * 		GameController
 * 		Card
 * 		CardCollection
 * 		RandomMan
 */


/*
 * 	Class: 			GameView
 * 	Description:	Takes care of DOM related operations	
 * 
 */
var GameView= Class.create({
  
	gameinfo:null,
	
	button:null,
	
	card_wrapper:null,
	
	cards:[],
	
	cards_dom:[],
	
	cardCover:null,
	
	gameactive:true,
	
	currentSelectedIndex:null,
	
	limit_min:0,
	
	limit_max: 0,
	
	scores:[],
	
	allscores:[],
	
	timerString:null,
		
	userinput:null,
	
	inputname:null,
	
	inputemail:null,
	
	userwarning:null,
	
	timeScore:null,
	
	timerActive:true,
	
	allscore_wrapper:null,
	
	finalscore_element:null,
	
	
	closeinput:null,
	
	closerules_button:null,
	
	closelost_button:null,
	
	
	rules_wrapper:null,
	
	helpicon:null,
	
	lostgame_wrapper:null,
	
	clockTimer:null,

	
	
	initialize: function(numberRows,cardwrapper_id, gameinfo_id, restartbutton_id, timer_id, input_id,inputname_id, inputemail_id,  warning_id) {
			
		this.numberRows = numberRows;
		this.card_wrapper = document.getElementById(cardwrapper_id);
		this.gameinfo = document.getElementById(gameinfo_id);
		this.button = document.getElementById(restartbutton_id);
		this.limit_max = numberRows*4;	
		this.timerString = document.getElementById(timer_id);
		this.userinput = document.getElementById(input_id);
		this.userwarning = document.getElementById(warning_id);
		
		this.inputname = document.getElementById(inputname_id);
		this.inputemail = document.getElementById(inputemail_id);
		
		
		// not in parameteres
		this.allscore_wrapper= document.getElementById('allscorewrapper');
		this.finalscore_element = document.getElementById('finalscore-value');
		this.closeinput = document.getElementById('close-input');
		
		this.closerules_button = document.getElementById("close-rules");
		this.closelost_button = document.getElementById("close-lost");
		
		this.rules_wrapper = document.getElementById("rules");
		this.helpicon = document.getElementById('help-icon');
		
		this.lostgame_wrapper = document.getElementById('lostgame-wrapper');
		
		
		// binding events to dom elements
		this.closerules_button.onclick = function() { window.gameview.closeRules(); return false; };		
		this.helpicon.onclick = function() {  window.gameview.displayRules(); return false; };	
		this.closeinput.onclick = function() { window.gameview.closeUserInput(); return false; };
		this.closelost_button.onclick = function() { window.gameview.closeLostGame(); return false; };
		
		
		
	},
	
	displayLostGame:function(){ this.fade(this.lostgame_wrapper,'fast','fadein'); },
	
	closeLostGame:function(){ this.fade(this.lostgame_wrapper,'fast','fadeout'); },
	
	displayWarningLabel:function(option){
		this.getWarningLabel().innerHTML = option;
		this.fade(this.getWarningLabel(),'fast','fadein');
		
	},
	
	closeRules:function(){ this.fade(this.rules_wrapper,'fast','fadeout'); },
	
	displayRules:function(){ this.fade(this.rules_wrapper,'fast','fadein'); },
	
	currentScore:function(){ return this.timeScore; },
	
	getNameInput:function(){ return this.inputname; },
	
	getEmailInput:function(){ return this.inputemail; },
	
	disableInput:function(input){
		input.disabled=true;
		input.style.backgroundColor = "lightgrey";
	},
	
	activateInput:function(input, label){
		input.value=label;
		input.disabled=false;
		input.style.backgroundColor = "white";
	},
	
	getWarningLabel:function(){ return this.userwarning; },
	
	
	displayUserInput: function (){	
		this.finalscore_element.innerHTML = this.timeScore;
		this.activateInput(this.inputname,'Your name');
		this.activateInput(this.inputemail,'Your email');
		this.fade(this.userinput,'fast','fadein');
	},
	
	closeUserInput:function(){
		this.disableInput(this.inputname);
		this.disableInput(this.inputemail);
		this.fade(this.userinput,'fast','fadeout');
	},
	
	

	fade: function(element,speed_p,option) {
	 
	    var op = option==='fadeout'?1:0.1;
	    
	    
	    var speed_value = speed_p=='fast'?0.6:0.4;
	    
	    if(option=='fadein'){
	    	element.style.display = 'block';
	    }

	    var timer = setInterval(function () {
	        
	    	if(option === 'fadeout' && op<= 0.1){
	    		clearInterval(timer);
	            element.style.display = 'none';
	    	}
	    	
	    	if(option ==='fadein' && op >= 1){
	    		clearInterval(timer);
	    		 element.style.display = 'block';
	    	}
	    	
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        
	        if(option==='fadeout') op -= op * speed_value;
	        else op += op * speed_value;

	        
	    }, 50);


	} ,
	
	

	endGame:function(result){
		
		this.timerActive=false;
		window.game_active_base =false; //deactivate keyboard
	

		
		if(result=='won'){
			this.timeScore*=100;
			this.displayUserInput();

		}
		
		else if(result=='lost'){ this.displayLostGame(); }

	},

	timer: function(time,update,complete) {
		
	    var start = new Date().getTime();
	    
	    
	   // var interval = setInterval(function() {
	   this.clockTimer = setInterval(function() {
	        var now = time-(new Date().getTime()-start);
	        if( now <= 0) {
	            //clearInterval(interval);
	        	clearInterval(window.gameview.clockTimer);
	            complete();
	        }
	        else update(Math.floor(now/1000));
	    },100); // the smaller this number, the more accurate the timer will be
	
	    
	},
	
	
	initTimer: function (time_p){

			var timerString = window.gameview.timerString; //due to function scope
		
			
			
			this.timer(
			    time_p, // milliseconds
			    function(timeleft) { // called every step to update the visible countdown
			    	
			    	if(window.gameview.timerActive){
			    		window.gameview.timeScore = timeleft;
			    	
			    		if(time_p>10000) timerString.innerHTML = "0:"+timeleft+" second(s)";
			    		else timerString.innerHTML = "0:0"+timeleft+" second(s)";
			    	
			    	}
			    	
			    	
			    },
			    function() { // what to do after
			    	if(window.gameview.timerActive) window.gameview.endGame('lost');
			       
			    }
			    
			
			);
		
		
		
	},
	
	
	moveCard:function(action){
		
		var sum = 0;
		
		switch(action){
			case 'right': sum++; 	break;
			case 'left': sum--; 	break;
			case 'up': sum-=4;  	break;
			case 'down': sum+=4; 	break;	//maybe a different value
		}
		
		var new_index = this.currentSelectedIndex + sum;
		if(new_index >= this.limit_min && new_index < this.limit_max) this.setSelectedCard(new_index);
		

	},
	
	removeSelectedCard:function(index){	 this.cards_dom[index].removeChild(document.getElementById("selected-card")); },
	
	
	setSelectedCard:function(index){
		
		if(this.currentSelectedIndex!=null) this.removeSelectedCard(this.currentSelectedIndex);

		var card = this.cards_dom[index];
		var selected = document.createElement('span');
		selected.id='selected-card';
		card.appendChild(selected);
		
		this.currentSelectedIndex = index;
		
	},
	
	getSelectedCardId:function(){ return this.cards[this.currentSelectedIndex]; },
	
	updateKeyEvent:function(action){
		
		switch(action){
			case 'up': break;
			case 'down': break;
			case 'left': break;
			case 'right': break;
		}
	},


	cleanCards:function(){ this.card_wrapper.innerHTML="";  },
	
	gameActive:function(){ return this.gameactive; },

	setGameActive:function(option){	this.gameactive = option; },

	updateClickStatus:function(card_id){	
		document.getElementById(card_id).childNodes[0].className = 'hide hide-clicked'; //note the space	
		document.getElementById(card_id).childNodes[2].style.zIndex = -2;
	},
	
	

	getGameInfo:function(){ return this.gameinfo; },

	cleanGameInfo:function(){ this.gameinfo.innerHTML= ''; },
	
	updateGameInfo:function(text){ this.gameinfo.innerHTML = '<p>'+text+'</p>'; },
	

	setCards:function(card_ids){
		this.cards=card_ids;
		this.cards_dom = [];
		for(var i=0;i<card_ids.length;i++){
			this.cards_dom.push(document.getElementById(card_ids[i]));
		}

	},
	
	
	getCards:function(){  },
	

	
	fillCardContainer:function(shuffleDeck){
	
		//clean card container first
		this.card_wrapper.innerHTML ="";
		
		
		var numberRows = this.numberRows;
		var card_wrapper = this.card_wrapper;
		var wrapper_height= card_wrapper.offsetHeight;
		var row_height = parseInt(wrapper_height/numberRows)+'px';
		
		var k_start=0;
		var row_container;
		
		for(var i=0; i<numberRows; i++){
			var row_division = document.createElement('div');
			row_division.className = "row-division";
			row_division.id = 'row-'+i;
			row_division.style.height = row_height;
			card_wrapper.appendChild(row_division);
			
			
			k_finish= k_start+numberRows;
			row_container=document.getElementById('row-'+i);
			
			for(var k=k_start;k<k_finish;k++){
				row_container.appendChild(shuffleDeck[k].getHtml());
				
			}
			k_start+=4;
			
		} //for ends here
	},
		
		
	hideCardBackTimed: function(card){ card.childNodes[0].className="hide background-hide"; },
	

	updateCardContainer:function(result,cards){

		for(var i=0;i<cards.length;i++){
			
			var card = document.getElementById(cards[i].id);
			if(result==='win') card.appendChild(this.generateCover());
			
			else if(result==='lost') {
				var t=setTimeout(this.hideCardBackTimed,1000,card);				
			}
			
		} //for ends here
			
	},
	
	
	generateCover:function(){
		
		var cardCover = document.createElement('span');
		cardCover.className= 'card-cover';
		return cardCover;

	},

	updateScores:function(scores_p){
		this.scores = scores_p;
		var score_length = this.scores.length;
		var user_wrapper = document.getElementById('scorewrapper-users');
		
		for(var i=0;i<score_length;i++){	
			var score_strip = document.createElement('span');
			score_strip.className= 'highscore-user';
			score_strip.innerHTML = i+1+". "+this.scores[i].name+" : "+this.scores[i].score+ " pts";
			user_wrapper.appendChild(score_strip);
		} //for ends here
		
		
		var more_strip = document.createElement('span');
		more_strip.className= 'more-users';
		more_strip.innerHTML= "more..>";
		user_wrapper.appendChild(more_strip);
		
		//helpicon = document.getElementById('help-icon');	
		
		var allscore_local = this.allscore_wrapper;
		more_strip.onmouseover = function() { allscore_local.style.display = 'block'; return false; };	
		more_strip.onmouseout = function() { allscore_local.style.display = 'none'; return false; };	
		
	} // update Scores
	
	,
	
	updateAllScores:function(allscores_p){
		
		
		this.allscores = allscores_p;
		var allscore_length = this.allscores.length;

		for(var i=0;i<allscore_length;i++){	
			var score_strip = document.createElement('span');
			score_strip.className= 'allscore-user';
			score_strip.innerHTML = i+1+". "+this.allscores[i].name+" : "+this.allscores[i].score+ " pts";
			this.allscore_wrapper.appendChild(score_strip);
		} //for ends here

		
	} // update Scores
	
	

	
});





/*
 * 	Class: 			Game Controller
 * 	Description:	Controls the events of the game
 * 
 */
var GameController = Class.create({
  
	
	card_click_control:0,
	
	numbercards:0,
	
	count_hits:0,
	
	cards_clicked:[],
	
	gameOver:false,
	
	oldUser:false,
	

	initialize: function() {
		this.card_click_control =0;
		this.numbercards =0;
		this.count_hits =0;
		this.cards_clicked =[];
		this.gameOver = false;
		
		
		if(this.getCookie("memorygame")==null){ this.setCookie("memorygame",1,360); }
		else { this.oldUser = true; }
		

	},
	
	
	isOldUser:function(){
		return this.oldUser;
	},
	
	resetCardClick:function(){ this.card_click_control=0; },
	

	setNumberCards: function(value){ this.numbercards=value/2;	},
	
	getNumberCards:function(){ return this.numbercards; },
	
	getHits:function(){ return this.count_hits; },
	
	addHit:function(){ this.count_hits++; },
	
	isVictory:function(){ return this.numbercards===this.count_hits?true:false; },
	
	setGameOver:function(option){ this.gameOver = option; },
	
	isGameOver:function(){ return this.gameOver; },
	
	isClicked: function(card){
		
		var cards = this.cards_clicked;
		var card_size = cards.length; //less overhead
		
		for(var i=0;i<card_size;i++){
			
			if(card.getId()==cards[i].id) return true;
			
			else return false; 
			
		} //for ends here
		
		
	},
	
	
	addClickedCard:function(card){
		this.cards_clicked.push(card);
		this.card_click_control++;
	},
	
	clickCountEnd:function(){ return this.card_click_control>=2?true:false; },
	
	
	compareCards:function(){ return this.cards_clicked[0].relation == this.cards_clicked[1].relation?true:false; },
	

	getClickedCards:function(){ return this.cards_clicked; },
	
	
	maxClicks:function(){ return this.cards_clicked.length==2?true:false; },
	
	
	resetCards:function(){ this.cards_clicked=[]; },
	
	
	setCookie:function(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	},
	
	getCookie:function(c_name) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1)
		  {
		  c_start = c_value.indexOf(c_name + "=");
		  }
		if (c_start == -1)
		  {
		  c_value = null;
		  }
		else
		  {
		  c_start = c_value.indexOf("=", c_start) + 1;
		  var c_end = c_value.indexOf(";", c_start);
		  if (c_end == -1)
		  {
		c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
		}
		return c_value;
	}
	
 
});

  


/*
 * 	Class: 			CardCollection
 * 	Description:	Stores collection of cards and acts over them
 */
var CardCollection = Class.create({
	

	card_collection: [],
	
	card_collection_shuffled:[],
	
	card_collection_ids:[],
	
	
	initialize:function() {
		this.card_collection=[];
		this.card_collection_shuffled = [];
		this.card_collection_ids = [];
	},
	

	getSize:function(){return this.card_collection.length; },
	
	
	setShuffleCollection:function(shuffle_collection){
		this.card_collection_suffled = shuffle_collection;
		for(var i=0;i<shuffle_collection.length;i++){
			this.card_collection_ids.push(shuffle_collection[i].id);
			
		}
	},
	
	getShuffleCollection:function(){ return this.card_collection_suffled; },
	
	getCollection:function(){ return this.card_collection; },
	
	getCollectionIds:function(){ return this.card_collection_ids; },
	
	printCollection:function(){
		
		var collection = this.card_collection;
		var size = collection.length;
		
		for(var i=0;i<size;i++){		
			//console.log(collection[i]);
		} 
	},
	
	getCardByIndex:function(index){
		
		
	},
	
	getCardById:function(id){
		var collection = this.card_collection;
		var size = collection.length;

		for(var i=0;i<size;i++){
			if(collection[i].id == id){
				return collection[i];
			}
		} //for ends here
		
		return false;
		
	},
	
	
	addCard:function(card){ this.card_collection.push(card); },
	
	removeCard:function(card){ },
	
	deactivateCards:function(card_array){
		for(var i=0;i<card_array.length;i++){
			card_array[i].setActive(false);
		} //for ends here
	}
	
	
});


/*
 * 	Class: 			Card
 * 	Description:	Creates a Card instance and represents a color card
 *  				and all of it's specific data 
 */
var Card = Class.create({
  
	
	
	initialize: function(unique_index,id) {
		this.id="card-"+unique_index;
		this.relation = 'instance-'+id;
		this.active = true;
		this.clicked= false;
	},
  
	
	getId:function(){ return this.id; },
	
	setClicked: function(option){ this.clicked=option; },
	
	setActive:function(option){ this.active = option; },
	
	isActive:function(){ return this.active; },
	
	isClicked: function(){ return this.clicked; },
	
	setImage: function(img){ this.image = img; },
	
	getImage: function(img){ return this.image; },
	
	setStatus: function(status){ this.active = status; },
	
	getStatus: function(status){ return this.active; },
	
	
	setHtml:function(){
		var markup = document.createElement('div');
		markup.innerHTML = "<span id='"+this.id+"-hide' class='hide background-hide'></span><span class='image'>"+this.image.outerHTML+"</span>";

		markup.id = this.id;
		markup.className = 'card-instance';
		markup.setAttribute('relation',this.relation);
		this.html = markup;
		
	},
	
	getHtml:function(){ return this.html; }
 
});


/*
 * 	Class: 			RandomMan
 * 	Description:	Used to create random operations over specific
 * 					parts of data
 */
var RandomMan = Class.create({

	initialize:function() {
		
	},
	
	
	/*
	 * 	Shuffle 
	 * 
	 */
	shuffle: function(array){
		this.initialArray = array;
		
		for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
		this.shuffleArray = array;
		return array;

	},
	

	getOriginalNumbers: function(){ return this.initialArray; },

	getMixedNumbers: function(){ return this.shuffleArray; },
	
	
	
});

    





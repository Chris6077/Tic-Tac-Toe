$(document).ready(function(){
	$(".p1")[0].innerHTML = "Player 1 Score: 0";
	$(".p2")[0].innerHTML = "Player 2 Score: 0";
	$(".caption")[0].innerHTML = "Choose mode!";
	$(".again").hide();
	$(".menu").hide();
});
onePlayer = function(){
	$(".buttons").remove();
	$(".p2")[0].innerHTML = "Player 2 Score: 0";
	$(".p1")[0].innerHTML = "Player 1 Score: 0";
	$(".again").show();
	$(".menu").show();
	function TicTacToe (element) {
		var current = 1,
	  		players = [ "x", "o" ],
	  		field = document.createElement("table"),
	  		caption = $(".caption")[0],
	  		labels = [["upl", "upm", "upr"], ["mil", "mim", "mir"], ["bol", "bom", "bor"]],
	  		messages = {
	  			"p1s": "Player's Score: ",
	  			"p2s": "Computer's Score: ",
	    		"o's-turn": "Player's turn.",
			    "x's-turn": "Computer's turn.",
			    "o-wins": "Player wins.",
			    "x-wins": "Computer wins.",
			    "draw": "Oh no! It's a draw.",
			    "new game?": "Want to play again?"
			},
	  		finished, games, b, c, i, r, tr, p1s = 0, p2s = 0;
	  	updateScores = function(){
			$(".p1")[0].innerHTML = messages["p1s"] + p1s;
			$(".p2")[0].innerHTML = messages["p2s"] + p2s;
		}
		again = function (event) {
		    var cells = field.getElementsByTagName("td"),
		        button, cell;
		    current = 1;
		    finished = false;
		    field.removeAttribute("class");

		    for (r = 0; r < 3; r++) {
		        for (c = 0; c < 3; c++) {
		          cell = cells[r * 3 + c];
		          cell.removeAttribute("class");
		          cell.innerHTML = "";
		          button = document.createElement("button");
		          button.innerHTML = labels[r][c] + " " + messages["select"];
		          cell.appendChild(button);
		        }
		    }
	    	caption.innerHTML = messages[players[current] + "'s-turn"];
	    	field.parentNode.removeEventListener("click", this);
		}
		menu = function (event){
			$(".container")[0].innerHTML = '<button class="again" onclick="again()">Restart</button> <button class="buttons" onclick="onePlayer()">1 Player</button> <button class="buttons" onclick="twoPlayer()">2 Player</button> <button class="menu" onclick="menu()">Menu</button>';
			$(".again").hide();
			$(".menu").hide();
		}
		function check () {
		  	var tds = field.getElementsByTagName("td"),
		    	full = true,
		    	buttons, i, winner;
		  	tds = field.getElementsByTagName("td");

			for (i = 0; i < tds.length; i++) {
			    if (tds[i].className == "") {
			      full = false;
			    }
			}	

		    for (i = 0; i < 3; i++) {
			    if (tds[0 + i].className != "" && tds[0 + i].className == tds[3 + i].className && tds[3 + i].className == tds[6 + i].className) {
				    winner = tds[0 + i].className;
			    }
			    if (tds[i*3 + 0].className != "" && tds[i*3 + 0].className == tds[i*3 + 1].className && tds[i*3 + 1].className == tds[i*3 + 2].className) {
			    	winner = tds[i*3].className;
			    }
			}

			if (tds[0].className != "" && tds[0].className == tds[4].className && tds[4].className == tds[8].className) {
		    	winner = tds[0].className;
		  	}
		  	if (tds[2].className != "" && tds[2].className == tds[4].className && tds[4].className == tds[6].className) {
		    	winner = tds[2].className;
		  	}
		  	if (full || winner) {
		    	finished = true;
		    	field.className = "game-over";
		    	if (winner) {
		      		caption.innerHTML = messages[players[current] + "-wins"];
		      		if(current == 0) p2s++;
		      		else p1s++;
		      		updateScores();
		    	} else {
		      		caption.innerHTML = messages["draw"];
		    	}
		    	buttons = field.getElementsByTagName("button");
		    	while (buttons.length) {
		      		buttons[0].parentNode.removeChild(buttons[0]);
		    	}
			}
		}
		function mark (event) {
		  	var td = event.target;
		  	while (td.tagName.toLowerCase() != "td" && td != field) {
		    	td = td.parentNode;
		  	}
		  	if (!finished && td.tagName.toLowerCase() == "td" && td.className.length < 1) {
		    	td.className = players[current]; // Klassennamen vergeben
		    	check(); // Spiel zu Ende?
		    	if (!finished) {
		      		current = 1 - current; // zwischen 0 und 1 hin- und herschalten
		      		caption.innerHTML = messages[players[current] + "'s-turn"];
		    	}
		  	}
		  	if(!finished){
			  	setTimeout(function() {
			  		var el = $("td")[Math.floor(Math.random()*$("td").length)];
			  		while(el.className.length >= 1) el = $("td")[Math.floor(Math.random()*$("td").length)];
			  		el.className = players[current];
			  		check();
			  		if(!finished){
			  			current = 1- current;
			  			caption.innerHTML = messages[players[current] + "'s-turn"];
			  		}
			  	}, 1000);
		  	}
		}
		element.appendChild(field);
		field.appendChild(document.createElement("tbody"));
		caption.innerHTML = messages[players[current] + "'s-turn"];
		for (r = 0; r < 3; r++) {
			tr = document.createElement("tr");
		  	field.lastChild.appendChild(tr);
		  	for (c = 0; c < 3; c++) {
		    	tr.appendChild(document.createElement("td"));
		    	b = document.createElement("button");
		    	b.innerHTML = labels[r][c] + " " + messages["select"];
		    	tr.lastChild.appendChild(b);
		  	}
		}
		field.addEventListener("click", mark);
	}
	games = document.querySelectorAll(".container");
	for (i = 0; i < games.length; i++) {
		TicTacToe(games[i]); // aktuelles Fundstück steht in games[i]
	}
};
twoPlayer = function(){
	$(".buttons").remove();
	$(".p2")[0].innerHTML = "Player 2 Score: 0";
	$(".p1")[0].innerHTML = "Player 1 Score: 0";
	$(".again").show();
	$(".menu").show();
	function TicTacToe (element) {
		var current = Math.round(Math.random()),
	  		players = [ "x", "o" ],
	  		field = document.createElement("table"),
	  		caption = $(".caption")[0],
	  		labels = [["upl", "upm", "upr"], ["mil", "mim", "mir"], ["bol", "bom", "bor"]],
	  		messages = {
	  			"p1s": "Player 1 Score: ",
	  			"p2s": "Player 2 Score: ",
	    		"o's-turn": "Player 1's turn.",
			    "x's-turn": "Player 2's turn.",
			    "o-wins": "Player 1 wins.",
			    "x-wins": "Player 2 wins.",
			    "draw": "Oh no! It's a draw.",
			    "instructions": "You are O. Begin by clicking one a field.",
			    "select": "choose",
			    "new game?": "Want to play again?"
			},
	  		finished, games, b, c, i, r, tr, p1s = 0, p2s = 0;
	  	updateScores = function(){
			$(".p1")[0].innerHTML = messages["p1s"] + p1s;
			$(".p2")[0].innerHTML = messages["p2s"] + p2s;
		}
		again = function (event) {
		    var cells = field.getElementsByTagName("td"),
		        button, cell;
		    current = Math.round(Math.random());
		    finished = false;
		    field.removeAttribute("class");

		    for (r = 0; r < 3; r++) {
		        for (c = 0; c < 3; c++) {
		          cell = cells[r * 3 + c];
		          cell.removeAttribute("class");
		          cell.innerHTML = "";
		          button = document.createElement("button");
		          button.innerHTML = labels[r][c] + " " + messages["select"];
		          cell.appendChild(button);
		        }
		    }
	    	caption.innerHTML = messages[players[current] + "'s-turn"];
	    	field.parentNode.removeEventListener("click", this);
		}
		menu = function (event){
			$(".container")[0].innerHTML = '<button class="again" onclick="again()">Restart</button> <button class="buttons" onclick="onePlayer()">1 Player</button> <button class="buttons" onclick="twoPlayer()">2 Player</button> <button class="menu" onclick="menu()">Menu</button>';
			$(".again").hide();
			$(".menu").hide();
		}
		function check () {
		  	var tds = field.getElementsByTagName("td"),
		    	full = true,
		    	buttons, i, winner;
		  	tds = field.getElementsByTagName("td");

			for (i = 0; i < tds.length; i++) {
			    if (tds[i].className == "") {
			      full = false;
			    }
			}	

		    for (i = 0; i < 3; i++) {
			    if (tds[0 + i].className != "" && tds[0 + i].className == tds[3 + i].className && tds[3 + i].className == tds[6 + i].className) {
				    winner = tds[0 + i].className;
			    }
			    if (tds[i*3 + 0].className != "" && tds[i*3 + 0].className == tds[i*3 + 1].className && tds[i*3 + 1].className == tds[i*3 + 2].className) {
			    	winner = tds[i*3].className;
			    }
			}

			if (tds[0].className != "" && tds[0].className == tds[4].className && tds[4].className == tds[8].className) {
		    	winner = tds[0].className;
		  	}
		  	if (tds[2].className != "" && tds[2].className == tds[4].className && tds[4].className == tds[6].className) {
		    	winner = tds[2].className;
		  	}
		  	if (full || winner) {
		    	finished = true;
		    	field.className = "game-over";
		    	if (winner) {
		      		caption.innerHTML = messages[players[current] + "-wins"];
		      		if(current == 0) p2s++;
		      		else p1s++;
		      		updateScores();
		    	} else {
		      		caption.innerHTML = messages["draw"];
		    	}
		    	buttons = field.getElementsByTagName("button");
		    	while (buttons.length) {
		      		buttons[0].parentNode.removeChild(buttons[0]);
		    	}
			}
		}
		function mark (event) {
		  	var td = event.target;
		  	while (td.tagName.toLowerCase() != "td" && td != field) {
		    	td = td.parentNode;
		  	}
		  	if (!finished && td.tagName.toLowerCase() == "td" && td.className.length < 1) {
		    	td.className = players[current]; // Klassennamen vergeben
		    	check(); // Spiel zu Ende?
		    	if (!finished) {
		      		current = 1 - current; // zwischen 0 und 1 hin- und herschalten
		      		caption.innerHTML = messages[players[current] + "'s-turn"];
		    	}
		  	}
		}
		element.appendChild(field);
		field.appendChild(document.createElement("tbody"));
		caption.innerHTML = messages[players[current] + "'s-turn"];
		for (r = 0; r < 3; r++) {
			tr = document.createElement("tr");
		  	field.lastChild.appendChild(tr);
		  	for (c = 0; c < 3; c++) {
		    	tr.appendChild(document.createElement("td"));
		    	b = document.createElement("button");
		    	b.innerHTML = labels[r][c] + " " + messages["select"];
		    	tr.lastChild.appendChild(b);
		  	}
		}
		field.addEventListener("click", mark);
	}
	games = document.querySelectorAll(".container");
	for (i = 0; i < games.length; i++) {
		TicTacToe(games[i]); // aktuelles Fundstück steht in games[i]
	}
};
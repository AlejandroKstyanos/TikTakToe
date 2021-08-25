document.addEventListener('DOMContentLoaded',function(){
	//Get all the elements needed.
	const PlayBtn = document.getElementById('play-button');
	const Inputs = document.getElementsByClassName('input-name');
	const Views = document.getElementsByClassName('view');
	const ResetBtn = document.getElementById('reset-btn');
	const PlayAgainBtn = document.getElementById('play-again-btn');
	const Playerx = document.getElementById('playerx-label');
	const Playero = document.getElementById('playero-label');
	const Grids = Array.from(document.querySelectorAll('.game-grid'));
	const Msg = document.getElementById('msg-label');
	const MsgBar = document.getElementById('message-bar');

	//Some variables
	let Board = [['','',''],
				 ['','',''],
				 ['','','']];
	let CurrentPlayer = 'x'; //X or O
	let CurrentGame = false;



	//Function for PlayBtn
	PlayBtn.onclick = function(){
		if(Inputs[0].value === "" || Inputs[1].value === ""){
			alert('You must fill all the fields!');
		}else if(Inputs[0].value === Inputs[1].value){
			alert('Name for each can\'t be the same!')
		}else{
			//hide Menu section:
			Views[0].style.display = 'none';

			//show game section:
			Views[1].style.display = 'block';
			if( MsgBar.classList.contains('hide') ){
				MsgBar.classList.remove('hide');
			}

			//show players name on the board
			Playerx.innerText = Inputs[0].value;
			Playero.innerText = Inputs[1].value;

			startGame();
		}
	}

	//Function for ResetBtn
	ResetBtn.onclick = function(){
		//Show Menu section:
		Views[0].style.display = 'inline-block';
		Inputs[0].value = "";
		Inputs[1].value = "";

		//hide the game section:
		Views[1].style.display = 'none';

		//clean the grids
		Grids.forEach( grid => {
			grid.classList.remove('playerx');
			grid.classList.remove('playero');
		});

		//clean the board
		Board = [['','',''],
				 ['','',''],
				 ['','','']];

		MsgBar.classList.add('hide');
		
	}

	//Function for play again button
	PlayAgainBtn.onclick = function(){
		//clean the board
		Board = [['','',''],
				 ['','',''],
				 ['','','']];

		//clean the grids
		Grids.forEach( grid => {
			grid.classList.remove('playerx');
			grid.classList.remove('playero');
		});

		startGame();
	}


	//start the game
	function startGame(){
		//Start the game:
		CurrentGame = true;
		//Choose a player:
		CurrentPlayer = choosePlayer();

		if(CurrentPlayer === 'x'){
			Msg.innerHTML = 'PLAYER <span style="color: #EC1C24FF;"> X </span> TURN';
		}else if(CurrentPlayer === 'o'){
			Msg.innerHTML = 'PLAYER <span style="color: #4B42C7FF;"> O </span> TURN';
		}
	}

	//First function, this run when the player click on a grid.
	function userAction(grid, index) {
		if(isValidAction(grid) && CurrentGame === true){
			if(CurrentPlayer === 'x'){
				grid.classList.add('playerx');
				Msg.innerHTML = 'PLAYER <span style="color: #4B42C7FF;"> O </span> TURN';
				fillBoard(index, CurrentPlayer);
			}else if(CurrentPlayer === 'o'){
				grid.classList.add('playero');
				Msg.innerHTML = 'PLAYER <span style="color: #EC1C24FF;"> X </span> TURN';
				fillBoard(index, CurrentPlayer);
			}

			//Change the player
			CurrentPlayer = CurrentPlayer === 'x' ? 'o' : 'x';

		}else if(CurrentGame === false){
			alert('The game is over!');
		}else{
			alert('You should click on another grid.');
		}
	}

	//It fill the board and then check if the current player win. 
	//It might be filled with only valid marks.
	function fillBoard(index, CurrentPlayer) {
		let IsWinner = false;

		switch(index){
			case 0:
			case 1:
			case 2:
				Board[0][index] = CurrentPlayer;;
				IsWinner = checkWinner(0,index,CurrentPlayer);
				break;
			case 3:
			case 4:
			case 5:
				Board[1][index - 3] = CurrentPlayer;	
				IsWinner = checkWinner(1,index - 3,CurrentPlayer);
				break;
			case 6:
			case 7:
			case 8:
				Board[2][index - 6] = CurrentPlayer;
				IsWinner = checkWinner(2,index - 6,CurrentPlayer);
				break;
		}

		// console.log(IsWinner);

		if( IsWinner === true && CurrentPlayer === 'x'){
			Msg.innerHTML = 'PLAYER <span style="color: #EC1C24FF;"> X </span> WIN!';
			CurrentGame = false;
		}else if( IsWinner === true && CurrentPlayer === 'o'){
			Msg.innerHTML = 'PLAYER <span style="color: #4B42C7FF;"> O </span> WIN!';
			CurrentGame = false;
		}else if(checkTie()){
			Msg.innerHTML = 'TIE!';
			CurrentGame = false;
		}
	}

	//Check tie
	function checkTie(){
		//If it find a blank space on the board, it means that it doesn't filled so, can't be TIE.
		for( var i = 0 ; i < 3 ; i++ ) {
			for( var j = 0 ; j < 3 ; j++ ){
				if(Board[i][j] === ''){
					return false;
				}
			}
		}

		//Else doesn't find a space blank, it means TIE.
		return true;
	}

	//Check the winner, checking rows, diagonals and columns of the board.
	function checkWinner(Row, Column, CurrentPlayer) {
		//checking Row
		if(Board[Row][0] === Board[Row][1] && Board[Row][0] === Board[Row][2] && Board[Row][0] === CurrentPlayer){
			return true;
		}

		//Checking Columns
		if(Board[0][Column] === Board[1][Column] && Board[0][Column] === Board[2][Column] && Board[0][Column] === CurrentPlayer){
			return true;
		}

		//Checking diagonals
		if(Board[0][0] === Board[1][1] && Board[0][0] === Board[2][2] && Board[0][0] === CurrentPlayer){
			return true;
		}else if(Board[0][2] === Board[1][1] && Board[0][2] === Board[2][0] && Board[0][2] === CurrentPlayer){
			return true;
		}

		return false;
	}

	//Function to choose the starter player where: 0 = X and 1 = O
	function choosePlayer() {

		if(Math.floor( Math.random() * 2) === 0 ){
			return 'x';
		}else{
			return 'o';
		}

	}

	//Check if the clicked grid is empty
	function isValidAction(grid){
		//If the clicked grid contains one of them class names, it means that the grid isn't empty.
		if(grid.classList.contains('playerx') || grid.classList.contains('playero')){
			return false;
		}

		//In other case, it should be mark with X or O
		return true;
	}

	//Add a function for each grid of the game:
	Grids.forEach((grid, index) => {
    	grid.addEventListener('click', () => userAction(grid,index));
	});
});
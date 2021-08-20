document.addEventListener('DOMContentLoaded',function(){
	//Get all the elements needed.
	const PlayBtn = document.getElementById('play-button');
	const Inputs = document.getElementsByClassName('input-name');
	const Views = document.getElementsByClassName('view');
	const ResetBtn = document.getElementById('reset-btn');
	const Playerx = document.getElementById('playerx-label');
	const Playero = document.getElementById('playero-label');
	const Grids = Array.from(document.querySelectorAll('.game-grid'));
	const Msg = document.getElementById('msg-label');
	const MsgBar = document.getElementById('message-bar');

	//Some variables
	let Board = [['','',''],
				 ['','',''],
				 ['','','']];
	let CurrentPlayer = 'x'; //X start first.



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

			//show players name on the board
			Playerx.innerText = Inputs[0].value;
			Playero.innerText = Inputs[1].value;
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

	//First function, this run when the player click on a grid.
	function userAction(grid, index) {
		if(isValidAction(grid)){
			if(CurrentPlayer === 'x'){
				grid.classList.add('playerx');
				Msg.innerHTML = 'PLAYER <span style="color: #EC1C24FF;"> X </span> TURN';
				// fillBoard(index);
			}else if(CurrentPlayer === 'o'){
				grid.classList.add('playero');
				Msg.innerHTML = 'PLAYER <span style="color: #4B42C7FF;"> O </span> TURN';
				// fillBoard(index);
			}

			//Change the player
			CurrentPlayer = CurrentPlayer === 'x' ? 'o' : 'x';
		}else{
			Alert('You should click on another grid');
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
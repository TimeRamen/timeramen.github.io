
var upArrow = document.querySelector("#arrows .fa-angle-up");
var downArrow = document.querySelector("#arrows .fa-angle-down");
var gridDimensions = document.querySelector("#grid-dimensions");
var gridSize = 3;

var allCells = document.querySelectorAll(".cell");
var fourCells = document.querySelectorAll(".four");
var fiveCells = document.querySelectorAll(".five");
var allPlus = document.querySelectorAll(".fa-plus");
var allInput = document.querySelectorAll("input");
var allImg = document.querySelectorAll("img");
var addRemove = document.querySelectorAll(".add-remove");

var takePicture = document.querySelector(".fa-camera");
var caption = document.querySelector("#caption");
var picture = false;

gridDimensions.innerHTML = stringSize(gridSize);





for(var i = 0; i < allPlus.length ; i++){
	allPlus[i].addEventListener("click",function(){
		var arr = Array.prototype.slice.call(allPlus); 
		
		this.classList.toggle("rotated");
		allInput[arr.indexOf(this)].classList.toggle("hidden");
		
	})
}

for(var i = 0; i < allInput.length; i++){
	allInput[i].addEventListener("change",function(){
		var arr = Array.prototype.slice.call(allInput); 
		x = arr.indexOf(this);
		
		allImg[x].src = allInput[x].value;
});
}





downArrow.addEventListener("click",function(){
	if(gridSize > 3){
	gridSize--;
	gridDimensions.innerHTML = stringSize(gridSize);
	updateGrid(gridSize);
	}
})

upArrow.addEventListener("click",function(){
	if(gridSize < 5){
	gridSize++;
	gridDimensions.innerHTML = stringSize(gridSize);
	updateGrid(gridSize);
	}
})

takePicture.addEventListener("click",function(){
	for(var i = 0; i < addRemove.length ; i++){
		addRemove[i].classList.toggle("hidden");
	}
	picture = !picture;
		if(picture){
			caption.textContent = "Great! Now take a snapshot with your favourite snipping tool. Or go back and change something: ";
		}else{
			caption.textContent = "Once the grid has been filled, you can remove the clutter with this: ";
		}
})
function stringSize(size){
	return size + "X" + size;
}

function updateGrid(size){
	if(size === 3){
		hideFiveCells();
		fitThreeCells();
		allThreePlus();
		resizeThreeInputs();
	}
	else if(size === 4){
		hideFiveCells();
		showFourCells();
		fitFourCells();
		allFourPlus();
		resizeFourInputs();
	}
	else if(size === 5){
		showFiveCells();
		fitFiveCells();
		allFivePlus();
		resizeFiveInputs();
	}
	else{
		hideFiveCells();
		fitThreeCells();
	}
}







function showFourCells(){
for(var i = 0; i < fourCells.length ; i++){
	fourCells[i].classList.remove("hidden");
}
}

function hideFourCells(){
for(var i = 0; i < fourCells.length ; i++){
	fourCells[i].classList.add("hidden");
}
}

function showFiveCells(){
for(var i = 0; i < fiveCells.length ; i++){
	fiveCells[i].classList.remove("hidden");
}
}

function hideFiveCells(){
for(var i = 0; i < fiveCells.length ; i++){
	fiveCells[i].classList.add("hidden");
}
}

function fitFiveCells(){
	for(var i = 0; i < allCells.length ; i++){
		allCells[i].style.height = "18vmin";
		allCells[i].style.width = "18vmin";
	}
}

function fitFourCells(){
	for(var i = 0; i < allCells.length ; i++){
		allCells[i].style.height = "22vmin";
		allCells[i].style.width = "22vmin";
	}
}

function fitThreeCells(){
	for(var i = 0; i < allCells.length ; i++){
		allCells[i].style.height = "30vmin";
		allCells[i].style.width = "30vmin";
	}
}

function allFivePlus(){
	for(var i = 0; i < allPlus.length ; i++){
		allPlus[i].style.fontSize = "3vw";
	}
}
function allFourPlus(){
	for(var i = 0; i < allPlus.length ; i++){
		allPlus[i].style.fontSize = "4vw";
	}
}
function allThreePlus(){
	for(var i = 0; i < allPlus.length ; i++){
		allPlus[i].style.fontSize = "6vw";
	}
}

function resizeThreeInputs(){
	for(var i = 0; i < allInput.length ; i++){
		allInput[i].style.width = "29vmin";
	}
}
function resizeFourInputs(){
	for(var i = 0; i < allInput.length ; i++){
		allInput[i].style.width = "20vmin";
	}
}
function resizeFiveInputs(){
	for(var i = 0; i < allInput.length ; i++){
		allInput[i].style.width = "16vmin";
	}
}
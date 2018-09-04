/*PORTFOLIO & PERSONAL*/

var cellHeading = document.querySelectorAll(".cell h3");
var cell = document.querySelectorAll(".cell");
var clicked = false;

initialiseCells();

function initialiseCells(){
	for(var i = 0; i < cellHeading.length ; i++){
		cellHeading[i].addEventListener("click",function(){
			var arr = Array.prototype.slice.call(cellHeading);
			toggleAllCells();
			cell[arr.indexOf(this)].classList.remove("hidden");
			clicked = !clicked;
			
			//FIX THIS NOW.
			if(!(window.matchMedia( "(min-width: 535px)"))){
				if(clicked){
				changeCellWidth(90);
				}else {
				changeCellWidth(40);
				}
			}else{
				changeCellWidth(90);
			}
			
		})
	}
}

function hideAllCells(){
	for(var i = 0; i < cell.length ; i++){
		cell[i].classList.add("hidden");
	}
}
function toggleAllCells(){
	for(var i = 0; i < cell.length ; i++){
		cell[i].classList.toggle("hidden");
	}
}

function changeCellWidth(width){
	var widthString = width + "%";
	for(var i = 0; i < cell.length ; i++){
		cell[i].style.width = widthString;
	}
}
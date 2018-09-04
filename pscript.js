/*PORTFOLIO & PERSONAL*/

var cellHeading = document.querySelectorAll(".cell h3");
var cell = document.querySelectorAll(".cell");
var clicked = false;
var hiddenText = document.querySelectorAll(".cell span.hidden");
var appButton = document.querySelectorAll(".cell button");
var appDisplay = document.querySelector("iframe");
var appDescription = document.querySelectorAll(".cell .desc");
var appLink = document.querySelector(".cell span a");
initialisePage();


function initialisePage(){
	initialiseCells();
	initialiseAppButtons();
}


function initialiseCells(){
	for(var i = 0; i < cellHeading.length ; i++){
		cellHeading[i].addEventListener("click",function(){
			var arr = Array.prototype.slice.call(cellHeading);
			toggleAllCells();
			cell[arr.indexOf(this)].classList.remove("hidden");
			hiddenText[arr.indexOf(this)].classList.toggle("hidden");
			
			clicked = !clicked;
			if(clicked){
				changeCellWidth(90);
			}else{
				if((window.matchMedia( "(min-width: 535px)"))){
					changeCellWidth(40);
				}else{
				changeCellWidth(90);
				}
			}
			
		})
	}
}

function initialiseAppButtons(){
	for(var i = 0; i < appButton.length ; i++){
		appButton[i].addEventListener("click",function(){
			deactivateAllButtons();
			this.classList.add("active");
			appDisplay.src = changeSrc(this.id);
			appLink.href = changeSrc(this.id);
			var appArray = Array.prototype.slice.call(appButton);
			hideAllDesc();
			appDescription[appArray.indexOf(this)].classList.remove("hidden");
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

function deactivateAllButtons(){
	for(var i = 0; i < appButton.length ; i++){
		appButton[i].classList.remove("active");
	}
}

function hideAllDesc(){
	for(var i = 0; i < appDescription.length ; i++){
		appDescription[i].classList.add("hidden");
	}
}

function changeCellWidth(width){
	var widthString = width + "%";
	for(var i = 0; i < cell.length ; i++){
		cell[i].style.width = widthString;
	}
}

function changeSrc(string){
	var srcString = "Apps/" + string + ".html";
	return srcString;
}
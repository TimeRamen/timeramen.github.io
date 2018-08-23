//selection of body to change colour.
var body = document.querySelector("body");
//three colour generating buttons
var light = document.querySelector("#light");
var random = document.querySelector("#random");
var dark = document.querySelector("#dark");
//colour value spans that change textContent
var colour = document.querySelector("#colour");
var hex = document.querySelector("#hex");
//colour channel inputs
var rInput = document.querySelector("#red");
var gInput = document.querySelector("#green");
var bInput = document.querySelector("#blue");
//lock icons
var redLock = document.querySelector("#redLock");
var greenLock = document.querySelector("#greenLock");
var blueLock = document.querySelector("#blueLock");
//previous and next buttons
var previous = document.querySelector("#previous");
var next = document.querySelector("#next");
//toggle buttons
var help = document.querySelector(".fa-question-circle");
var toggler = document.querySelector(".fa-toggle-off");
//selection of divs to hide and unhide by toggling
var colourBody = document.querySelector(".body");
var advanceTools = document.querySelectorAll(".hider");
var helpBar = document.querySelector(".helphider");
/*--------*/

var rgbArray = [
	[255,255,255]
];

var r = 255;
var g = 255;
var b = 255;

var rLocked = false;
var gLocked = false;
var bLocked = false;

/*--------*/

var colString; //string
var hexString; //string
var whiteFont; //boolean
var toggled = false; //boolean
var currentIndex = 0;




/*

function colourAllowedHTML(colourString){
return "<input id=\""+colourString+"\" name=\""+colourString+"\" placeholder=\"255\" min=\"0\" max=\"255\" required=\"\" type=\"number\">";
};

function colourDisabledHTML(colourString){
return "<input id=\""+colourString+"\" name=\""+colourString+"\" placeholder=\"255\" min=\"0\" max=\"255\" readonly=\"\" type=\"number\">"
};

*/


/* From http://www.javascripter.net/faq/rgbtohex.htm */
function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}
/* -------------- */

function rand(length,bottom){
	return Math.floor(Math.random() * length) + bottom;
};


function rgbRand (length,bottom){
	if((length+bottom) <= 255){
		if(!rLocked){
			r = rand(length,bottom);
			rInput.value = r;
		}
		if(!gLocked){
			g = rand(length,bottom);
			gInput.value = g;
		}
		if(!bLocked){
			b = rand(length,bottom);
			bInput.value = b;
		}
	}
	rgbArray.push([r,g,b]);
	currentIndex = rgbArray.length - 1;
	
	
};

function newColour(){
	previous.classList.remove("hidden");
	next.classList.add("hidden");
};

function stringColour(r,g,b){
	//whiteFont = (r < 55 && g < 55) ||(r < 55 && b < 65)||(b < 65 && g < 55);
	whiteFont = (r < 128 && g < 128 && b < 128);
	if(whiteFont){
		body.style.color = "white";
	}else{
		body.style.color = "black";
	}
	hexString = rgbToHex(r,g,b);
	colString = "rgb(" + r + "," + g + "," + b + ")";
	colour.textContent = colString;
	hex.textContent = hexString;
	
	body.style.backgroundColor = colString;
};

random.addEventListener("click",function(){
	newColour();
	rgbRand(255,0);
	stringColour(r,g,b);
});

light.addEventListener("click",function(){
	newColour();
	rgbRand(55,200);
	stringColour(r,g,b);
});

dark.addEventListener("click",function(){
	newColour();
	rgbRand(55,0);
	stringColour(r,g,b);
});

rInput.addEventListener("change",function(){
	//r = rInput.value;
	rgbArray[currentIndex] = [Number(rInput.value),Number(gInput.value),Number(bInput.value)];
	stringColour(Number(rInput.value),Number(gInput.value),Number(bInput.value));
});

gInput.addEventListener("change",function(){
	//g = gInput.value;
	rgbArray[currentIndex] = [Number(rInput.value),Number(gInput.value),Number(bInput.value)];
	stringColour(Number(rInput.value),Number(gInput.value),Number(bInput.value));
});

bInput.addEventListener("change",function(){
	//b = bInput.value;
	rgbArray[currentIndex] = [Number(rInput.value),Number(gInput.value),Number(bInput.value)];
	stringColour(Number(rInput.value),Number(gInput.value),Number(bInput.value));
});

/*
rInput.value = rgbArray[currentIndex - 1][0];
gInput.value = rgbArray[currentIndex - 1][1];
bInput.value = rgbArray[currentIndex - 1][2];
*/



previous.addEventListener("click",function(){
	if(currentIndex > 0){
	stringColour(rgbArray[currentIndex - 1][0],rgbArray[currentIndex - 1][1],rgbArray[currentIndex - 1][2]);
	
	rInput.value = rgbArray[currentIndex - 1][0];
	gInput.value = rgbArray[currentIndex - 1][1];
	bInput.value = rgbArray[currentIndex - 1][2];
	
	currentIndex--;
	next.classList.remove("hidden");
	
	if(currentIndex === 0){
	previous.classList.add("hidden");
	}
	} 
});

next.addEventListener("click",function(){
	if(currentIndex < rgbArray.length - 1){
	stringColour(rgbArray[currentIndex + 1][0],rgbArray[currentIndex + 1][1],rgbArray[currentIndex + 1][2]);
	
	rInput.value = rgbArray[currentIndex + 1][0];
	gInput.value = rgbArray[currentIndex + 1][1];
	bInput.value = rgbArray[currentIndex + 1][2];
	
	currentIndex++;
	previous.classList.remove("hidden");
	
	if(currentIndex === rgbArray.length - 1){
	next.classList.add("hidden");
	}
	}
});

toggler.addEventListener("click",function(){
	if(!toggled){
		toggler.classList.remove("fa-toggle-off");
		toggler.classList.add("fa-toggle-on");
	}else{
		toggler.classList.remove("fa-toggle-on");
		toggler.classList.add("fa-toggle-off");
	}
	for(var i = 0; i <advanceTools.length ; i++){
			advanceTools[i].classList.toggle("hider");
		}
	toggled = !toggled;
});

redLock.addEventListener("click",function(){
	if(!rLocked){
		redLock.classList.remove("fa-unlock");
		redLock.classList.add("fa-lock");
		//rInput.outerHTML = colourDisabledHTML("red");
	}else{
		redLock.classList.remove("fa-lock");
		redLock.classList.add("fa-unlock");
		//rInput.outerHTML = colourAllowedHTML("red");
	}
	
	rLocked = !rLocked;
});

greenLock.addEventListener("click",function(){
	if(!gLocked){
		greenLock.classList.remove("fa-unlock");
		greenLock.classList.add("fa-lock");
		//gInput.outerHTML = colourDisabledHTML("green");
	}else{
		greenLock.classList.remove("fa-lock");
		greenLock.classList.add("fa-unlock");
		//gInput.outerHTML = colourAllowedHTML("green");
	}
	
	gLocked = !gLocked;
});

blueLock.addEventListener("click",function(){
	if(!bLocked){
		blueLock.classList.remove("fa-unlock");
		blueLock.classList.add("fa-lock");
		//bInput.outerHTML = colourDisabledHTML("blue");
	}else{
		blueLock.classList.remove("fa-lock");
		blueLock.classList.add("fa-unlock");
		//bInput.outerHTML = colourAllowedHTML("blue");
	}
	bLocked = !bLocked;
});

help.addEventListener("click",function(){
	colourBody.classList.toggle("helphider");
	helpBar.classList.toggle("helphider");
});

/*	Bugs&Issues
	-	Too many similar classes.
	-	
*/
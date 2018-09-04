
/*For INDEX.HTML*/
var phrase = "Welcome to my website";
var update = "ght";
function stringToArray(string){
	var array = [];
	for(var i = 0 ; i < string.length ; i ++ ){
		array.push(string.charAt(i));
	}
	return array;
}
function arrayToString(arr){
	var string = "";
	string = arr.join("");
	return string;
}
var siteArray = stringToArray(phrase);
var siteLength = siteArray.length;

var words = document.querySelector("#words");
var cursor = document.querySelector("#cursor");
var i = 0;
var j = 0;
var speed = 100;

typeSight();

function typeSight(){
	if(i < siteLength){
		words.innerHTML += siteArray[i];
		i++;
		cursor.classList.toggle("flash");
		setTimeout(typeSight, speed+i*10);
	}
	else if (i === siteLength && j < 2){
		siteArray.pop();
		words.innerHTML = arrayToString(siteArray);
		j++;
		setTimeout(typeSight, speed);
	}
	else if(j-2 < update.length){
		words.innerHTML += update.charAt(j-2);
		cursor.classList.toggle("flash");
		j++;
		setTimeout(typeSight, speed+i*10);
	}
	else{
		cursor.classList.add("fadeOut");
	}
}
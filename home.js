$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var webSight = document.querySelector("#sight");
var cursor = document.querySelector("#cursor");

var site = "site";
var sight = "ght";

var i = 0;
var speed = 400;
var deleteSpeed = 200;
var j = 0;

typeWriter();

function typeWriter() {
  if (i < site.length) {
    webSight.innerHTML += site.charAt(i);
    i++;
	cursor.classList.toggle("flash");
    setTimeout(typeWriter, speed+i*20);
  }
  else if (i === site.length && j === 0){
	webSight.innerHTML = "sit";
	j++;
	setTimeout(typeWriter, deleteSpeed);
  }
  else if( j === 1){
	webSight.innerHTML = "si";
	j++;
	setTimeout(typeWriter, deleteSpeed);
  }else if( j-2 < sight.length){
	webSight.innerHTML += sight.charAt(j-2);
	j++;
	cursor.classList.toggle("flash");
	setTimeout(typeWriter, speed);
  }else{
	webSight.classList.add("wrong");
	cursor.classList.add("fadeOut");
  }
}
var colorApp = document.querySelector("#color");
var albumApp = document.querySelector("#album");
var appList = document.querySelectorAll(".appList");
var appDisplay = document.querySelector("iframe");
var appLink = document.querySelector("#appLink");

colorApp.addEventListener("click",function(){
	for(var i = 0; i < appList.length ; i++){
		appList[i].classList.remove("activeApp");
	}
	colorApp.classList.add("activeApp");
	appDisplay.src = "Apps/colors.html";
	appLink.href = "Apps/colors.html";
})

albumApp.addEventListener("click",function(){
	for(var i = 0; i < appList.length ; i++){
		appList[i].classList.remove("activeApp");
	}
	albumApp.classList.add("activeApp");
	appDisplay.src = "Apps/album.html";
	appLink.href = "Apps/album.html";
})
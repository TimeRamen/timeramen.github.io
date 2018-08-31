var end = document.getElementById("end");
var activities = document.querySelectorAll(".activity");
var table = document.querySelector("tbody");
var entireTable = document.querySelector("table");
var dateHeading =  document.querySelector("h2");

table.innerHTML = "";

var activitiesArray = [];

var startTime;
var endTime;
var elapsedTime;

var oldHour = 0;
var oldMinute = 0;


var lastButtonPressed = "first";

init();

function init(){
	
	printDate();
	inActiveAll();
	initialiseButtons();
	
	
}




end.addEventListener("click",function(){
	lastButtonPressed = "END";
	if(table.innerHTML !== ""){
		document.querySelector(".endtime").textContent = endTime;
		document.querySelector(".elapsed").textContent = elapsedTime;
		document.querySelector(".endtime").classList.remove("endtime");
		document.querySelector(".elapsed").classList.remove("elapsed");
	}
	entireTable.style.borderBottom = "1px solid grey";
	
})




function getWeekDay(day) {
    var weekday = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return weekday[day];
}
function getMonthString(monthNum){
	var month = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
	return month[monthNum];
}

function printDate(){
	var d = new Date();
	var week = getWeekDay(d.getDay());
	var month = getMonthString(d.getMonth());
	var date = d.getDate();
	dateHeading.textContent = week + " " + date + " " + month;
}
function tableInner(act,stime,etime,elapsed){
	var tableString = "<tr><td>"+act+"</td><td>"+stime+"</td><td class='endtime'>"+etime+"</td><td class='elapsed'>"+elapsed+"</td></tr>";
	return tableString;
}

function addTableRow(a,s,e,t){
	table.innerHTML += tableInner(a,s,e,t);
}

function addTableObj(act){
	addTableRow(act.name,act.timeStart,act.timeEnd,act.timeElapsed);
}

function printTime(hour, minute){
	var timeString;
	var hourIsUnit = hour < 10;
	var minuteIsUnit = minute < 10;
	if(hourIsUnit && minuteIsUnit ){
		timeString = "0" + hour + " : 0" + minute;
	}
	else if(hourIsUnit && !minuteIsUnit){
		timeString = "0" + hour + " : " + minute;
	}
	else if(!hourIsUnit && minuteIsUnit){
		timeString = hour + " : 0" + minute;
	}
	else if(!hourIsUnit && !minuteIsUnit){
		timeString = hour + " : " + minute;
	}
	else{
		console.log("ERROR");
	}
	
	return timeString;
}

function hourToMinute(hour){
	minute = hour * 60;
	return minute;
}



function initialiseButtons(){
	for( var i = 0 ; i < activities.length ; i ++){
		activities[i].addEventListener("click",function(){
		
		
			if(lastButtonPressed !== this.innerHTML && lastButtonPressed !== "END"){
					
				
					
				var d = new Date();
				var hour = d.getHours();
				var minute = d.getMinutes();
				
				var differenceHour = hour - oldHour;
				var differenceMinute = minute-oldMinute;
				if(lastButtonPressed !== "first"){
					elapsedTime = hourToMinute(differenceHour)+differenceMinute;
				}
				endTime = printTime(oldHour,oldMinute);
				
				if(table.innerHTML !== ""){
					document.querySelector(".endtime").textContent = endTime;
					document.querySelector(".elapsed").textContent = elapsedTime;
					document.querySelector(".endtime").classList.remove("endtime");
					document.querySelector(".elapsed").classList.remove("elapsed");
				}
				oldHour = hour;
				oldMinute = minute;
				startTime = printTime(hour,minute);
				inActiveAll();
				this.classList.add("active");
				lastButtonPressed = this.innerHTML;
				
				var actObj = {
					name : lastButtonPressed,
					timeStart: startTime,
					timeEnd: "-",
					timeElapsed: "-"
				}
				
				activitiesArray.push(actObj);
				addTableObj(actObj);
			}
	});
	}
}

function inActiveAll(){
	for(var i = 0 ; i < activities.length ; i++ ){
		activities[i].classList.remove("active");
	}
}
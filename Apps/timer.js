//selectors for buttons
var end = document.getElementById("end");
var activities = document.querySelectorAll(".activity");
var table = document.querySelector("tbody");
var entireTable = document.querySelector("table");
var dateHeading =  document.querySelector("h2");
var refreshButton =  document.querySelector(".refresh");

//setting innerHTML to empty string so the rest of the code works
table.innerHTML = "";

//var activitiesArray = [];

var startTime;
var endTime;
var elapsedTime;
//old time used for calculating elapsed time
var oldHour = 0;
var oldMinute = 0;
//selectors for coloured buttons
var greenButtons = document.querySelectorAll("button.green");
var orangeButtons = document.querySelectorAll("button.orange");
var purpleButtons = document.querySelectorAll("button.purple");
var redButtons = document.querySelectorAll("button.red");
//selectors for coloured table headings
var greenDisplay = document.querySelector("th.green");
var orangeDisplay = document.querySelector("th.orange");
var purpleDisplay = document.querySelector("th.purple");
var redDisplay = document.querySelector("th.red");
//time elapsed for each colour
var greenElapse = 0;
var orangeElapse = 0;
var purpleElapse = 0;
var redElapse = 0;

//creating identifiers
var lastButtonPressed = "first";
var colourPressed = "";


//initialising the program
init();


function init(){
	//refreshes the table.
	refresh();
	//initialises all buttons on page
	initialiseAllButtons();
	//buttons needs to initialised before due to the passing of colour.
}

function refresh(){
	//rotates the refresh button
	refreshButton.classList.add("rotated");
	//removes rotate after 1 second.
	setTimeout(
		function() {
			refreshButton.classList.remove("rotated");
		}, 1000);
	//prints a date on the h2.
	printDate();
	//deactivates all buttons
	inActiveAll();
	//assigns regular values from the beginning
	lastButtonPressed = "first";
	colourPressed = "";
	table.innerHTML = "";
	entireTable.style.borderBottom = "none";
	greenElapse = 0;
	orangeElapse = 0;
	purpleElapse = 0;
	redElapse = 0;
	greenDisplay.textContent = "";
	orangeDisplay.textContent = "";
	purpleDisplay.textContent = "";
	redDisplay.textContent = "";
}

function initialiseAllButtons(){
	
	//initialises Buttons
	initialiseActivityButtons();
	//initialises Colours
	initialiseColourButtons();
	//initialises end and refresh buttons
	initialiseOtherButtons();
	
}



function initialiseColourButtons(){
	
	//simple initialiser for each coloured button that changes colourPressed for each button. Could be refactored by using hidden text on each button so that its easier to assign newer colours.
	
	for(var i = 0; i < greenButtons.length ; i ++){
	greenButtons[i].addEventListener("click",function(){
		colourPressed = "green";
	})
}
	for(var i = 0; i < orangeButtons.length ; i ++){
	orangeButtons[i].addEventListener("click",function(){
		colourPressed = "orange";
	})
}
	for(var i = 0; i < purpleButtons.length ; i ++){
	purpleButtons[i].addEventListener("click",function(){
		colourPressed = "purple";
	})
}
	for(var i = 0; i < redButtons.length ; i ++){
	redButtons[i].addEventListener("click",function(){
		colourPressed = "red";
	})
}
	
}

function updateColourElapsed(colour,eltime){
	
	//changes elapsede time for each colour depending on last colour pressed.
	if(colour === "green"){
		greenElapse += eltime;
		greenDisplay.textContent = greenElapse;
	}else if(colour === "orange"){
		orangeElapse += eltime;
		orangeDisplay.textContent = orangeElapse;
	}else if(colour === "purple"){
		purpleElapse += eltime;
		purpleDisplay.textContent = purpleElapse;
	}else if(colour === "red"){
		redElapse += eltime;
		redDisplay.textContent =  redElapse;
	}else{
		console.log ("ERROR");
	}
	
}

function initialiseOtherButtons(){
	end.addEventListener("click",endTimer);
	refreshButton.addEventListener("click",refresh);
}

function endTimer(){
	if(lastButtonPressed !== "first"){
		//set last button to end so that no other buttons can be pressed.
		lastButtonPressed = "END";
		//sets elapsed time
		setElapsed();
		//calls convertTable function 
		convertTable();
		//sets a border at the bottom
		entireTable.style.borderBottom = "1px solid grey";
		//deactivates all buttons
		inActiveAll();
		//activated end.
		end.classList.add("active");
	}
}




function getWeekDay(day) {
	//simple function that returns word form of day of the week
    var weekday = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return weekday[day];
}
function getMonthString(monthNum){
	//simple function that returns word form of month.
	var month = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
	return month[monthNum];
}

function printDate(){
	//simple function that gets day, date and month and assigns it to the dateHeading.
	var d = new Date();
	var week = getWeekDay(d.getDay());
	var month = getMonthString(d.getMonth());
	var date = d.getDate();
	dateHeading.textContent = week + " " + date + " " + month;
}
function tableInner(act,stime,etime,elapsed){
	//tableString is a string that gives a row with four columns to be added, with the last two having classes that are later dynamically changed when button is pressed.
	var tableString = "<tr><td>"+act+"</td><td>"+stime+"</td><td class='endtime'>"+etime+"</td><td class='elapsed'>"+elapsed+"</td></tr>";
	return tableString;
}

function addTableRow(a,s,e,t){
	//adds a new row to table by using tableInner
	table.innerHTML += tableInner(a,s,e,t);
}

function addTableObj(act){
	//same as add tableRow but takes an object as argument
	addTableRow(act.name,act.timeStart,act.timeEnd,act.timeElapsed);
}

function printTime(hour, minute){
	//simple function that always returns 2 digit hours and 2 digit minutes, even when they are smaller than 10.
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
	//simple minute to hour converter
	minute = hour * 60;
	return minute;
}



function initialiseActivityButtons(){
	//initialises buttons so that each of them performs buttonPress on press.
	for( var i = 0 ; i < activities.length ; i ++){
		activities[i].addEventListener("click",buttonPress);
	}
}


function inActiveAll(){
	//removes active state for all buttons
	for(var i = 0 ; i < activities.length ; i++ ){
		activities[i].classList.remove("active");
	}
}

function convertTable(){
	//if table is not empty
	if(table.innerHTML !== ""){
		//set table row endtime and elapsed time to be their respective values
		document.querySelector(".endtime").textContent = startTime;
		document.querySelector(".elapsed").textContent = elapsedTime;
		//remove the selectors for endtime and elapsed
		document.querySelector(".endtime").classList.remove("endtime");
		document.querySelector(".elapsed").classList.remove("elapsed");
	}
}
function setElapsed(){
	//if lastButtonPressed is not first
	if(lastButtonPressed !== "first"){
		var differenceHour = hour - oldHour;
		var differenceMinute = minute-oldMinute;
		//it assigns an elapsed time
		elapsedTime = hourToMinute(differenceHour)+differenceMinute;
		//and updates the text content of the colour grid as well
		updateColourElapsed(colourPressed,elapsedTime);
		//endTime = printTime(oldHour,oldMinute);
	}
}



function buttonPress(){
		
			//checks if button isn't first button pressed or end.
			if(lastButtonPressed !== this.innerHTML && lastButtonPressed !== "END"){
					
				
				//sets the time for start time, saves it into hour and minute and assigns it to start time.
				var d = new Date();
				var hour = d.getHours();
				var minute = d.getMinutes();
				startTime = printTime(hour,minute);
				
				//if button is not the first button pressed...
				setElapsed();
				//calls convertTable function 
				convertTable();
				//assign old numbers after elapsed calculations have been made
				oldHour = hour;
				oldMinute = minute;
				//deactivate all numbers
				inActiveAll();
				//activate number pressed
				this.classList.add("active");
				//sets last button pressed
				lastButtonPressed = this.innerHTML;
				
				//sends an object of the button pressed to pass through to table
				var actObj = {
					name : lastButtonPressed,
					timeStart: startTime,
					timeEnd: "-",
					timeElapsed: "-"
				}
				
				//activitiesArray.push(actObj);
				//adds object to table
				addTableObj(actObj);
			}
	}
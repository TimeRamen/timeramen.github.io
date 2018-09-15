var DMTHeader = document.querySelector(".top h1");
var DMTSubHeader = document.querySelector(".top h2");
var hiddenParagraph = document.querySelector("p.hidden");
DMTSubheaderText = "Lightweight, zero dependancy text animation library.";
defaultSmartJumble(DMTHeader);
setTimeout(function(){
    typeWriterAdd(DMTSubHeader,DMTSubheaderText,60);
},200*11);
setTimeout(initialiseHeader,calculateSpeedString(DMTSubheaderText,60) + 200*11);


function initialiseHeader(){
    hiddenParagraph.classList.remove("hidden");
    DMTHeader.addEventListener("click",function(){
        smartJumble(DMTHeader,10,200,"0DMT");
    //defaultSmartJumble(DMTHeader);
    })
}

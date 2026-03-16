let protein = 0;
let ricebotCost = 15;
let amountPerClick = 1;
let riceBots = 0;
let botProduction = 0;
let ricebotMult = 0.1;
let ricebotCostMult = 1.01;
let perSecond = botProduction;

let friedChickenBtn = document.getElementById("friedChickenBtn");
let proteinLabel = document.getElementById("proteinLabel");
let extraRiceBtn = document.getElementById("extraRiceBtn");
let riceCostLabel = document.getElementById("ricebotCost");
let perSecondLabel = document.getElementById("perSecondLabel");

friedChickenBtn.onclick = function(){
    protein += amountPerClick;
    proteinLabel.textContent = protein;
}
extraRiceBtn.onclick = function(){
    if(protein >= ricebotCost){
        riceBots++;
        protein -= ricebotCost;
        proteinLabel.textContent = protein;

        ricebotCost =1 + Math.floor(ricebotCost * 1.1 * ricebotCostMult);
    }
     proteinLabel.textContent = protein;
     riceCostLabel.textContent ="🍗" + ricebotCost;
}

setInterval(function() {
    botProduction += riceBots * ricebotMult;

     proteinLabel.textContent = protein;
     perSecond = riceBots * ricebotMult;
     perSecond = Math.round(perSecond * 10)/10;
     perSecondLabel.textContent = perSecond;
},1000);


setInterval(function() {
    if(botProduction >= 1){
        protein++;
        botProduction--;
        proteinLabel.textContent = Math.floot(protein);
    }
}, 200);
function saveGame(){
    let saveData = {
        protein: protein,
        riceBots: riceBots,
        ricebotCost: ricebotCost
    };
    localStorage.setItem("proteinClickerSave", JSON.stringify(saveData));
    lastPlayed: Date.now()
}
setInterval(saveGame, 5000);

function loadGame(){
    let savedGame = localStorage.getItem("proteinClickerSave");

    if(savedGame){
        let saveData = JSON.parse(savedGame);

        protein = saveData.protein || 0;
        riceBots = saveData.riceBots || 0;
        ricebotCost = saveData.ricebotCost || 15;

        proteinLabel.textContent = Math.floor(protein);
        riceCostLabel.textContent = "🍗" + ricebotCost;
    }
}
loadGame();

let now = Date.now();
let timePassed = (now - saveDate.lastPlayed) / 1000;

let offlineProduction = riceBots + ricebotMult * timePassed;

protein += offlineProduction;
let protein = 0;
let ricebotCost = 15;
let amountPerClick = 1;
let riceBots = 0;
let ricebotMult = 0.1;
let ricebotCostMult = 1.01;

let friedChickenBtn = document.getElementById("friedChickenBtn");
let proteinLabel = document.getElementById("proteinLabel");
let extraRiceBtn = document.getElementById("extraRiceBtn");
let riceCostLabel = document.getElementById("ricebotCost");
let perSecondLabel = document.getElementById("perSecondLabel");
let upgradesContainer = document.getElementById("upgradesContainer");

let upgrades = [
    {
        id: "doubleClick",
        name: "doubleClick",
        cost: 100,
        bought: false,
        effect: function(){
            amountPerClick *= 2;
        }
    },
    {
        id: "AA battery",
        name: "AA battery",
        cost: 100,
        bought: false,
        effect: function(){
            ricebotMult *= 2
        }
    },
    {
        id: "quadrupleClick",
        name: "quadrupleClick",
        cost: 500,
        bought: false,
        effect: function(){
            amountPerClick *= 2
        }
    },
    {
    id: "AAAA battery",
        name: "AAAA battery",
        cost: 500,
        bought: false,
        effect: function(){
            ricebotMult *= 2
        }
    }
]
function renderUpgrades(){
    if(!upgrades) return;
    upgradesContainer.innerHTML = "<h2>Upgrades</h2>";

    upgrades.forEach(upgrade => {
          if(!upgrade.bought){
            
            let btn = document.createElement("button")
            btn.className = "upgradeBtn";

            btn.innerHTML = `
    <div class="upgradeTitle">${upgrade.name}</div>
    <div class="upgradeCost">🍗${upgrade.cost}</div>
`;

            btn.onclick = function(){
                if(protein >= upgrade.cost){
                    protein -= upgrade.cost;
                    upgrade.bought = true;
                    upgrade.effect();
                    renderUpgrades();
                }
            }
            if(protein < upgrade.cost){btn.style.opacity = "0.5"}
            upgradesContainer.appendChild(btn);
        }
    });
}

friedChickenBtn.onclick = function(){
    protein += amountPerClick;
    proteinLabel.textContent = Math.floor(protein);
}
extraRiceBtn.onclick = function(){
    if(protein >= ricebotCost){
        riceBots++;
        protein -= ricebotCost;
        proteinLabel.textContent = protein;

        ricebotCost =1 + Math.floor(ricebotCost * 1.1 * ricebotCostMult);
        ricebotCostMult *= 1.01;
    }
     proteinLabel.textContent = Math.floor(protein);
     riceCostLabel.textContent ="🍗" + ricebotCost;
}
setInterval(function(){

    let production = riceBots * ricebotMult;

    protein += production;

    proteinLabel.textContent = Math.floor(protein);

    perSecondLabel.textContent = Math.round(production * 10) / 10;

    renderUpgrades();
},1000);
function saveGame(){
    let saveData = {
        protein: protein,
        riceBots: riceBots,
        ricebotCost: ricebotCost,
        lastPlayed: Date.now(),
        amountPerClick: amountPerClick,
        ricebotMult: ricebotMult,
        upgrades: upgrades
    };
    localStorage.setItem("proteinClickerSave", JSON.stringify(saveData));
    
}
setInterval(saveGame, 5000);

function loadGame(){
    let savedGame = localStorage.getItem("proteinClickerSave");

    if(savedGame){
        let saveData = JSON.parse(savedGame);

        protein = saveData.protein || 0;
        riceBots = saveData.riceBots || 0;
        ricebotCost = saveData.ricebotCost || 15;
        amountPerClick = saveData.amountPerClick || 1;
        ricebotMult = saveData.ricebotMult || 0.1;
        if(saveData.upgrades){
    upgrades = saveData.upgrades;
}
        upgrades.forEach(upgrade => {
        if(upgrade.id === "doubleClick"){
            upgrade.effect = function(){
                amountPerClick *= 2;
            }
        }
        if(upgrade.id === "AA battery"){
            upgrade.effect = function(){
                ricebotMult *= 2;
            }
        }
        if(upgrade.id === "quadrupleClick"){
            upgrade.effect = function(){
                amountPerClick *= 2;
            }
        }
        if(upgrade.id === "AAAA battery"){
            upgrade.effect = function(){
                ricebotMult *= 2;
            }
        }
    });
        let now = Date.now();
let timePassed = (now - saveData.lastPlayed) / 1000;

let offlineProduction = riceBots * ricebotMult * timePassed;

protein += offlineProduction;

        proteinLabel.textContent = Math.floor(protein);
        riceCostLabel.textContent = "🍗" + ricebotCost;
    }
}
loadGame();
renderUpgrades();
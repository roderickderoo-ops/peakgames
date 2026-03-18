let protein = 0;
let ricebotCost = 15;
let amountPerClick = 1;
let riceBots = 0;
let ricebotMult = 0.1;
let proteinShakerCost = 100; 
let proteinShakers = 0;
let proteinShakerMult = 1;
let ricebotCostMult = 1.01;
let tier1cost;

let friedChickenBtn = document.getElementById("friedChickenBtn");
let proteinLabel = document.getElementById("proteinLabel");
let extraRiceBtn = document.getElementById("extraRiceBtn");
let riceCostLabel = document.getElementById("ricebotCost");
let perSecondLabel = document.getElementById("perSecondLabel");
let upgradesContainer = document.getElementById("upgradesContainer");
let shopContainer = document.getElementById("shopContainer");

let buildings = [
    {
        id: "riceBots",
        name: "riceBots",
        getCost: () => ricebotCost,
        effect(){
            riceBots++;
            protein -= ricebotCost;
            ricebotCost =1 + Math.floor(ricebotCost * 1.1 * ricebotCostMult);
            ricebotCostMult *= 1.01;
            riceCostLabel.textContent ="🍗" + ricebotCost;
        }
    },
    {
        id: "proteinShaker3000",
        name: "proteinShaker3000",
        getCost:() => proteinShakerCost,
        effect(){
            proteinShakers++;
            protein -= proteinShakerCost;
            proteinShakerCost = Math.floor(proteinShakerCost * 1.15);
        }
    }
]

let upgrades = [
    {
        id: "clickTier1",
        name: "doubleClick",
        tier: 1,
        cost: 100,
        requirement: () => riceBots >= 1,
        bought: false,
        effect: function(){
            amountPerClick *= 2;
        }
    },
    {
        id: "clickTier2",
        name: "quadrupleClick",
        tier: 2,
        requirement: () => riceBots >= 5,
        cost: 500,
        bought: false,
        effect: function(){
            amountPerClick *= 2;
        }
    },
    {
        id: "clickTier3",
        name: "dr Octofinger",
        tier: 3,
        requirement: () => riceBots >= 25,
        cost: 1000,
        bought: false,
        effect: function(){
            amountPerClick *= 2;
        }
    },
    {
        id: "riceTier1",
        name: "AA battery",
        tier: 1,
        requirement: () => riceBots >= 1,
        cost: 100,
        bought: false,
        effect: function(){
            ricebotMult *= 2
        }
    },
    {
    id: "riceTier2",
        name: "AAAA battery",
        cost: 500,
        tier: 2,
        requirement: () => riceBots >= 5,
        bought: false,
        effect: function(){
            ricebotMult *= 2;
        }
    },
    {
        id: "2X Protein powder",
        name: "2X Protein powder",
        cost: 1500,
        requirement: () => proteinShakers >= 1,
        bought: false,
        effect(){
            proteinShakerMult *= 2;
        }
    }
]
function renderBuildings(){
    shopContainer.innerHTML = "<h2>Shop</h2>";

    buildings.forEach(building => {
        let btn = document.createElement("button");
        let cost = building.getCost();
        btn.className = "buildingBtn";
        let count = building.id === "riceBots" ? riceBots : proteinShakers;

        btn.innerHTML = `
        <div class="buildingTitle">${building.name} (${count})</div>
        <div class="buildingCost">🍗${cost}</div>
        `;

        btn.onclick = function(){
            if(protein >= cost){
                building.effect();
                renderBuildings();
            }
        }
        if(protein < cost){btn.style.opacity = "0.5"}
            shopContainer.appendChild(btn);
    })
}

function renderUpgrades(){
    if(!upgrades) return;
    upgradesContainer.innerHTML = "<h2>Upgrades</h2>";

    upgrades.forEach(upgrade => {
        if(upgrade.requirement && !upgrade.requirement()){
        return;
        }

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
setInterval(function(){

    let production = (riceBots * ricebotMult) + (proteinShakers * proteinShakerMult);

    protein += production;

    proteinLabel.textContent = Math.floor(protein);

    perSecondLabel.textContent = Math.round(production * 10) / 10;

    renderUpgrades();
    renderBuildings();
},1000);
function saveGame(){
    let saveData = {
        protein: protein,
        riceBots: riceBots,
        ricebotCost: ricebotCost,
        lastPlayed: Date.now(),
        amountPerClick: amountPerClick,
        ricebotMult: ricebotMult,
        upgrades: upgrades,
        proteinShakers: proteinShakers,
        proteinShakerMult: proteinShakerMult
    };
    localStorage.setItem("proteinClickerSave", JSON.stringify(saveData));
    
}
setInterval(saveGame, 5000);

function loadGame(){
    let savedGame = localStorage.getItem("proteinClickerSave");

    if(savedGame){
        let saveData = JSON.parse(savedGame);
    }
        protein = saveData.protein || 0;
        riceBots = saveData.riceBots || 0;
        ricebotCost = saveData.ricebotCost || 15;
        amountPerClick = saveData.amountPerClick || 1;
        ricebotMult = saveData.ricebotMult || 0.1;
        if(saveData.upgrades){
    upgrades = saveData.upgrades;
    proteinShakers = saveData.proteinShakers || 0;
    proteinShakerMult = saveData.proteinShakerMult || 1;
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
        if(upgrade.id === "2X Protein powder"){
    upgrade.effect = function(){
        proteinShakerMult *= 2;
    }
}
    });
        let now = Date.now();
let timePassed = (now - saveData.lastPlayed) / 1000;

let offlineProduction = ((riceBots * ricebotMult) + (proteinShakers * proteinShakerMult)) * timePassed;

protein += offlineProduction;

        proteinLabel.textContent = Math.floor(protein);
        riceCostLabel.textContent = "🍗" + ricebotCost;
    }
}
loadGame();
renderUpgrades();
renderBuildings();
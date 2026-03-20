let protein = 0;
let ricebotCost = 15;
let amountPerClick = 1;
let riceBots = 0;
let ricebotMult = 0.1;
let proteinShakerCost = 100; 
let proteinShakers = 0;
let proteinShakerMult = 1;
let ricebotCostMult = 1.01;
let factories = 0;
let factorieCost = 1500;
let factorieMult = 8;

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
            ricebotCost =1 + Math.floor(ricebotCost * 1.15);
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
    },
    {
        id: "factories",
        name: "factories",
        getCost:() => factorieCost,
        effect(){
            factories++;
            protein -= factorieCost;
            factorieCost = Math.floor(factorieCost * 1.15);
        }
    }
]

let upgrades = [
    {
        id: "clickTier1",
        name: "doubleClick",
        tier: 1,
        title: "Your mouse gets twice as strong",
        cost: 100,
        requirement: () => riceBots >= 1,
        bought: false,
        effect: function(){
            amountPerClick *= 2;
        }
    },
    {
        id: "clickTier2",
        name: "ambidextrous",
        tier: 2,
        title: "Your mouse gets twice as strong again",
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
        title: "Your mouse gets twice as strong again",
        requirement: () => riceBots >= 25,
        cost: 1000,
        bought: false,
        effect: function(){
            amountPerClick *= 2;
        }
    },
    {
        id: "riceTier1",
        name: "Temu batteries",
        tier: 1,
        title: "Doubles the speed of the ricebots",
        requirement: () => riceBots >= 1,
        cost: 100,
        bought: false,
        effect: function(){
            ricebotMult *= 2
        }
    },
    {
    id: "riceTier2",
        name: "E-bay batteries",
        cost: 500,
        tier: 2,
        title: "Doubles the speed of the ricebots again",
        requirement: () => riceBots >= 5,
        bought: false,
        effect: function(){
            ricebotMult *= 2;
        }
    },
    {
        id: "riceTier3",
        name: "nuclear batteries",
        cost: 10000,
        tier: 3,
        title: "Triples the speed of the ricebots ",
        requirement: () => riceBots >=25,
        bought: false,
        effect: function(){
            ricebotMult *= 3;
        }
    },
    {
        id: "shakerTier1",
        name: "2X Protein powder",
        cost: 500,
        title: "Doubles shaker output",
        requirement: () => proteinShakers >= 1,
        bought: false,
        effect(){
            proteinShakerMult *= 2;
        }
    },
    {
        id: "shakerTier2",
        name: "I CAN'T HIT MY PROTEIN",
        cost: 1000,
        title: "500 PROTEIN SHAKES (2X output)",
        requirement: () => proteinShakers >= 5,
        bought: false,
        effect(){
            proteinShakerMult *= 2;
        }
    },
    {
        id: "shakerTier3",
        name: "Nuclear protein shakers",
        cost: 10000,
        title: "Triples shaker output",
        requirement: () => proteinShakers >= 25,
        bought: false,
        effect(){
            proteinShakerMult *= 3;
        }
    },
    {
        id: "factoriesTier1",
        name: "Child labor",
        cost: 5500,
        title: "cheap workforce(2X factory speed)",
        requirement: () => factories >= 1,
        bought: false,
        effect(){
            factorieMult *= 2;
        }
    }
]
function renderBuildings(){
    shopContainer.innerHTML = "<h2>Shop</h2>";

    buildings.forEach(building => {
        let btn = document.createElement("button");
        let cost = building.getCost();
        btn.className = "buildingBtn";
        let count;
        if(building.id === "riceBots"){
            count = riceBots;
        }else if(building.id === "proteinShaker3000"){
            count = proteinShakers
        }else if(building.id === "factories"){
            count = factories
        }
        

        btn.innerHTML = `
        <div class="buildingTitle">${building.name} (${count})</div>
        <div class="buildingCost">🍗${formatNumber(cost)}</div>
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
    <div class="upgradeTitle" title="${upgrade.title}">${upgrade.name}</div>
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
    proteinLabel.textContent = formatNumber(protein);
}
setInterval(function(){

    let production = (riceBots * ricebotMult) + (proteinShakers * proteinShakerMult) + (factories * factorieMult);

    protein += production;

    proteinLabel.textContent = formatNumber(protein);

    perSecondLabel.textContent = formatNumber(production);

    renderUpgrades();
    renderBuildings();
},1000);
function saveGame(){
    let saveData = {
        protein: protein,
        riceBots: riceBots,
        ricebotCost: ricebotCost,
        ricebotMult: ricebotMult,

        proteinShakers: proteinShakers,
        proteinShakerCost: proteinShakerCost,
        proteinShakerMult: proteinShakerMult,

        factories: factories,
        factorieCost: factorieCost,

        amountPerClick: amountPerClick,

        upgrades: upgrades,

        lastPlayed: Date.now()
    };

    localStorage.setItem("proteinClickerSave", JSON.stringify(saveData));
}
setInterval(saveGame, 5000);

function loadGame(){
    let savedGame = localStorage.getItem("proteinClickerSave");

    if(!savedGame) return;

    let saveData = JSON.parse(savedGame);

    // 💾 LOAD BASIC STATS
    protein = saveData.protein || 0;

    riceBots = saveData.riceBots || 0;
    ricebotCost = saveData.ricebotCost || 15;
    ricebotMult = saveData.ricebotMult || 0.1;

    proteinShakers = saveData.proteinShakers || 0;
    proteinShakerCost = saveData.proteinShakerCost || 100;
    proteinShakerMult = saveData.proteinShakerMult || 1;

    factories = saveData.factories || 0;
    factorieCost = saveData.factorieCost || 1500;

    amountPerClick = saveData.amountPerClick || 1;

    // 💾 LOAD UPGRADES
    if(saveData.upgrades){
        upgrades = saveData.upgrades;
    }

    // 🔧 RESTORE UPGRADE EFFECT FUNCTIONS
    upgrades.forEach(upgrade => {

        if(upgrade.id === "clickTier1"){
            upgrade.effect = () => amountPerClick *= 2;
        }
        if(upgrade.id === "clickTier2"){
            upgrade.effect = () => amountPerClick *= 2;
        }
        if(upgrade.id === "clickTier3"){
            upgrade.effect = () => amountPerClick *= 2;
        }

        if(upgrade.id === "riceTier1"){
            upgrade.effect = () => ricebotMult *= 2;
        }
        if(upgrade.id === "riceTier2"){
            upgrade.effect = () => ricebotMult *= 2;
        }
        if(upgrade.id === "riceTier3"){
            upgrade.effect = () => ricebotMult *= 3;
        }

        if(upgrade.id === "shakerTier1"){
            upgrade.effect = () => proteinShakerMult *= 2;
        }
        if(upgrade.id === "shakerTier2"){
            upgrade.effect = () => proteinShakerMult *= 2;
        }
        if(upgrade.id === "shakerTier3"){
            upgrade.effect = () => proteinShakerMult *= 3;
        }
    });

    // ⏱️ OFFLINE PROGRESS
    if(saveData.lastPlayed){
        let now = Date.now();
        let timePassed = (now - saveData.lastPlayed) / 1000;

        let production =
            (riceBots * ricebotMult) +
            (proteinShakers * proteinShakerMult) +
            (factories * factorieMult);

        protein += production * timePassed;
    }

    // 🖥️ UPDATE UI
    proteinLabel.textContent = formatNumber(protein);
    riceCostLabel.textContent = "🍗" + formatNumber(ricebotCost);
}
function formatNumber(num){
    if(num >= 1e9){return(num/ 1e9).toFixed(1)} + "B"
    if(num >= 1e6){return(num/ 1e6).toFixed(1)} + "M"
    if(num >= 1e3){return(num/ 1e3).toFixed(1)} + "K"
    return Math.floor(num);
}
loadGame();
renderUpgrades();
renderBuildings();
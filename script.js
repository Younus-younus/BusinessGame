const properties = [
    'property1', 'property2', 'property3', 'property4',
    'property5', 'property6', 'property7', 'property8', 'property9',
    'property10', 'property12', 'property13', 'property14',
    'property15', 'property16', 'property17', 'property18', 'property19',
    'property20', 'property21', 'property23', 'property24',
    'property25', 'property26', 'property27', 'property28', 'property29',
    'property30', 'property31', 'property32', 'property33', 'property34',
    'property35', 'property36', 'property37'
];
const money = [
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
  '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 
  '20', '21', '22', '23', '24', '25' , '26','27','28','29','30','31','32',
  '33','34'
];


let money1 = document.getElementById("money1");
let money2 = document.getElementById("money2");
let diceRolling1 = document.getElementById('roll-dice');
let diceRolling2 = document.getElementById('roll-dice2');
let buyProperty  = document.getElementById("buy-property");
let start = document.getElementById("start");
let buy1 = document.getElementById("buy-property");
let buy2 = document.getElementById("buy-property2");
let noBuy1 = document.getElementById("no-property1");
let noBuy2 = document.getElementById("no-property2");
let blueProperty = [];
let redProperty = [];
let diceRoll;
let log = document.querySelector(".log");

const propertyRent = {
    Goa: { rent: 400},
    Boat: { rent: 0},
    Cochin: { rent: 300},
    Mysore: { rent: 200},
    Bengaluru: { rent: 400},
    Chennai: { rent: 600},
    Hyderabad: { rent: 200},
    Kolkata: { rent: 300},
    Airindia: { rent: 1200},
    Darjeeliing: { rent: 200},
    Patna: { rent: 150},
    Kanpur: { rent: 300},
    Agra: { rent: 500},
    Shrinagar: { rent: 250},
    Amritsar: { rent: 200},
    Shimla: { rent: 250},
    Best: { rent: 650},
    Electronics: { rent: 0},
    Chandigadh: { rent: 300},
    NewDelhi: { rent: 750},
    Jaipur: { rent: 350},
    Indore: { rent: 200},
    Ahmedabad: { rent: 400},
    Railway: { rent: 1400},
    WaterWorks: { rent: 600},
    Mumbai: { rent: 850},
};

let playerPositions = {
    player1: 0,
    player2: 0
};

document.getElementById("start").addEventListener('click', () => {
    diceRolling1.style.display = "block";
    diceRolling2.style.display = "block";
    diceRolling1.style.boxShadow = " 0 0 5px white";
    diceRolling2.disabled = true;
    start.style.display = "none";
    document.getElementById("player1").style.boxShadow = " 0 0 5px white";
    log.style.display = "block";
});

diceRolling1.addEventListener('click', () => {
    diceRoll = Math.floor(Math.random() * 6) + 1;
    diceRolling2.disabled = false;
    diceRolling1.disabled = true;
    let diceface = getDiceFace(diceRoll);
    diceRolling1.innerHTML = diceface;
    diceRolling2.innerHTML = "🎲";
    diceRolling1.style.boxShadow = " 0 0 5px black";
    diceRolling2.style.boxShadow = " 0 0 5px white";
    
    buy1.innerText = "Buy Property";
    buy1.style.display = "block";
    buy2.style.display = "none";
    noBuy2.style.display = "block";
    noBuy1.style.display = "none";

    document.getElementById("player2").style.boxShadow = " 0 0 5px white";
    document.getElementById("player1").style.boxShadow = " 0 0 5px rgba(0,0,0,0.3)";

    movePlayer1('player1', diceRoll);

        //check number if six
        if(diceRoll == 6) {
            diceRolling1.disabled = false;
            diceRolling2.disabled = true;
            diceRolling1.style.boxShadow = " 0 0 5px white";
            diceRolling2.style.boxShadow = " 0 0 5px black";
        }
});
diceRolling2.addEventListener('click', () => {
    diceRoll = Math.floor(Math.random() * 6) + 1;
    diceRolling1.disabled = false;
    diceRolling2.disabled = true;
    let diceface = getDiceFace(diceRoll);
    diceRolling1.style.boxShadow = " 0 0 5px white";
    diceRolling2.style.boxShadow = " 0 0 5px black";
    diceRolling2.innerHTML = diceface;
    diceRolling1.innerHTML = "🎲";

    buy2.innerText = "Buy Property";
    buy1.style.display = "none";
    buy2.style.display = "block";
    noBuy2.style.display = "none";
    noBuy1.style.display = "block";

    document.getElementById("player1").style.boxShadow = " 0 0 5px white";
    document.getElementById("player2").style.boxShadow = " 0 0 5px rgba(0,0,0,0.3)";

    movePlayer2('player2', diceRoll);

    //check number if six
    if(diceRoll == 6) {
        diceRolling2.disabled = false;
        diceRolling1.disabled = true;
        diceRolling1.style.boxShadow = " 0 0 5px black";
        diceRolling2.style.boxShadow = " 0 0 5px white";
    }
});

function movePlayer1(player, steps) {
    let previousPosition = playerPositions[player];
    let newPosition = (previousPosition + steps) % properties.length;
    playerPositions[player] = newPosition;
    updatePlayerPosition1(player, previousPosition);
    checkRent(newPosition,player);
}

function updatePlayerPosition1(player, previousPosition) {
    const propertyId = properties[playerPositions[player]];
     // Remove existing marker
     document.querySelectorAll('.player-marker1').forEach(marker => marker.remove());

     //add new marker
     const propertyElement = document.getElementById(propertyId);
     const marker = document.createElement('div');
     marker.classList.add('player-marker1', player);
     marker.innerHTML = '<i class="fa-solid fa-person"></i>';
     propertyElement.appendChild(marker);

    check(propertyId, player, previousPosition);
}
function movePlayer2(player, steps) {
    let previousPosition = playerPositions[player];
    let newPosition = (previousPosition + steps) % properties.length;
    playerPositions[player] = newPosition;
    updatePlayerPosition2(player, previousPosition);
    checkRent(newPosition,player);
}

function updatePlayerPosition2(player, previousPosition) {
    const propertyId = properties[playerPositions[player]];

    // Remove existing marker
    document.querySelectorAll('.player-marker2').forEach(marker => marker.remove());

    //add new marker
    const propertyElement = document.getElementById(propertyId);
    const marker = document.createElement('div');
    marker.classList.add('player-marker2', player);
    propertyElement.appendChild(marker);
    marker.innerHTML = '<i class="fa-solid fa-person"></i>';
    check2(propertyId, player, previousPosition);
}

// Checking property position
function check(property, player, previousPosition) {
    let currentMoney1 = parseInt(money1.innerText); // Convert innerText to number
    let updatedMoney1 = currentMoney1;
    let currentMoney2 = parseInt(money2.innerText); // Convert innerText to number of peron 2 money
    let updatedMoney2 = currentMoney2;

    if(money1.innerText < 0 && playerPositions[player] < previousPosition) {
        let loss= document.getElementById('player-info');
        loss.style.display = "none";
        let winner = document.createElement("h2");
        winner.innerText = "Player 2 won the Game"
        document.querySelector("h1").appendChild(winner);
        let looser = document.createElement("div");
        looser.innerText = "Player 1 Lost the game, as he is running losses and not able to recover";
        looser.style.fontSize = "20px";
        document.querySelector("h1").appendChild(looser);
        const log1 = document.getElementById('messageBox');
        log1.style.display = "none";
        log.style.display = "none";
    } else if(playerPositions[player] < previousPosition) {
            updatedMoney1 += 1500;
            logEvent("You have paid 1500rp as you completed a round");
        }

    if (property === properties[8]) {
        updatedMoney1 += 100;
        updatedMoney2 -= 100;
        logEvent("you have to Collect 100rp from your opponent");
    } else if (property === properties[17]) {
        updatedMoney1 -= 100;
        updatedMoney2 += 100;
        logEvent("you have to pay 100rp to your opponent");
    } else if (property === properties[26]) {
        updatedMoney1 -= 500;
        logEvent("You are arrested! you have to pay fine of 500rp");
    }

    money1.innerText = updatedMoney1;
    money2.innerText = updatedMoney2; // Update the displayed money

    if(property === properties[6]) {
        checkChest('money1');
    } else if(property === properties[19]) {
        checkChestOdd('money1');
    } else if(property === properties[15]) {
        checkChanceOdd('money1');
    } else if(property === properties[28]) {
        checkChance('money1');
    }
    if(redProperty.length != 0 && property === properties[4] || property === properties[30]) {
        updatedMoney1 -= 500;
        money1.innerText = updatedMoney1;
        console.log(updatedMoney1);
        logEvent("pay tax's for the bank");
    }
}


// Checking property position of second player
function check2(property, player, previousPosition) {
    let currentMoney2 = parseInt(money2.innerText); // Convert innerText to number
    let updatedMoney2 = currentMoney2;
    let currentMoney1 = parseInt(money1.innerText); // Convert innerText to number
    let updatedMoney1 = currentMoney1;

    if(money2.innerText < 0 && playerPositions[player] < previousPosition) {
        logEvent("You Lost the game, as you running losses and you are not able to pay this");
        let loss= document.getElementById('player-info');
            loss.style.display = "none";
        let winner = document.createElement("h2");
        winner.innerText = "Player 1 won the Game"
        document.querySelector("h1").appendChild(winner);
        let looser = document.createElement("div");
        looser.innerText = "Player 2 Lost the game, as he is running losses and not able to recover";
        looser.style.fontSize = "20px";
        document.querySelector("h1").appendChild(looser);
        const log1 = document.getElementById('messageBox');
        log1.style.display = "none";
        log.style.display = "none";
    } else if(playerPositions[player] < previousPosition) {
        updatedMoney2 += 1500;
        logEvent("You have paid 1500rp as you completed a round");
    }

    if (property === properties[8]) {
        updatedMoney2 += 100;
        updatedMoney1 -= 100;
        logEvent("you have to Collect 100rp from your opponent");
    } else if (property === properties[17]) {
        updatedMoney2 -= 100;
        updatedMoney1 += 100;
        logEvent("you have to pay 100rp to your opponent");
    } else  if (property === properties[26]) {
        updatedMoney2 -= 500;
        logEvent("You are arrested! you have to pay fine of 500rp");
    }

    money1.innerText = updatedMoney1;  // Update the displayed money
    money2.innerText = updatedMoney2;

    if(property === properties[6]) {
        checkChest('money2');
    } else if(property === properties[19]) {
        checkChestOdd('money2')
    } else if(property === properties[15]) {
        checkChanceOdd('money2');
    } else if(property === properties[28]) {
        checkChance('money2');
    }

    if(blueProperty.length != 0 && property === properties[4] || property === properties[30]){
        updatedMoney2 -= 500;
        money2.innerText = updatedMoney2;
        console.log(updatedMoney1);
        logEvent("pay tax's for the bank");
    }
}

//check odd and event
function checkChest(money) {
    let player_money = parseInt(document.getElementById(money).innerText);
    let update_money = player_money;
    console.log(diceRoll)
    if (diceRoll % 2 === 0) {
        if (diceRoll === 2) {
            update_money += 1000;
            logEvent("You have collected 1000rp from the lottery you won by buying a washing machine");
        } else if (diceRoll === 4) {
            update_money += 500;
            logEvent("You have collected 500rp from a TV show");
        } else if (diceRoll === 6) {
            update_money += 3000;
            logEvent("You have collected 3000rp as a gift from the bank");
        }
    } else {
        logEvent("You should get even number for benefit");
    }
    document.getElementById(money).innerText = update_money.toString();
    console.log(update_money);
}
function checkChestOdd(money) {
    let player_money = parseInt(document.getElementById(money).innerText);
    let update_money = player_money;
    if (diceRoll % 2 === 0) {
        logEvent("You just escaped from loss");
    } else {
        if (diceRoll === 1) {
            update_money -= 1500;
            logEvent("You have to pay 1500rp for all your recoveries");
        } else if (diceRoll === 3) {
            update_money -= 3000;
            logEvent("You have to pay 3000rp for the bank to keep your Limit");
        } else if (diceRoll === 5) {
            update_money -= 1500;
            logEvent("You have to recover you losses by paying 1500rp");
        }
    }
    document.getElementById(money).innerText = update_money.toString();
}
//... similar for checkChance and checkChanceOdd

//Chance checking rules
function checkChanceOdd(money) {
    let player_money = parseInt(document.getElementById(money).innerText);
    let update_money = player_money;
    console.log(player_money);
    if (diceRoll % 2 === 0) {
        if (diceRoll === 2) {
            update_money += 500;
            logEvent("You have collected 500rp from the lottery you won by buying a washing machine");
        } else if (diceRoll === 4) {
            update_money += 2000;
            logEvent("You have collected 2000rp from a TV show");
        } else if (diceRoll === 6) {
            update_money += 1000;
            logEvent("You have collected 1000rp as a gift from the bank");
        }
    } else {
        logEvent("You should get even number for benefit");
    }
    document.getElementById(money).innerText = update_money;
}

function checkChance(money) {
    let player_money = parseInt(document.getElementById(money).innerText);
    let update_money = player_money;
    if (diceRoll % 2 === 0) {
        logEvent("You just escaped from loss");
    } else {
        if (diceRoll === 1) {
            update_money -= 1500;
            logEvent("You have to pay 1500rp for all your recoveries");
        } else if (diceRoll === 3) {
            update_money -= 3000;
            logEvent("You have to pay 3000rp for the bank to keep your Limit");
        } else if (diceRoll === 5) {
            update_money -= 1500;
            logEvent("You have to recover you losses by paying 1500rp");
        }
    }
    document.getElementById(money).innerText = update_money;
}


//buy property
buy1.addEventListener("click", () => {
    handleBuy1('player1');
});

buy2.addEventListener("click", () => {
    handleBuy2('player2');
});

function handleBuy1(player) {
    let positions = playerPositions[player];
    let propertyIndex = properties.indexOf(properties[positions]);
    let propertyId = parseInt(money[propertyIndex]);
    let propertyMoney = document.querySelector(`.Money${propertyId}`).innerText;
    const propertyElement = document.getElementById(properties[propertyId]);
    const House = propertyElement.querySelector('.card-text').innerText;
    let playerMoney = money1.innerText;
    console.log(propertyId);
    console.log(propertyIndex);
    console.log(propertyMoney)
    console.log(playerMoney);
    if(isNumeric(propertyMoney)) {
        if(propertyId == propertyIndex) {
            if (playerMoney >= propertyMoney) {
                let updatedMoney = playerMoney - propertyMoney;
                money1.innerText = updatedMoney;
                redProperty.push(propertyId);
                document.querySelector(`.Money${propertyId}`).innerText = "Red's";
                logEvent(`${player} bought ${House} for ${propertyMoney}`);
            } else {
               alert("Not Enough Money");
            }
        } else {
            console.log("invalid property");
        }
    } else {
        alert("Already Sold");
    }
}
function handleBuy2(player) {
    let positions = playerPositions[player];
    let propertyIndex = properties.indexOf(properties[positions]);
    let propertyId = parseInt(money[propertyIndex]);
    let propertyMoney = document.querySelector(`.Money${propertyId}`).innerText;
    const propertyElement = document.getElementById(properties[propertyId]);
    const House = propertyElement.querySelector('.card-text').innerText;
    let playerMoney = money2.innerText;
    console.log(propertyId);
    console.log(propertyIndex);
    console.log(propertyMoney)
    console.log(playerMoney);

    if(isNumeric(propertyMoney)) {
        if(propertyId == propertyIndex) {
            if (playerMoney >= propertyMoney) {
                let updatedMoney = playerMoney - propertyMoney;
                money2.innerText = updatedMoney;
                blueProperty.push(propertyId);
                document.querySelector(`.Money${propertyId}`).innerText = "Blue's";
                logEvent(`${player} bought ${House} for ${propertyMoney}`);
            } else {
                alert("Not Enough Money");
            }
        } else {
            console.log("invalid property");
        }
    } else {
        alert("You Can't Buy the Property");
}
}

//check if the player has to pay rent and wealth tax
function checkRent(propertyId, player) {
    // Calculate rent for special properties based on dice roll
    propertyRent.Boat.rent = diceRoll * 200;
    propertyRent.Electronics.rent = diceRoll * 100;


    // Get property money ownership info
    let propertyMoney = document.querySelector(`.Money${propertyId}`).innerText;
    const propertyElement = document.getElementById(properties[propertyId]);
    let update_money2 = parseInt(money2.innerText);
    let update_money1 = parseInt(money1.innerText);

    if (propertyMoney === "Red's" && player === 'player2') {
        const rentHouse = propertyElement.querySelector('.card-text').innerText;
        const houseRent = propertyRent[rentHouse].rent;
        update_money2 -= houseRent;
        update_money1 += houseRent;
        money2.innerText = update_money2;
        money1.innerText = update_money1;
        logEvent(`you paid ${houseRent} as a rent for Player 1`);
    }
    if (propertyMoney === "Blue's" && player === 'player1') {
        const rentHouse = propertyElement.querySelector('.card-text').innerText;
        const houseRent = propertyRent[rentHouse].rent;
        update_money1 -= houseRent;
        update_money2 += houseRent;
        money1.innerText = update_money1;
        money2.innerText = update_money2;
        logEvent(`you paid ${houseRent} as a rent for Player 2`);
    }
    if (propertyMoney === "Red's" && player === 'player1') {
        buy1.disabled = false;
        buy1.innerText = "Buying A house?";
    }
    if (propertyMoney === "Blue's" && player === 'player2') {
        buy2.disabled = false;
        buy2.innerText = "Buying A house?";
    }
}


function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

//dice script
function getDiceFace(number) {
    var faces = [
        '<i class="fa-solid fa-dice-one"></i>', // Unicode for dice face 1
        '<i class="fa-solid fa-dice-two"></i>', // Unicode for dice face 2
        '<i class="fa-solid fa-dice-three"></i>', // Unicode for dice face 3
        '<i class="fa-solid fa-dice-four"></i>', // Unicode for dice face 4
        '<i class="fa-solid fa-dice-five"></i>', // Unicode for dice face 5
        '<i class="fa-solid fa-dice-six"></i>'  // Unicode for dice face 6
    ];
    return faces[number - 1];
}

//message box
function logEvent(message) {
    const log = document.getElementById('messageBox');
    log.innerText = message;
}
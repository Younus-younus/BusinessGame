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

let playerPositions = {
    player1: 0,
    player2: 0
};
let diceRoll;

document.getElementById("start").addEventListener('click', () => {
    diceRolling1.style.display = "block";
    diceRolling2.style.display = "block";
    diceRolling1.style.boxShadow = " 0 0 5px white";
    diceRolling2.disabled = true;
    start.style.display = "none"
    document.getElementById("player1").style.boxShadow = " 0 0 5px white";
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

    buy1.style.display = "block";
    buy2.style.display = "none";
    noBuy2.style.display = "block";
    noBuy1.style.display = "none";

    document.getElementById("player2").style.boxShadow = " 0 0 5px white";
    document.getElementById("player1").style.boxShadow = " 0 0 5px rgba(0,0,0,0.3)";

    movePlayer1('player1', diceRoll);
    logEvent(`Player 1 rolled a ${diceRoll}`);

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

    buy1.style.display = "none";
    buy2.style.display = "block";
    noBuy2.style.display = "none";
    noBuy1.style.display = "block";

    document.getElementById("player1").style.boxShadow = " 0 0 5px white";
    document.getElementById("player2").style.boxShadow = " 0 0 5px rgba(0,0,0,0.3)";

    movePlayer2('player2', diceRoll);
    logEvent(`Player 2 rolled a ${diceRoll}`);

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

    // If player has completed a round
    if (playerPositions[player] < previousPosition) {
        updatedMoney1 += 1500;
    }

    if (property === properties[8]) {
        updatedMoney1 += 100;
        updatedMoney2 -= 100;
    } else if (property === properties[18]) {
        updatedMoney1 -= 100;
        updatedMoney2 += 100;
    } else if (property === properties[28]) {
        updatedMoney1 -= 500;
    } else if(property === properties[6]) {
        checkChest('money1');
    } else if(property === properties[19]) {
        checkChestOdd('money1');
    }
    money1.innerText = updatedMoney1;
    money2.innerText = updatedMoney2; // Update the displayed money
}


// Checking property position of second player
function check2(property, player, previousPosition) {
    let currentMoney2 = parseInt(money2.innerText); // Convert innerText to number
    let updatedMoney2 = currentMoney2;
    let currentMoney1 = parseInt(money1.innerText); // Convert innerText to number
    let updatedMoney1 = currentMoney1;

    // If player has completed a round
    if (playerPositions[player] < previousPosition) {
        updatedMoney2 += 1500;
    }

    if (property === properties[8]) {
        updatedMoney2 += 100;
        updatedMoney1 -= 100;
    } else if (property === properties[18]) {
        updatedMoney2 -= 100;
        updatedMoney1 += 100;
    } else if (property === properties[28]) {
        updatedMoney2 -= 500;
    } else if(property === properties[6]) {
        checkChest('money2');
    } else if(property === properties[19]) {
        checkChestOdd('money2')
    }
    money1.innerText = updatedMoney1;
    money2.innerText = updatedMoney2; // Update the displayed money
}

//community chest checking rules
function checkChest(money) {
    let player_money = document.getElementById(money).innerText;
    let update_money;
    console.log(player_money);
    if(diceRoll % 2 == 0 ) {
        if(diceRoll == 2) {
             update_money = player_money + 1000;
             player_money = update_money.innerText;
        } else if(diceRoll == 4) {
            update_money = player_money + 500;     
            player_money = update_money.innerText;       
        }
        else if(diceRoll == 6) {
            update_money = player_money + 3000;
            player_money = update_money.innerText;
        }
    }
    else {
        console.log("You should get even number for benefit");
    }
}
function checkChestOdd(money) {
    let player_money = document.getElementById(money).innerText;
    let update_money;
    if(diceRoll % 2 == 0 ) {
        console.log("You just escaped from loss");
    }
    else {
        if(diceRoll == 1) {
            update_money = player_money - 1500;
            player_money = update_money.innerText;
        } else if(diceRoll == 3) {
            update_money = player_money - 3000;
            player_money = update_money.innerText;
        }
        else if(diceRoll == 5) {
            update_money = player_money - 1500;
            player_money = update_money.innerText;
        }
    }
}


function logEvent(message) {
    const log = document.getElementById('log');
    const logItem = document.createElement('li');
    logItem.textContent = message;
    log.appendChild(logItem);
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
                document.querySelector(`.Money${propertyId}`).innerText = "Red's";
                logEvent(`${player} bought ${properties[positions]} for ${propertyMoney}`);
            } else {
                console.log("Not enough money to buy the property");
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
                document.querySelector(`.Money${propertyId}`).innerText = "Blue's";
                logEvent(`${player} bought ${properties[positions]} for ${propertyMoney}`);
            } else {
                console.log("Not enough money to buy the property");
            }
        } else {
            console.log("invalid property");
        }
    } else {
        alert("Already Sold");
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
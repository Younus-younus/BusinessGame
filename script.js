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

let money1 = document.getElementById("money1");
let money2 = document.getElementById("money2");
let diceRolling1 = document.getElementById('roll-dice');
let diceRolling2 = document.getElementById('roll-dice2');
let buyProperty  = document.getElementById("buy-property");
let start = document.getElementById("start");

let playerPositions = {
    player1: 0,
    player2: 0
};

document.getElementById("start").addEventListener('click', () => {
    diceRolling1.style.display = "block";
    buyProperty.style.display = "block";
    start.style.display = "none"
    document.getElementById("player1").style.boxShadow = " 0 0 5px white";
});

diceRolling1.addEventListener('click', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    movePlayer1('player1', diceRoll);
    logEvent(`Player 1 rolled a ${diceRoll}`);
    diceRolling1.style.display = "none";
    diceRolling2.style.display = "block";
    document.getElementById("player2").style.boxShadow = " 0 0 5px white";
    document.getElementById("player1").style.boxShadow = " 0 0 5px rgba(0,0,0,0.3)";
});
diceRolling2.addEventListener('click', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    movePlayer2('player2', diceRoll);
    logEvent(`Player 2 rolled a ${diceRoll}`);
    diceRolling2.style.display = "none";
    diceRolling1.style.display = "block";
    document.getElementById("player1").style.boxShadow = " 0 0 5px white";
    document.getElementById("player2").style.boxShadow = " 0 0 5px rgba(0,0,0,0.3)";
});

function movePlayer1(player, steps) {
    let previousPosition = playerPositions[player];
    let newPosition = (previousPosition + steps) % properties.length;
    playerPositions[player] = newPosition;
    updatePlayerPosition1(player, previousPosition);
}

function updatePlayerPosition1(player, previousPosition) {
    const propertyId = properties[playerPositions[player]];
    document.getElementById(`${player}-position`).textContent = propertyId;

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
    document.getElementById(`${player}-position`).textContent = propertyId;

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
    }
    money1.innerText = updatedMoney1;
    money2.innerText = updatedMoney2; // Update the displayed money
}

function logEvent(message) {
    const log = document.getElementById('log');
    const logItem = document.createElement('li');
    logItem.textContent = message;
    log.appendChild(logItem);
}

//navbar

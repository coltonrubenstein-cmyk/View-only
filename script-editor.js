// Editable tier list for collaborators
let players = []; // Start empty, fetch from JSON if needed

// Load initial data manually (can fetch from players.json if on a server)
async function loadPlayers() {
    const url = 'https://github.com/coltonrubenstein-cmyk/Tier-list-for-comp-in-cheerio-tga/tree/main/main/players.json';
    try {
        const response = await fetch(url);
        players = await response.json();
        renderPlayers();
    } catch (err) {
        console.warn('Could not fetch initial data, starting empty');
    }
}

function renderPlayers() {
    const list = document.getElementById('playerList');
    list.innerHTML = '';
    players.forEach((player, i) => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (${player.role}) - ${player.points}`;
        li.style.color = player.role.toLowerCase() === "ground" ? "green" : "brown";

        // Buttons to adjust points
        const plus = document.createElement('button');
        plus.textContent = "+";
        plus.onclick = () => { adjustPoints(i, 1); };

        const minus = document.createElement('button');
        minus.textContent = "-";
        minus.onclick = () => { adjustPoints(i, -1); };

        // Button to remove player
        const remove = document.createElement('button');
        remove.textContent = "Remove";
        remove.onclick = () => { removePlayer(i); };

        li.appendChild(plus);
        li.appendChild(minus);
        li.appendChild(remove);

        list.appendChild(li);
    });
}

function addPlayer() {
    const name = document.getElementById('playerName').value;
    const role = document.getElementById('playerRole').value;
    const points = parseInt(document.getElementById('playerPoints').value) || 0;

    if (name && role) {
        players.push({name, role, points});
        renderPlayers();
        // Clear input fields
        document.getElementById('playerName').value = '';
        document.getElementById('playerRole').value = '';
        document.getElementById('playerPoints').value = '';
    }
}

function adjustPoints(index, delta) {
    players[index].points += delta;
    renderPlayers();
}

function removePlayer(index) {
    players.splice(index, 1);
    renderPlayers();
}

// Run on page load
loadPlayers();

let players = JSON.parse(localStorage.getItem('players') || '[]');

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

function addPlayer() {
    const name = document.getElementById('playerName').value;
    const role = document.getElementById('playerRole').value;
    if(name && role){
        players.push({name, role, points: 0});
        savePlayers();
        renderPlayers();
        document.getElementById('playerName').value = '';
        document.getElementById('playerRole').value = '';
    }
}

function adjustPoints(index, delta) {
    players[index].points += delta;
    savePlayers();
    renderPlayers();
}

function renderPlayers() {
    const list = document.getElementById('playerList');
    list.innerHTML = '';
    players.forEach((player, i) => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (${player.role}) - ${player.points}`;
        li.style.color = player.role.toLowerCase() === "ground" ? "green" : "brown";

        const plus = document.createElement('button');
        plus.textContent = "+";
        plus.onclick = () => adjustPoints(i, 1);

        const minus = document.createElement('button');
        minus.textContent = "-";
        minus.onclick = () => adjustPoints(i, -1);

        li.appendChild(plus);
        li.appendChild(minus);
        list.appendChild(li);
    });
}

renderPlayers();

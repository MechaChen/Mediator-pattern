const playerDirector = (function() {
    const players = {};
    const operations = {};

    operations.addPlayer = (player) => {
        const teamColor = player.teamColor;

        if (!players[teamColor]) {
            players[teamColor] = [];
        }

        players[teamColor].push(player);
    }

    operations.removePlayer = (curPlayer) => {
        const teammates = players[curPlayer.teamColor] || [];

        teammates = teammates.filter(
            (teammate) => teammate !== curPlayer
        );
    }

    operations.changeTeam = (curPlayer, newTeamColor) => {
        operations.removePlayer(curPlayer);
        curPlayer.teamColor = newTeamColor;
        operations.addPlayer(curPlayer);
    }

    operations.notifyPlayerDead = (curPlayer) => {
        const teammates = players[curPlayer.teamColor];

        const isAllDead = teammates.reduce((isAllDead, teammate) => { 
            if (teammate.state !== 'dead') {
                isAllDead = false;
            }

            return isAllDead;
        }, true)


        if (isAllDead) {
            teammates.forEach((teammate) => {
                teammate.lose();
            })

            for (const teamColor in players) {
                if (teamColor !== curPlayer.teamColor) {
                    const enemies = players[teamColor];
                    enemies.forEach((enemy) => {
                        enemy.win();
                    })
                }
            }
        }
    }

    const ReceiveMessage = (message, ...args) => {
        operations[message](...args);
    }

    return { ReceiveMessage }
})();

class Player {
    constructor(name, teamColor) {
        this.name = name;
        this.teamColor = teamColor;
        this.state = 'live';
    }

    win() {
        console.log(`${this.name} won.`)
    }

    lose() {
        console.log(`${this.name} lost`)
    }

    die() {
        this.state = 'dead';
        playerDirector.ReceiveMessage('notifyPlayerDead', this);
    }

    remove() {
        playerDirector.ReceiveMessage('removePlayer', this);
    }

    changeTeam(color) {
        playerDirector.ReceiveMessage('changeTeam', this, color);
    }
}


const playerFactory = (name, teamColor) => {
    const newPlayer = new Player(name, teamColor);
    playerDirector.ReceiveMessage('addPlayer', newPlayer);

    return newPlayer;
}



// Create players
const player1 = playerFactory('Benson', 'red')
const player2 = playerFactory('Dean', 'red');
const player3 = playerFactory('Samuel', 'red');
const player4 = playerFactory('Bennet', 'red');

const player5 = playerFactory('Gene', 'blue');
const player6 = playerFactory('Willie', 'blue');
const player7 = playerFactory('WeiMing', 'blue');
const player8 = playerFactory('Oli', 'blue');


// Make red team die
player1.die();
player2.die();
player3.die();
player4.die();
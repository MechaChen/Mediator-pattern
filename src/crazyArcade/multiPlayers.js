class Player {
    constructor(name, teamColor) {
        this.partners = [];
        this.enemies = [];
        this.state = 'live';
        this.name = name;
        this.teamColor = teamColor;
    }

    win() {
        console.log(`winner: ${this.name}`)
    }

    lose() {
        console.log(`loser: ${this.name}`)
    }

    die() {
        this.state = 'dead';

        const isAllDead = this.partners
            .reduce((curAllState, partner) => {
                if (partner.state !== 'dead') {
                    curAllState = false;
                }

                return curAllState;
            }, true)

        if (isAllDead) {
            this.lose();

            this.partners.forEach((partner) => {
                partner.lose();
            })

            this.enemies.forEach((enemy) => {
                enemy.win();
            })
        }
    }
}


const players = [];

const playerFactory = (name, teamColor) => {
    const newPlayer = new Player(name, teamColor);

    players.forEach((player) => {
        if (player.teamColor === newPlayer.teamColor) {
            player.partners.push(newPlayer);
            newPlayer.partners.push(player);
        } else {
            player.enemies.push(newPlayer);
            newPlayer.enemies.push(player)
        }
    })

    players.push(newPlayer);

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

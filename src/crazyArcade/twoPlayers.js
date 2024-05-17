class Player {
    constructor(name) {
        this.name = name;
        this.enemy = null;
    }

    win() {
        console.log(`${this.name} won.`)
    }

    lose() {
        console.log(`${this.name} lost.`)
    }

    die() {
        this.lose();
        this.enemy.win();
    }
}

const player1 = new Player('Benson');
const player2 = new Player('Dean');

player1.enemy = player2;
player2.enemy = player1;

player1.die();
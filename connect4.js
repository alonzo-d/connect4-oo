/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// assuming constructor takes height, width
/** start button */


class Player {
    constructor(playerNumber, color) {
        this.playerNumber = playerNumber;
        this.color = color;
    }
}

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

class Game {
    constructor(h = 6, w = 7, p1 = 'yellow', p2 = 'blue') {
        this.height = h;
        this.width = w;
        this.board = []; // array of rows, each row is array of cells  (board[y][x])
        this.playerOne = new Player(1, p1);
        this.playerTwo = new Player(2, p2);
        console.log(this.playerTwo);
        this.currPlayer = this.playerOne; // active player: 1 or 2
        this.makeBoard();
        this.makeHtmlBoard();
    }

    makeBoard() {
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
        }
    }

    makeHtmlBoard() {
        const board = document.getElementById('board');

        // make column tops (clickable area for adding a piece to that column)
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', this.handleClick.bind(this));

        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }

        board.append(top);

        // make main part of board
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }

            board.append(row);
        }
    }

    /** findSpotForCol: given column x, return top empty y (null if filled) */

    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
                return y;
            }
        }
        return null;
    }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currPlayer.color;
        piece.classList.add(`p${this.currPlayer.playerNumber}`);
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
    }

    handleClick(evt) {
        // get x from ID of clicked cell
        const x = +evt.target.id;

        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
            return;
        }

        // place piece in board and add to HTML table
        this.board[y][x] = this.currPlayer.playerNumber;
        this.placeInTable(y, x);

        // check for win
        if (this.checkForWin()) {
            return this.endGame(`Player ${this.currPlayer.playerNumber} won!`);
        }

        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
            return this.endGame('Tie!');
        }

        // switch players
        this.currPlayer = this.currPlayer === this.playerOne ? this.playerTwo
            : this.playerOne;
    }

    checkForWin() {
        const _win = cells => {
            // Check four cells to see if they're all color of current player
            //  - cells: list of four (y, x) cells
            //  - returns true if all are legal coordinates & all match currPlayer

            return cells.every(
                ([y, x]) =>
                    y >= 0 &&
                    y < this.height &&
                    x >= 0 &&
                    x < this.width &&
                    this.board[y][x] === this.currPlayer.playerNumber
            );
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

                // find winner (only checking each win-possibility as needed)
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
        }
    }


}

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', startGame.bind(null, 6, 7));

function startGame(h, w) {
    document.querySelector("#board").innerHTML = "";
    const p1 = document.getElementById('p1').value;
    const p2 = document.getElementById('p2').value;
    return new Game(h, w, p1, p2);
}

// function makeBoard() {
//     for (let y = 0; y < HEIGHT; y++) {
//         board.push(Array.from({ length: WIDTH }));
//     }
// }

/** makeHtmlBoard: make HTML table and row of column tops. */


/** placeInTable: update DOM to place piece into HTML table of board */


/** endGame: announce game end */


/** handleClick: handle click of column top to play piece */


/** checkForWin: check board cell-by-cell for "does a win start here?" */


// makeBoard();
// makeHtmlBoard();

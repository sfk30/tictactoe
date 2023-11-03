const startBtn = document.getElementById('start-btn')
const restartBtn = document.getElementById('restart-btn')
const container = document.querySelector('.container')
const message = document.querySelector('.message')

const gameBoard = (function() {
    var cells = ['', '', '', '', '', '', '', '', '']

    const displayBoard = function() { 
        cells.forEach((cell) => {
            const box = document.createElement('div')
            box.className = 'box'
            container.appendChild(box)
        })
    }

    return {
        cells,
        displayBoard
    }

})()

gameBoard.displayBoard()

const allBoxes = document.querySelectorAll('.box')

function createPlayer(name, marker, turn) {
    return {
        name,
        marker, 
        turn,
    }
}

const controlGame = (function() {
    var gameOver = false

    function startGame() {
        player1 = createPlayer(document.getElementById('player-1').value, 'X', true)
        player2 = createPlayer(document.getElementById('player-2').value, '0', false)
        allBoxes.forEach((box) => {
            box.addEventListener('click', (e) => {
                controlGame.placeMarker(e);
                controlGame.announceDraw();
                controlGame.disableBoard();
            });
        })
    }

    function getCurrentPlayer() {
        let currentPlayer;
        if (player1.turn == true) {
            currentPlayer = player1
        } else { 
            currentPlayer = player2
        }
        return currentPlayer
    }

    function switchPlayer() {
        player1.turn = !player1.turn
        player2.turn = !player2.turn
    }

    function placeMarker(e) { 
        const currentPlayer = controlGame.getCurrentPlayer()
        if (e.target.textContent === '') {  
            e.target.textContent = currentPlayer.marker
            controlGame.switchPlayer()
        }
        controlGame.announceWinner()
        
    }

    function checkForWinner(){

        const winningCombs = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ]
            for (const comb of winningCombs) {
                const [a,b,c] = comb
                const boxA = allBoxes[a]
                const boxB = allBoxes[b]
                const boxC = allBoxes[c]
                if (boxA.textContent === boxB.textContent && boxB.textContent === boxC.textContent &&
                    boxA.textContent != '') {
                    gameOver = true
                    return true
                } 
            }
            return false
    }

    function announceWinner() { 
        if (controlGame.checkForWinner()) {
            if(controlGame.getCurrentPlayer().name = document.getElementById('player-2').value) {
                message.textContent = `${player1.name} won`
            }
            else {
                message.textContent = `${player2.name} won`
            }
        }
    } //have to switch player name as placeMarker function calls switchPlayer at the end so if X won currentPLayer would be Os

    function checkDraw() {
        const boxes = Array.from(allBoxes) //had to convert allBoxes (nodeList) to array for every to work 
        return boxes.every((box) => box.textContent !== '')
    }

    function announceDraw() {
        if(controlGame.checkForWinner() == false && controlGame.checkDraw()) {
            message.textContent = `It's a draw!`
            gameOver = true
        }
    }

    function disableBoard() {
        if (gameOver == true) {
            allBoxes.forEach((box) => {
                box.classList.toggle('disable')
            })
        }
    }

    function restartGame() { 
        window.location.reload();
    }
    
    return {
        startGame,
        getCurrentPlayer,
        switchPlayer, 
        placeMarker,
        checkForWinner, 
        announceWinner,
        checkDraw, 
        announceDraw, 
        disableBoard,
        restartGame
    }

})()

startBtn.addEventListener('click', controlGame.startGame)
restartBtn.addEventListener('click', controlGame.restartGame)
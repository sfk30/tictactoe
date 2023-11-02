const container = document.querySelector('.container')

const gameBoard = (function() {
    var cells = ['', '', '', '', '', '', '', '', '']

    const displayBoard = function() { 
        cells.forEach((cell, index) => {
            const box = document.createElement('div')
            box.className = 'box'
            box.id = `cell-${index}`
            box.textContent = cell
            container.appendChild(box)
        })
    }

    return {
        cells,
        displayBoard
    }

})()

gameBoard.displayBoard()


function createPlayer(name, marker, turn) {
    return {
        name,
        marker, 
        turn,
    }
}

const player1 = createPlayer('player1', 'X', true)
const player2 = createPlayer('player2', 'O', false)

const controlGame = (function() {
    
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
        if (player1.turn) {
            player1.turn = false
            player2.turn = true
        } else { 
            player2.turn = false
            player1.turn = true
        }
    }

    function placeMarker(e) { 
        const currentPlayer = controlGame.getCurrentPlayer()
        if (e.target.textContent === '') {  
            e.target.textContent = currentPlayer.marker
            controlGame.switchPlayer()
        }
    }

    return {
        getCurrentPlayer,
        switchPlayer, 
        placeMarker,
    }

})()

const allBoxes = document.querySelectorAll('.box')
allBoxes.forEach((box) => {
    box.addEventListener('click', controlGame.placeMarker)
})

const checkForWinner = (function(){

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
                console.log('found a winner')
            } 
        }
        return false

})()



// function gameOver() {

//     const winningCombs = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
//         [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
//         [0, 4, 8], [2, 4, 6] // diagonals
//     ]

//         for (const comb of winningCombs) {
//             const [a,b,c] = comb
//             const boxA = allBoxes[a]
//             const boxB = allBoxes[b]
//             const boxC = allBoxes[c]
//             if (boxA.textContent === boxB.textContent && boxB.textContent === boxC.textContent &&
//                 boxA.textContent != '') {
//                 console.log('found a winner')
//             } 
//         }
//         return false

// }

// gameOver()




// [0,1,2] = comb 
// boxA = allboxes[0]
// boxB = allboxes[1]
// boxC = allboxes[2]

// boxA === boxB && boxB === boxC
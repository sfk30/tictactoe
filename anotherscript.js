const gameBoard = (function() {
    var cells = ['x', 'hello', 'o', null, null, null, null, null, 'x']

    return {
      cells
    }
})()

gameBoard.cells.forEach(cell => {
    const p = document.createElement('p')
    p.textContent = cell
    document.body.appendChild(p)
})

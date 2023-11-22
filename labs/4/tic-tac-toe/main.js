let player = 'X';
let gameOver = false;

function init() {
    const board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        const elem = document.createElement('div');
        elem.className = 'cell';
        board.append(elem);
    }
    return board;
}

function displayMessage(message, type = 'success') {
    const messageDiv = document.querySelector('.messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    newMessage.className = `message ${type}`;
    messageDiv.prepend(newMessage);
    setTimeout(() => {
        newMessage.remove();
    }, 3000);
}

function checkLine(cells, start, step) {
    const firstCell = cells[start];
    return (
        firstCell.textContent.trim() !== '' &&
        [...Array(2).keys()].every((i) =>
            cells[start + step * (i + 1)].textContent === firstCell.textContent
        )
    );
}

function checkRows(cells) {
    for (let i = 0; i < 3; i++) {
        if (checkLine(cells, i * 3, 1)) {
            return true;
        }
    }
    return false;
}

function checkColumns(cells) {
    for (let i = 0; i < 3; i++) {
        if (checkLine(cells, i, 3)) {
            return true;
        }
    }
    return false;
}

function checkDiagonals(cells) {
    return checkLine(cells, 0, 4) || checkLine(cells, 2, 2);
}

function isFull(cells) {
    return [...cells].every((cell) => cell.textContent.trim() !== '');
}

function checkForEndCondition(cell) {
    const target = cell.closest('#board');
    if (!gameOver && target.id === 'board') {
        const cells = target.children;
        const doWeWin = checkRows(cells) || checkColumns(cells) ||
            checkDiagonals(cells);
        if (doWeWin) {
            gameOver = true;
            displayMessage(`Победил ${player === 'X' ? '0' : 'X'}`);
            return;
        }
        if (isFull(cells)) {
            displayMessage('Ничья');
        }
    }
}

function handleCellClick(cell) {
    if (gameOver) {
        displayMessage('Игра завершена', 'error');
        return;
    }
    if (cell.textContent.trim() !== '') {
        displayMessage('Ячейка занята', 'error');
        return;
    }
    cell.textContent = player;
    player = (player === 'X') ? '0' : 'X';
    checkForEndCondition(cell);
}

function clickHandler(event) {
    const target = event.target;

    if (target.className === 'cell') {
        handleCellClick(target);
    }
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.textContent = '';
    });
    player = 'X';
    gameOver = false;
}

window.onload = function () {
    const board = init();
    board.addEventListener('click', clickHandler);
    const reload = document.querySelector('.btn');
    reload.addEventListener('click', resetGame);
};

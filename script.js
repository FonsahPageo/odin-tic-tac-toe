const Player = (name, marker) => {
    return { name, marker };
};

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const updateBoard = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, updateBoard, resetBoard };
})();

const gameController = (() => {
    const playerX = Player("Player X", "X");
    const playerO = Player("Player O", "O");
    let currentPlayer = playerX;
    let gameActive = true;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const board = gameBoard.getBoard();

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return currentPlayer;
            }
        }
        return board.includes("") ? null : "Tie";
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (!gameActive || !gameBoard.updateBoard(index, currentPlayer.marker)) return;

        e.target.textContent = currentPlayer.marker;
        const winner = checkWinner();

        if (winner) {
            gameActive = false;
            setTimeout(() => {
                alert(winner === "Tie" ? "It's a tie!" : `${winner.name} wins!`);
            }, 100);
        } else {
            switchPlayer();
        }
    };

    const restartGame = () => {
        gameBoard.resetBoard();
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = playerX;
        gameActive = true;
    };

    return { handleClick, restartGame };
})();

// Minimal global code
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => cell.addEventListener("click", gameController.handleClick));
document.getElementById("restartBtn").addEventListener("click", gameController.restartGame);

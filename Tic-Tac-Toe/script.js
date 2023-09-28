document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const winnerMessage = document.getElementById("winner");
    const newGameButton = document.getElementById("new-game");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                winnerMessage.textContent = `Player ${currentPlayer} wins!`;
                message.classList.remove("hidden");
                return;
            }
        }

        if (!board.includes("") && gameActive) {
            gameActive = false;
            winnerMessage.textContent = "It's a draw!";
            message.classList.remove("hidden");
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (gameActive && board[index] === "") {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer);
                checkWinner();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });
    });

    newGameButton.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("X", "O", "winner");
        });
        currentPlayer = "X";
        gameActive = true;
        message.classList.add("hidden");
    });
});

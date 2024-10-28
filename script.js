var ceil = document.getElementsByClassName("game-item"),
    reset = document.getElementById("reset-game"),
    message = document.getElementById("message"),
    scoreX = document.getElementById("score-x"),
    scoreO = document.getElementById("score-o"),
    scoreDraw = document.getElementById("score-draw"),
    player = "X", // Alexey всегда начинает первым
    stepCount = 0,
    winCombinations = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9]
    ],
    dataX = [],
    dataO = [],
    winXSound = document.getElementById("win-x-sound"),
    winOSound = document.getElementById("win-o-sound"),
    drawSound = document.getElementById("draw-sound");

let victoriesX = 0;
let victoriesO = 0;
let draws = 0;

// Устанавливаем начальное сообщение
message.innerText = ""; // Оставляем пустым, чтобы не показывать текст до первого хода

// Добавляем обработчики кликов на элементы игрового поля
for (var i = 0; i < ceil.length; i++) {
    ceil[i].addEventListener("click", currentStep);
}

// Функция, обрабатывающая ход игрока
function currentStep() {
    var num = +this.getAttribute("data-ceil");
    if (!this.classList.contains("x") && !this.classList.contains("o")) {
        this.classList.add(player === "X" ? "x" : "o");
        player === "X" ? dataX.push(num) : dataO.push(num);

        // Проверка на победу
        if (
            (dataO.length > 2 || dataX.length > 2) &&
            (checkWin(dataO, num) || checkWin(dataX, num))
        ) {
            for (var i = 0; i < ceil.length; i++) {
                ceil[i].removeEventListener("click", currentStep);
            }

            // Воспроизводим звук в зависимости от победителя и обновляем счет
            if (player === "X") {
                winXSound.play(); // Воспроизводим звук для победы X
                victoriesX++;
                scoreX.innerText = victoriesX; // Обновляем счет
                message.innerText = "Победил игрок Alexey (X)";
            } else {
                winOSound.play(); // Воспроизводим звук для победы O
                victoriesO++;
                scoreO.innerText = victoriesO; // Обновляем счет
                message.innerText = "Победил игрок Erkezhan (O)";
            }
        } else {
            stepCount++;
            if (stepCount === 9) {
                drawSound.play(); // Воспроизводим звук при ничьей
                draws++;
                scoreDraw.innerText = draws; // Обновляем счет ничьих
                message.innerText = "Ничья";
            } else {
                // Обновляем сообщение только в случае успешного хода
                changePlayer();
                // Показываем сообщение о текущем игроке только после первого хода
                if (stepCount === 1) {
                    message.innerText = "Ходит игрок " + (player === "X" ? "Alexey" : "Erkezhan");
                } else {
                    message.innerText = "Ходит игрок " + (player === "X" ? "Alexey" : "Erkezhan");
                }
            }
        }
    }
}

// Функция для смены игрока
function changePlayer() {
    player === "X" ? (player = "O") : (player = "X");
}

// Сброс игры
reset.addEventListener("click", function () {
    for (var i = 0; i < ceil.length; i++) {
        ceil[i].classList.remove("x", "o");
    }
    dataO = [];
    dataX = [];
    player = "X"; // Начинаем с игрока Alexey
    stepCount = 0;
    message.innerText = ""; // Сбрасываем сообщение
    for (var i = 0; i < ceil.length; i++) {
        ceil[i].addEventListener("click", currentStep);
    }
});

// Проверка на победу
function checkWin(arr, number) {
    for (var w = 0, wLen = winCombinations.length; w < wLen; w++) {
        var someWinArr = winCombinations[w],
            count = 0;
        if (someWinArr.indexOf(number) !== -1) {
            for (var k = 0, kLen = someWinArr.length; k < kLen; k++) {
                if (arr.indexOf(someWinArr[k]) !== -1) {
                    count++;
                    if (count === 3) {
                        return true;
                    }
                }
            }
            count = 0;
        }
    }
}

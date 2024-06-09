const numRows = 20;
const numCols = 20;
const speed = 100; // מהירות תנועת הנחש (במילישניות)

let snake = [{x: 10, y: 10}]; // התחלה של הנחש
let dx = 1; // כיוון התנועה האופקי הנוכחי
let dy = 0; // כיוון התנועה האנכי הנוכחי
let food = generateFood(); // יצירת מזון ראשוני
let score = 0; // תוצאה הנוכחית

function startGame() {
    document.addEventListener('keydown', changeDirection);
    setInterval(moveSnake, speed);
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (event.key === 'ArrowDown' && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (event.key === 'ArrowLeft' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx !== -1) {
        dx = 1;
        dy = 0;
    }
}

function moveSnake() {
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // טיפול במקרה שבו הנחש פוגע בקיר או בעצמו
    if (head.x < 0 || head.x >= numCols || head.y < 0 || head.y >= numRows || isSnake(head)) {
        // alert('Game Over! Your score: ' + score);
        location.reload(); // רענון הדף להתחלת משחק חדש
        return;
    }

    // הוספת ראש הנחש לקראת התחלת תנועה
    snake.unshift(head);

    // טיפול במקרה שבו הנחש אוכל את המזון
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').innerText = 'Score: ' + score;
        food = generateFood(); // יצירת מזון חדש
    } else {
        snake.pop(); // הסרת קצה הנחש במידה ולא אכל מזון
    }

    drawSnake();
    drawFood();
}

function isSnake(cell) {
    return snake.some(part => part.x === cell.x && part.y === cell.y);
}

function generateFood() {
    let food;
    do {
        food = {
            x: Math.floor(Math.random() * numCols),
            y: Math.floor(Math.random() * numRows)
        };
    } while (isSnake(food));
    return food;
}

function drawSnake() {
    let table = document.getElementById('gameBoard');

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let cell = table.rows[row].cells[col];
            cell.classList.remove('snake');
        }
    }
    snake.forEach(part => {
        let cell = table.rows[part.y].cells[part.x];
        cell.classList.add('snake');
    });
}

function drawFood() {
    let table = document.getElementById('gameBoard');
    let cell = table.rows[food.y].cells[food.x];
    cell.classList.add('food');
}

// התחלת המשחק
// startGame();
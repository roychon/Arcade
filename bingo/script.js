const tds = document.querySelectorAll("td");
const free = document.querySelector('#squarefree');
const mainHeader = document.querySelector('h1');

const winConds = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 18, 24],
    [4, 8, 16, 20]
];


for (let td of tds) {
    if (td !== free) {
        td.addEventListener('click', () => {
            td.classList.toggle("img");
            // only toggle green background if there is a win row/col/diag
            if(td.classList.contains("green")) {
                td.classList.toggle("green");
            }
            checkWin();
        });
    }

    
}

function checkWin() {
    let foundBingos = 0;
    let arr = [];
    for (let winCond of winConds) {
        if (winCond.every(index => tds[index].classList.contains("img"))) {
            foundBingos++;
            arr.push(winCond);
        }
    }

    // user has a win condition
    if (foundBingos > 0) {
        mainHeader.textContent = `You won ${foundBingos} ${foundBingos > 1 ? 'bingos' : 'bingo'}!`;
        for(let subArr of arr) {
            subArr.forEach(num => tds[num].classList.add("green"));
        }
    } else {
        mainHeader.textContent = "Bingo Game";
    }
}

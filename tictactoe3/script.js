let letter = 'X';
let checkedBoxes = 0; // for tie
const turnMessage = document.querySelector('main h2');
const playerNum = document.querySelector('h2 span');
const boxes = document.querySelectorAll('div');
const main = document.querySelector('main');
let win = false;

const winCombs = [
    // row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // col
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diag
    [0, 4, 8],
    [2, 4, 6]
];

// restart button
const restart = document.querySelector('button');

// add event for restart button
restart.addEventListener('click', restartGame);

// add events for each box in tic tac toe grid
for(let box of boxes) {
    box.addEventListener('click', playGame);
}


// function for playing tic tac toe game
function playGame(e) {
        // check: box is empty
        if (e.currentTarget.hasChildNodes()) return;
        
        // box is empty
            checkedBoxes++;
            let p = document.createElement('p');
            p.innerHTML = letter;
            e.target.append(p);
            // change letter
            // letter === 'X' ? letter = 'O' : letter = 'X';
            letter = letter === 'X' ? 'O' : 'X';
            
            // call function
            const winCombination = checkWinner(boxes);
            
            // check for winner
            if(winCombination) {
                // get index of won boxes and highlight them
                boxes[winCombination[0]].style.backgroundColor = 'green';
                boxes[winCombination[1]].style.backgroundColor = 'green';
                boxes[winCombination[2]].style.backgroundColor = 'green';
            
                // remove player turn message
                document.querySelector('main h2').remove();

                // insert winner message
                const winner = document.createElement('h2');
                winner.innerHTML = `Player ${playerNum.innerHTML} Won!`;
                winner.style.backgroundColor = 'green';
                winner.style.color = 'white';
                main.insertBefore(winner, document.querySelector('#grid'));
                
                // disable user from clicking more boxes
                for(let box of boxes) {
                    box.removeEventListener('click', playGame);
                }
                return;
            }

            if (playerNum.innerHTML == 1) {
                playerNum.innerHTML = 2;
            } else {
                playerNum.innerHTML = 1;
            }

            if(checkedBoxes == 9) {
            // remove turn message
            document.querySelector('main h2').remove();

            // tie message
            const tie = document.createElement('h2');
            tie.innerHTML = 'Tied Game!';
            tie.style.backgroundColor = 'yellow';
            tie.style.color = 'black';
            tie.style.padding = '10px';
            main.insertBefore(tie, document.querySelector('#grid'));
               
        
        
    }
}

// function that checks if there is a winner
function checkWinner() {
    for(let winComb of winCombs) {
        if (boxes[winComb[0]].innerHTML == boxes[winComb[1]].innerHTML
            && boxes[winComb[0]].innerHTML == boxes[winComb[2]].innerHTML && boxes[winComb[0]].innerHTML != '') {
                win = true;
                return winComb;
            }
    }
    return false;
}


function restartGame() {
    if(win) {
        const winMes = document.querySelector('main h2');
        winMes.remove();
        main.insertBefore(turnMessage, document.querySelector('#grid'));
        for(let box of boxes) {
            box.addEventListener('click', playGame);
        }        
    }
    letter = 'X';
    playerNum.innerHTML = '1';
    checkedBoxes = 0;
    win = false;
    for(let box of boxes) {
        box.style.backgroundColor = 'transparent';
        if(box.firstChild) {
            box.firstChild.remove();
        }
    }    
}

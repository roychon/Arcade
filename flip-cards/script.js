let tries = 0;
let numCards = 4;
const cardContainer = document.querySelector('.card');
document.body.appendChild(cardContainer);
let oIndex = randNum();
const button = document.querySelector("button");
const input = document.querySelector("input");
button.addEventListener('click', generateCard);

const message = document.querySelector('.message');
const numTries = document.querySelector('.tries');

// original 4 cards
for(let i = 0; i < numCards; ++i) {
    const section = document.createElement('section');
    section.textContent = i == oIndex? "O" : "X";
    cardContainer.insertBefore(section, document.querySelector('.moreCards'));
    section.addEventListener('click', playCards);
}

// function to generate 'input.value' number of cards
// make a new card container with 'input.value' number of cards
//    and replace original card container with newly constructed 
//    container
function generateCard() {
    // reset number of tries
    tries = 0;
    const newContainer = document.createElement('div');
    newContainer.className = 'card';
    numCards = input.value;
    oIndex = randNum();
    for(let i = 0; i < input.value; ++i) {
        const newSection = document.createElement('section');
        newSection.textContent = i == oIndex? "O" : "X";
        newSection.addEventListener('click', playCards);
        newContainer.appendChild(newSection);
    }

    // remove win message if it exists
    if(document.querySelector('h2')) {
        document.querySelector('h2').innerHTML = `Tries: <span class="tries">${tries}</span>`;
        document.querySelector('h2').style.backgroundColor = 'transparent';

    }

    document.querySelector('.card').replaceWith(newContainer);
}

// function for playing cards
function playCards(e) {
    if(e.currentTarget.backgroundColor == 'aquamarine') return;
    tries++;
    document.querySelector('.tries').innerHTML = tries;
    if(e.currentTarget.textContent == 'O'){
        document.querySelector('.message').innerHTML = `Win! It took you ${tries} tries`;
        document.querySelector('.message').style.backgroundColor = 'lightgreen';
        e.currentTarget.style.color = 'blue';
        e.currentTarget.style.backgroundColor = "lightgreen";
        const clone = document.querySelector('.card').cloneNode(true);
        document.querySelector('.card').replaceChildren(clone);
        return;
    }
      
    e.currentTarget.style.color = "blue";
    e.currentTarget.style.backgroundColor = "#ff3333";

}

// function to generate random number 
function randNum() {
    return Math.floor(Math.random() * numCards);
}


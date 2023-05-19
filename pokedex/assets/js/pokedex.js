// Call our function when user clicks the left or right arrows
// Call function when the user presses enter in the input
// Grab the relevant data and plug it in where it needs to go
// Add another AJAX request to species endpoint

let pokemonNum;

const rightBtn = document.querySelector(".controls .right");
const leftBtn = document.querySelector(".controls .left");

rightBtn.addEventListener("click", () => {
    getPokemonData(++pokemonNum);
    nameInput.value = "";
});

leftBtn.addEventListener("click", () => {
    getPokemonData(--pokemonNum);
    nameInput.value = "";
});

nameInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        getPokemonData(nameInput.value);
    }
});

function getPokemonData(pokemon) {
    // invalid pokemon, clear all
    if (pokemon < 1 || pokemon > 1010) {
        sprite.src = "";
        document.querySelector("#name").textContent = "";
        id.textContent = "";
        height.textContent = "";
        weight.textContent = "";
        genus.textContent = "";
        description.textContent = "Error, enter a valid pokemon!";
        return;
    }
    // First set of data (height, weight, id, image)
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        id.textContent = pokemonNum = response.id;
        const image = document.querySelector("img");
        image.src =
            pokemonNum < 650
                ? response.sprites.versions["generation-v"]["black-white"]
                      .animated.front_default
                : response.sprites.front_default;
        height.textContent = response.height / 10;
        weight.textContent = response.weight / 10;
        document.querySelector("#name").textContent = response.name;
    });
    xhr.send(null);

    // Second set of data (genus and flavor text)
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    xhr2.addEventListener("load", () => {
        const response = JSON.parse(xhr2.responseText);
        for (let data of response.genera) {
            if (data.language.name == "en") {
                genus.textContent = data.genus.split("Pokémon")[0];
                console.log(data.genus.split("Pokémon"));
            }
        }

        // when no description is available in pokedex
        if (!response.flavor_text_entries.length)
            description.textContent = "No description in Pokedex";
        for (let data of response.flavor_text_entries) {
            if (data.language.name == "en") {
                description.textContent = data.flavor_text;
            }
        }
    });
    xhr2.send(null);
}

getPokemonData(1);

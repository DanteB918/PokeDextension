async function fetchPokemon() {
    document.getElementById('error-container'). style.display = 'none';
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    
    //Retrieving all ID fields in the DOM
    const fieldImage = document.getElementById('pokemonImage');
    const fieldName = document.getElementById('pokemonNameDisplay');
    const fieldType = document.getElementById('pokemonType');
    const fieldHeight = document.getElementById('pokemonHeight');
    const fieldWeight = document.getElementById('pokemonWeight');
    const fieldSpecies = document.getElementById('pokemonSpecies');
    const fieldBaseExperience = document.getElementById('pokemonBaseExperience');
    const fieldGames = document.getElementById('pokemonGames');
    const fieldAbilities = document.getElementById('pokemonAbilities');
    
    try{ //Let's see if we can find the pokemon were looking for.
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        await response.json();
    }catch (error){
        document.getElementById('pokemonData').style.display = 'none';
        document.getElementById('error-container').style.display = 'block';
        document.getElementById('error-text').textContent = 'Not Found';
        return false;
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    //Retrieving data to insert into DOM
    const pokemonImage = data.sprites.front_default;

    const name = data.name;
    const types = data.types.map(typeObj => typeObj.type.name).join(', ');
    const height = data.height / 10; // Convert to meters
    const weight = data.weight / 10; // Convert to kilograms
    const abilities = data.abilities.map(abilityObj => abilityObj.ability.name).join(', ');
    const species = data.species.name;
    const baseExperience = data.base_experience;
    const games = data.game_indices.map(gameObj => gameObj.version.name).join(', ');


    document.getElementById('advisory-text').textContent = `Click the image to see shiny version!`;

    fieldImage.src = pokemonImage;
    fieldName.textContent = name;
    if (types){
        fieldType.textContent = `Type(s): ${types}`;
    }
    if (height){
        fieldHeight.textContent = `Height: ${height} m`;
    }
    if (weight){
        fieldWeight.textContent = `Weight: ${weight} kg`;
    }
    if (species){
        fieldSpecies.textContent = `Species: ${species}`;
    }
    if (baseExperience){
        fieldBaseExperience.textContent = `Base Experience: ${baseExperience}`;
    }
    if (games){
        fieldGames.textContent = `Appears in Games: ${games}`;
    }
    if (abilities){
        fieldAbilities.textContent = `Abilities: ${abilities}`;
    }
    document.getElementById('pokemonData').style.display = 'block';
  }

document.getElementById('search-pokemon').addEventListener("click", fetchPokemon);

const fieldImage = document.getElementById('pokemonImage');
fieldImage.addEventListener("click", swapImg);
async function swapImg() { //Switch between shiny and not shiny images
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    const pokemonImage = data.sprites.front_default;
    var pokemonImageShiny = data.sprites.front_shiny;

    if (this.src === pokemonImage && pokemonImageShiny){
            this.src = pokemonImageShiny;
    }else{
        this.src = pokemonImage;
    };
};

//Dynamic date for copyright
const d = new Date();
var year = document.getElementById('year');
year.innerHTML = d.getFullYear();

async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    const pokemonImage = data.sprites.front_default;
    const pokemonImageShiny = data.sprites.front_shiny;

    const name = data.name;
    const types = data.types.map(typeObj => typeObj.type.name).join(', ');
    const weight = data.weight;

    document.getElementById('advisory-text').textContent = `Click the image to see shiny version!`;

    document.getElementById('pokemonImage').src = pokemonImage;
    document.getElementById('pokemonNameDisplay').textContent = name;
    document.getElementById('pokemonType').textContent = `Type(s): ${types}`;
    document.getElementById('pokemonWeight').textContent = `Weight: ${weight}`;
    document.getElementById('pokemonData').style.display = 'block';

    document.getElementById('pokemonImage').addEventListener("click", function() {
        if (this.src === pokemonImage){
            this.src = pokemonImageShiny;
        }else{
            this.src = pokemonImage;
        };
    });
  }

document.getElementById('search-pokemon').addEventListener("click", fetchPokemon);

async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    const pokemonImage = data.sprites.front_default;
    const name = data.name;
    const types = data.types.map(typeObj => typeObj.type.name).join(', ');

    document.getElementById('pokemonImage').src = pokemonImage;
    document.getElementById('pokemonNameDisplay').textContent = name;
    document.getElementById('pokemonType').textContent = `Type(s): ${types}`;

    document.getElementById('pokemonData').style.display = 'block';
  }

document.getElementById('search-pokemon').addEventListener("click", fetchPokemon);

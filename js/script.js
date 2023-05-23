
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');

let searchPokemon = 1;


   // Função para buscar um pokémon na API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    } else {
      throw new Error('Pokémon not found');
    }
  };
  
  // Função para exibir os detalhes de um pokémon na página
  const showPokemonDetails = (data) => {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.style.display = 'block';
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    input.value = '';
    searchPokemon = data.id;
  };
  
  // Função para exibir uma mensagem de erro na página
  const showError = () => {
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  };
  
  // Função para buscar e renderizar um pokémon
  const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
  
    try {
      const data = await fetchPokemon(pokemon);
      showPokemonDetails(data);
    } catch (error) {
      showError();
    }
  };
  
  // Evento de envio do formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });
  
  // Evento de clique no botão "Anterior"
  buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });
  
  // Evento de clique no botão "Próximo"
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });
  
  // Inicializar a exibição do primeiro pokémon
  renderPokemon(searchPokemon);
  
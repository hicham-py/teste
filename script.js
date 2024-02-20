document.addEventListener("DOMContentLoaded", function() {
  fetchRecipes();
  document.getElementById("searchInput").addEventListener("input", filterRecipes);
});

function fetchRecipes() {
  fetch('https://raw.githubusercontent.com/hicham-py/recipes/main/recipes.json')
    .then(response => response.json())
    .then(data => displayRecipes(data))
    .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes-container');
  recipesContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}

function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('recipe-card');

  const image = document.createElement('img');
  image.src = recipe.image;
  image.alt = recipe.name;
  card.appendChild(image);

  const title = document.createElement('h2');
  title.textContent = recipe.name;
  card.appendChild(title);

  const ingredientsPreview = document.createElement('p');
  ingredientsPreview.textContent = recipe.ingredients.slice(0, 2).join(', ') + '...';
  card.appendChild(ingredientsPreview);

  const stepsPreview = document.createElement('p');
  stepsPreview.textContent = recipe.steps.slice(0, 2).join('\n') + '...';
  card.appendChild(stepsPreview);

  const seeMoreButton = document.createElement('button');
  seeMoreButton.textContent = 'See More';
  seeMoreButton.addEventListener('click', () => showAll(recipe));
  card.appendChild(seeMoreButton);

  return card;
}

function showAll(recipe) {
  const dialogContent = document.getElementById('dialog-content');
  dialogContent.innerHTML = '';

  // Add recipe title
  const recipeTitle = document.createElement('h2');
  recipeTitle.textContent = recipe.name;
  dialogContent.appendChild(recipeTitle);
  
   // Add image
  const image = document.createElement('img');
  image.src = recipe.image;
  image.alt = recipe.name;
  image.width = 100; // Set width to 100 pixels
  image.height = 100; // Set height to 100 pixels
  dialogContent.appendChild(image);

  // Add ingredients title
  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients:';
  dialogContent.appendChild(ingredientsTitle);

  // Add ingredients list
  const ingredientsList = document.createElement('ul');
  recipe.ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    ingredientsList.appendChild(listItem);
  });
  dialogContent.appendChild(ingredientsList);

  // Add steps title
  const stepsTitle = document.createElement('h3');
  stepsTitle.textContent = 'Steps:';
  dialogContent.appendChild(stepsTitle);

  // Add steps list
  const stepsList = document.createElement('ol');
  recipe.steps.forEach(step => {
    const listItem = document.createElement('li');
    listItem.textContent = step;
    stepsList.appendChild(listItem);
  });
  dialogContent.appendChild(stepsList);

  const modal = document.getElementById('myModal');
  const closeBtn = document.getElementsByClassName('close')[0];

  modal.style.display = 'block';

  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}


function filterRecipes() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  fetch('recipes.json')
    .then(response => response.json())
    .then(data => {
      const filteredRecipes = data.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
      displayRecipes(filteredRecipes);
    })
    .catch(error => console.error('Error filtering recipes:', error));
}

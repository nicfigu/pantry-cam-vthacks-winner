// gpt below
// New function to fetch and display recipes
function fetchAndDisplayRecipes() {
    console.log('Started...');
    console.log(localStorage.getItem('spices_string'));
    var urlParams = new URLSearchParams(localStorage.getItem("urlValue"));
    var excludeIngredients = urlParams.get('exclude') || '';
    var includeIngredients = urlParams.get('include') || "";
    var query = localStorage.getItem('ings_string');
    console.log('if reached');
    document.getElementById('resultsHeader').innerText = "Results for " + query + ".";
    console.log('reached');
    fetchRecipes(query, localStorage.getItem('spices_string'), includeIngredients);
}

function fetchRecipes(query, excludeIngredients, includeIngredients) {
    console.log('fetchRecipes() started...');
    var appId = "fe8b424a";
    var appKey = "9778009a571551e45d555efde563a70f";
    var excludeParams = excludeIngredients ? `&excluded=${encodeURIComponent(excludeIngredients)}` : '';
    var includeParams = includeIngredients ? `&allowedIngredient=${encodeURIComponent(includeIngredients)}` : '';
    var queryParams = `&app_id=${appId}&app_key=${appKey}`;
    query = localStorage.getItem('ings_string');

    var endpoint = `https://api.edamam.com/search?q=${encodeURIComponent(query)}${queryParams}`; //${excludeParams}

    console.log('Excluded: ', excludeParams);
    console.log('Include: ', query);
    console.log('Query: ', queryParams);
    console.log('URL: ', endpoint);

    fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip, deflate'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRecipes(data.hits);
        console.log('Displayed.');
    })
    .catch(error => console.log('Error:', error));
}

function displayRecipes(hits) {
    var recipeContainer = document.getElementById('results');
    recipeContainer.innerHTML = "";

    hits.forEach(hit => {
        var recipe = hit.recipe;
        var resultElement = document.createElement('div');
        resultElement.className = "recipe-block";
        resultElement.innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.label}">
            </div>
            <div class="recipe-details">
                <h2><a href="${recipe.url}" target="_blank">${recipe.label}</a></h2>
                <!-- Add more details here as needed -->
            </div>
        `;
        recipeContainer.appendChild(resultElement);
    });
}


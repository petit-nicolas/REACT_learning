import React, { useEffect, useState } from 'react';
import Recipe from "./Recipe"
import './App.css';

const App = () => {
  // Authentication
  const APP_ID = 'fc29aca1';
  const APP_KEY = '8db50068f71999b6b0c63a23f81a9aab';


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');


  // this function will be called only the value in the [] gets changed
  useEffect(() => {
    getRecipes();
    console.log("Lets say we are fetching data");
  }, [query]);

  const getRecipes = async () => {
    // await is for the return of fetch, the process will wait the return
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
};

export default App;

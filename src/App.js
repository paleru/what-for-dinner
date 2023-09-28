import SearchBar from "./components/SearchBar";
import searchRecipes from "./components/RecipeFetcher";
import { useState } from "react";
import RecipeList from "./components/RecipeList";

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async (selectedIngredients) => {
    const result = await searchRecipes(selectedIngredients);
    setRecipes(result);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
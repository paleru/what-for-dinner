import SearchBar from "./components/SearchBar";
import searchRecipes from "./components/DataFetcher";
import { useState } from "react";
import RecipeList from "./components/RecipeList";


function App() {
    const [recipes, setRecipes ] = useState([]);


    const handleSubmit = async (ingredient) => {
        const result = await searchRecipes(ingredient)

        setRecipes(result)
    };

    return (    
    <div>
        <SearchBar onSubmit={handleSubmit} />
        <RecipeList recipes={recipes} />
    </div>
    );
}
export default App;

import axios from "axios";
import api from '../api';

const searchRecipes = async (ingredients) => {
  const ingredientString = ingredients.join(",+"); // Join selected ingredients with "+"
  
  const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
    params: {
      apiKey: 'c1573df744bd4d0f8e0571ffddef0f5e',
      ingredients: ingredientString,
      ignorePantry: true,
    }
  });

  return response.data;
};

export default searchRecipes;
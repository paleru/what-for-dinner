import axios from "axios";

const searchRecipes = async (ingredient) => { 
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients?apiKey=c1573df744bd4d0f8e0571ffddef0f5e', {
    params: {
            ingredients: ingredient,
        }
    });

    return response.data;
 }

 export default searchRecipes;
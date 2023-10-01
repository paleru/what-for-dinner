import api from '../api'; 

const searchRecipes = async (ingredients) => {
  const ingredientString = ingredients.join(",+");

  try {
    const response = await api.get('/recipes/findByIngredients', {
      params: {
        ingredients: ingredientString,
        ignorePantry: true,
        number: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching recipes', error);
    throw error;
  }
};

export default searchRecipes;
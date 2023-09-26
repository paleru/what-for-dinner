import RecipeShow from './RecipeShow'

function RecipeList({ recipes }) {
    const renderedRecipes = recipes.map((recipe) => {
        return <RecipeShow key={recipe.id} recipe={recipe} />
    })

    return <div className='recipe-list'>{renderedRecipes}</div>
}

export default RecipeList;
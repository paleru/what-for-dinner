function RecipeShow({ recipe }) {
    return <div>
        <img src={recipe.image} alt={recipe.name} />
        <p>{recipe.title}</p>
    </div>
}

export default RecipeShow;
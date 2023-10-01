import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import RecipeCard from './RecipeCard'

function RecipeList({ recipes }) {
    const renderedRecipes = () => (
      <Container sx={{ py: 4 }} maxWidth="lg">
        <Grid container spacing={2}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
              <RecipeCard key={recipe.id} recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  
    return <div className='recipe-list'>{renderedRecipes()}</div>;
  }

export default RecipeList;
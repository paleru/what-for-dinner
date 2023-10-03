import SearchBar from "./components/SearchBar";
import searchRecipes from "./components/RecipeFetcher";
import { useState } from "react";
import RecipeList from "./components/RecipeList";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async (selectedIngredients) => {
    const result = await searchRecipes(selectedIngredients);
    setRecipes(result);
  };

  return (
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              What to eat?
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Start by typing in an ingredient you've got laying around
            </Typography>
            <Stack
              sx={{ mt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <SearchBar onSubmit={handleSubmit} />
            </Stack>
            <RecipeList recipes={recipes} />
          </Container>
  );
}

export default App;
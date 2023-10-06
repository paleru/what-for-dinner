import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SearchBar from './SearchBar'; // Import the SearchBar component
import RecipeList from './RecipeList'; // Import the RecipeList component

function Home({ handleSubmit, recipes }) {
  return (
    <Container maxWidth="lg">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        marginTop={4}
        gutterBottom
      >
        What to eat?
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Start by typing in an ingredient you've got laying around
      </Typography>
      <Stack sx={{ mt: 2 }} direction="row" spacing={2} justifyContent="center">
        <SearchBar onSubmit={handleSubmit} />
      </Stack>
      <RecipeList recipes={recipes} />
    </Container>
  );
}

export default Home;

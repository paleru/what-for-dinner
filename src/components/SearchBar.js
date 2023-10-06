import { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import api from '../api';
import '../styling/SearchBar.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Stack, Divider, ThemeProvider } from '@mui/material';
import { theme } from '../App';

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredientSuggestions() {
      try {
        const response = await api.get(
          '/food/ingredients/autocomplete',
          {
            params: {
              apiKey: 'c1573df744bd4d0f8e0571ffddef0f5e',
              query: term,
            },
          }
        );
        setIngredientSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching ingredient suggestions', error);
      }
    }

    // Fetch suggestions when search term changes
    fetchIngredientSuggestions();
  }, [term]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(selectedIngredients);
  };

  const handleChange = (event, { newValue }) => {
    setTerm(newValue);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(
      ingredientSuggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleIngredientSelect = () => {
    if (term && !selectedIngredients.includes(term)) {
      setSelectedIngredients([...selectedIngredients, term]);
      setTerm(''); // Clears input field after adding
    }
  };

  const handleIngredientRemove = (ingredientToRemove) => {
    const updatedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    setSelectedIngredients(updatedIngredients);
  };

  const inputProps = {
    placeholder: 'Enter an ingredient',
    value: term,
    onChange: handleChange,
    className: 'autosuggest-input',
  };

  return (
    <Container maxWidth="lg" className="search-bar-container" align="center">
      <form onSubmit={handleFormSubmit}>
        <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
        <Typography component={'span'} variant="body1" sx={{ fontSize: '16px' }}>
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
          />
        </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="row" gap={2}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color='primary'
            onClick={handleIngredientSelect}
            disabled={term.trim() === '' || selectedIngredients.includes(term)}
          >
            Add Ingredient
          </Button>
          <Button variant="contained" type="submit">
            Search
          </Button>
          </ThemeProvider>
        </Box>

        <Stack display="flex" alignItems="center" flexWrap="wrap" pt={1} justifyContent="center" spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
          {selectedIngredients.map((ingredient) => (
            <div key={ingredient}>
              <ThemeProvider theme={theme}><Button color="secondary" onClick={() => handleIngredientRemove(ingredient)}>
              {ingredient}
              </Button></ThemeProvider>
            </div>
          ))}
        </Stack>
      </form>
    </Container>
  );
}

export default SearchBar;
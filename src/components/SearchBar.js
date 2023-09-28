import { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import '../styling/SearchBar.css';

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    // Fetch ingredient suggestions here
    async function fetchIngredientSuggestions() {
      try {
        const response = await axios.get(
          'https://api.spoonacular.com/food/ingredients/autocomplete',
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

    // Fetch suggestions when the term changes
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
      setTerm(''); // Clear the input field after adding
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
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleFormSubmit}>
        <div className="selected-ingredients">
          {selectedIngredients.map((ingredient) => (
            <div key={ingredient} className="selected-ingredient">
              {ingredient}
              <button
                type="button"
                onClick={() => handleIngredientRemove(ingredient)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="ingredient-input">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <button
            type="button"
            onClick={handleIngredientSelect}
            disabled={term.trim() === '' || selectedIngredients.includes(term)}
          >
            Add Ingredient
          </button>
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
import { useState } from 'react';

function SearchBar({ onSubmit }) { 
    const [term, setTerm] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        onSubmit(

        );
    };

    const handleChange = (event) => {
        setTerm(event.target.value)
    };

    return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <input value={term} onChange={handleChange} />
        </form>
        <p>{term}</p>
    </div>
    );
}

export default SearchBar;
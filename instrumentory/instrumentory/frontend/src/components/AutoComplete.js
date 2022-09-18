import '../pages/Login.css'
import React, { useState } from 'react'

function AutoComplete({ suggestions, placeholder, class_suggestions, class_suggestion_active, class_no_suggestions, clickOnInput }) {

    // const ref = useRef()

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (e) => {
        console.log(suggestions)
        const userInput = e.target.value;
    
        // Filter out suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
      };

    const onClick = (e) => {
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };

    const onKeyDown = (key) => {
        if(key.keyCode === 13 || key.keyCode === 9){
            setInput(filteredSuggestions[activeSuggestionIndex])
            setFilteredSuggestions([])
            }
        }

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className={class_suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
                let className;
                // Flag the active suggestion with a class
                if (index === activeSuggestionIndex) {
                className = {class_suggestion_active};
                }
                return (
                <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                </li>
                );
            })}
            </ul>
        ) : (
            <div className={class_no_suggestions}>
            <em>No suggestions, you're on your own!</em>
            </div>
        );
        };

        // document.addEventListener("click", (e) => {
        //     // console.log(e.path[0])
        //     console.log(document.activeElement === ref.current)
        //     // console.log(document.activeElement)
        //     // console.log(ref.current)
        // }, false)

  return (
    <div>
        <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder={placeholder}
        className='input-text login-input input-dropdown'
        />
        {clickOnInput && showSuggestions && input && <SuggestionsListComponent />}
    </div>
  )
}

export default AutoComplete
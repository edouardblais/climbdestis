/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import './SearchBar.css'
import searchIcon from '../../assets/search-icon.svg';

function SearchBar({data, handleFocus}) {
    const [inputValue, setInputValue] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        if (inputValue.length>0 && data.length>0) {
            const newResults = []
            data.forEach((desti) => {
                if (desti.destination.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    newResults.push(desti)
                }
            })
            setSearchResults(newResults)
        } else {
            setSearchResults([])
        }
    }, [inputValue])

    const goToDestination = (destination) => {
        handleFocus(destination)
        setInputValue('')
        inputRef.current.value = '';
    }

    return (
        <div className='search-bar-super-box'>
            <div className="search-bar-box">
                <input className="search-bar-input" onChange={(e) => setInputValue(e.target.value)}ref={inputRef}/>
                <img className="search-bar-img" src={searchIcon}/>
            </div>
            <div className='search-bar-results-box'>
                {searchResults.length>0 &&
                searchResults.map((result, index) => (
                    <button className='search-result-btn' key={result.id} onClick={() => goToDestination(result)} style={{borderRadius:searchResults.length-1===index?'0px 0px 10px 10px':'0px'}}>
                        <h3 className='search-result-btn-desti'>{result.destination}</h3>
                        {result.area && <h4 className='search-result-btn-area'>, {result.area}</h4>}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SearchBar;
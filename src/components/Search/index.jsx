import React, {useCallback, useContext, useRef, useState} from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'


const Search = () => {
    const [value, setValue] = useState('');
    const {setSearchValue} = useContext(SearchContext);
    const inputRef = useRef();

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 150),[],
    )
    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value)
    }
    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    }
    return (
        <div className={styles.root}>
            <svg className={styles.icon}
                 viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/>
                <g id="search">
                    <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
                </g>
            </svg>

            <input
                ref = {inputRef}
                value = {value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder='Search pizzas...'/>

            {
                {value} && <svg onClick ={onClickClear}
                                className={styles.clearIcon} viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"><g id="info"/><g
                    id="icons"><g id="exit2">
                    <path d="M12,10c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2s-2,0.9-2,2v4C10,9.1,10.9,10,12,10z"/>
                    <path d="M19.1,4.9L19.1,4.9c-0.3-0.3-0.6-0.4-1.1-0.4c-0.8,0-1.5,0.7-1.5,1.5c0,0.4,0.2,0.8,0.4,1.1l0,0c0,0,0,0,0,0c0,0,0,0,0,0    c1.3,1.3,2,3,2,4.9c0,3.9-3.1,7-7,7s-7-3.1-7-7c0-1.9,0.8-3.7,2.1-4.9l0,0C7.3,6.8,7.5,6.4,7.5,6c0-0.8-0.7-1.5-1.5-1.5    c-0.4,0-0.8,0.2-1.1,0.4l0,0C3.1,6.7,2,9.2,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,9.2,20.9,6.7,19.1,4.9z"/>
                </g></g></svg>
            }
        </div>
    )
}
export default Search

import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(props) {
  const { searchText, setSearchText } = props
  const [input, setInput] = useState('')
  
    useEffect( ()=>{
      console.log('UseEffect start')
      const timer = setTimeout( ()=>{
        setSearchText(input)
      }, 500 )
      return ()=> {
        console.log('UseEffect return')
        clearTimeout(timer)
      }
    }, [input])

  return (
    <div className="search-bar">
       <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Search..." />
       <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  )
}
import React from 'react'
import './Filter.css'
import { useSearchParams } from 'react-router-dom'

export default function Filter({options, field, setSearch}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(field) || options[0].value;

    function handleClick(value){
        searchParams.set(field, value);
        setSearchParams(searchParams);
    }
  return (
    <div className='styled-filter'>
      {options.map((option)=> <button className={`filter-button ${option.value === currentFilter && "active"}`} key={option.value} onClick={() => {handleClick(option.value); setSearch('')}}
      active={option.value === currentFilter}
      disabled={option.value === currentFilter}>{option.text}</button>)}
    </div>
  )
}

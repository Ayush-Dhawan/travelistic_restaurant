import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import { Input } from '../../ui/input'
import { useDarkModeContext } from '../../contexts/DarkmodeContext'

export default function MenuTableOperations({setSearch}) {
    const {isDarkMode} = useDarkModeContext();
    const filterOptions = [
        {value : "all",
        text: 'All'},
        {value : "veg",
         text: 'Vegetarian'},
         {value : "nonveg",
         text: 'Non-vegetarian'},
    ]

    const filterOptions2 = [
        {value : "all",
        text: 'All'},
        {value : "maincourse",
         text: 'Main course'},
         {value : "starter",
         text: 'Starters'},
         {value : "dessert",
         text: 'Dessert'},
    ]

  return (
    <TableOperations>
      <Filter field="category" options={filterOptions} setSearch={setSearch} />
      <Filter field="type" options={filterOptions2} setSearch={setSearch} />
      <Input type="text" className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-5 w-[90vw] md:w-[20vw] text-gray-500`} placeholder="Looking for something?" onChange={(e) => setSearch(e.target.value)} ></Input>
    </TableOperations>
  )
}

import React, { useEffect, useState } from 'react'
import { MenuItems } from '../../ui/MenuItems';
import useMenu from './useMenu';
import Spinner from '../../ui/Spinner';
import TableOperations from '../../ui/TableOperations';
import MenuTableOperations from './MenuTableOperations';
import { useSearchParams } from 'react-router-dom';


export default function MenuGrid() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  let category = searchParams.get("category") || 'all';
  let type = searchParams.get("type") || 'all;'
  const {menuList, isLoading} = useMenu();

  if(isLoading) return <div className='h-screen w-screen'><Spinner /></div>

  let typeList;
  if(type === 'maincourse') typeList = menuList.filter(item => item.type === "Main Course")
  else if(type === 'dessert') typeList = menuList.filter(item => item.type === "Dessert")
else if(type === 'starter') typeList = menuList.filter(item => item.type === "Starter")
else typeList = menuList

  let categoricalList;
  if(category === "veg") categoricalList = typeList?.filter(item => item.category === "VEG")
  else if(category === "nonveg")categoricalList = typeList?.filter(item => item.category === "NON VEG")
  else categoricalList = typeList

  if(search !== '') categoricalList = menuList

  if(categoricalList.length === 0)return <div className='h-screen w-screen'> <MenuTableOperations setSearch={setSearch} /> <div className='text-md font-semibold text-center m-[2rem]'>No data to show at the moment</div></div>
  return (
    <main>
    <div className="h-screen w-screen ">
      <MenuTableOperations setSearch={setSearch} />
    <MenuItems items={categoricalList} search={search} />
    </div>
  </main>
  )
}



export const projects = [
    {
      title: "Burgir",
      description:
        "urgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgirburgir for obesityburgir for obesityburgir for obesityburgir for obesityburgir for obesity burgir for obesity burgir for obesity",
        price: '10$',
      link: "https://stripe.com",
    },
    {
      title:  "Burgir",
      description:
      "burgir for obesityburgir for obesityburgir for obesityburgir for obesityburgir for obesity burgir for obesity burgir for obesity",
        price: '10$',
    },
    {
      title:  "Burgir",
      description:
      "burgir for obesityburgir for obesityburgir for obesityburgir for obesityburgir for obesity burgir for obesity burgir for obesity",
        price: '10$',
      link: "https://google.com",
    },
    {
      title: "Burgir",
      description:
      "burgir for obesityburgir for obesityburgir for obesityburgir for obesityburgir for obesity burgir for obesity burgir for obesity",
        price: '10$',
    },
    {
      title: "Burgir",
      description:
      "burgir for obesity",
      price: '10$',
      link: "https://amazon.com",
    },
    {
      title: "Burgir",
      description:
        "burgir for obesity",
        price: '10$',
      link: "https://microsoft.com",
    },
  ];

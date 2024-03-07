import React from 'react'
import { MenuItems } from '../../ui/MenuItems';
import useMenu from './useMenu';
import Spinner from '../../ui/Spinner';

export default function MenuGrid() {
  const {menuList, isLoading} = useMenu();
  if(isLoading) return <div className='h-screen w-screen'><Spinner /></div>
  return (
    <main>
    <div className="h-screen w-screen ">
    <MenuItems items={menuList} />
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

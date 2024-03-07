import React from 'react'
import './Cart.css'
import Button from '../../ui/Button';
import { NavLink } from 'react-router-dom';


const item = {
    pizzaId: 123,
    name: "pizza",
    quantity: 2,
    totalPrice: 20
}

export default function Cart() {
  return (
    <div className='h-screen w-screen'>
          <div className='m-3 md:m-40 w-[90%] md:w-[70%]'>
          <div className=' h-80vh  w-full '>
    <NavLink to="/menu"><Button isAnimated={true} color="indigo">&larr; Back to menu</Button></NavLink>

      <h2 className='mt-7 text-xl font-semibold text-stone-500'>Your cart, Ayush</h2>
       <ul className='divide-y divide-[#4e46e5] text-slate-500 border-b'>
        <li><CartItem item={item}/></li>
        <li><CartItem item={item}/></li>
        <li><CartItem item={item}/></li>
       </ul>

      <div className='mt-6 space-x-4 flex flex-col md:flex-row gap-5'>
        <Button isAnimated={true} color="indigo">Order pizzas</Button>
        <Button isAnimated={true} color={'gray'} >
          Clear cart
        </Button>
      </div>
    </div>
          </div>
    </div>
  )
}


function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item;
    // const eachQuantity = useSelector(getQuantityById(pizzaId))

    return (
      <li className='py-3 flex justify-between align-top'>
        <p>
          {quantity}&times; {name}
        </p>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-bold mr-5'>{totalPrice}$</p>

          <UpdateQuantity pizzaId={pizzaId} quantity={quantity} />
          <DeleteItem pizzaId={pizzaId} />

        </div>
      </li>
    );
  }


  function UpdateQuantity({pizzaId, quantity}) {
    // const dispatch = useDispatch();
  return (
    <div className='flex items-center mr-5'>
      <button className='px-3 py-1 bg-slate-600 rounded-full text-gray-200 m-1'>+</button>
      <span>{quantity}</span>
      <button className='px-3 py-1 bg-slate-600 rounded-full text-gray-200 m-1'>-</button>
    </div>
  )
}

function DeleteItem(){
    return <Button isAnimated={false} color={'red'}>delete</Button>
}
  

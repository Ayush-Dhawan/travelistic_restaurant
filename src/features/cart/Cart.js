import React from 'react'
import './Cart.css'
import Button from '../../ui/Button';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { clearCart, decreaseQuantity, deleteItem, getCart, getCurrentQuantityById, getTotalCartPrice, getTotalCartQuantity, increaseQuantity } from './cartSlice';
import Navbar from '../../ui/Navbar'

const item = {
    pizzaId: 123,
    name: "pizza",
    quantity: 2,
    totalPrice: 20
}


export default function Cart() {
  const cart = useSelector(getCart)
  const dispatch = useDispatch();
  const userStateString = localStorage.getItem("userState");
  // Parse the JSON string into an object
  const userState = JSON.parse(userStateString);

  const username = userState?.fullName;

function handleClearCart(){
  dispatch(clearCart())
}

  return (
    <>
    <Navbar />
    {cart.length !== 0 ? <div className='h-screen w-screen'>
          <div className='m-2 md:m-40 w-[90%] md:w-[70%]'>
          <div className=' h-80vh  w-full '>
    <NavLink to="/menu"><Button isAnimated={true} color="indigo">&larr; Back to menu</Button></NavLink>

      <h2 className='mt-7 text-xl font-semibold text-stone-500'>Your cart, {username}</h2>
       {cart && <ul className='divide-y divide-[#4e46e5] text-slate-500 border-b'>
        {cart?.map((item) => <li><CartItem item={item} /></li>)}
       </ul>}

       <CartOverview />

      <div className='mt-6 space-x-4 flex flex-col md:flex-row gap-5'>
        <Button isAnimated={true} color="indigo">Order pizzas</Button>
        <Button onClick={handleClearCart} isAnimated={true} color={'gray'} >
          Clear cart
        </Button>
      </div>
    </div>
          </div>
    </div> : 
     <div className='h-screen w-screen flex items-center justify-center flex-col gap-6'>
    <NavLink to="/menu"><Button isAnimated={true} color="indigo">&larr; Back to menu</Button></NavLink>
    <div className='text-3xl font-bold'>Your cart is empty 🥲</div></div>}
    </>
  )
}


function CartItem({ item }) {
    const { id, dishName, quantity, unitPrice, totalPrice } = item;
    const currentQuantity = useSelector(getCurrentQuantityById(id));
  const dispatch = useDispatch();
    
  function handleDeleteItem(id){
    dispatch(deleteItem(id))
  }
    

    return (
      <li className='py-3 flex justify-between align-top'>
        <p>
          {quantity}&times; {dishName}
        </p>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-bold mr-5'>{totalPrice}$</p>

          <UpdateQuantity id={id} quantity={currentQuantity} />
          <DeleteItem id={id} onClick={() => handleDeleteItem(id)}  />

        </div>
      </li>
    );
  }


  export function UpdateQuantity({id, quantity}) {
    const dispatch = useDispatch();
    
  return (
    <div className='flex items-center mr-5'>
      <button onClick={() => dispatch(increaseQuantity(id))} className='px-3 py-1 bg-slate-600 rounded-full text-gray-200 m-1'>+</button>
      <span>{quantity}</span>
      <button onClick={() => dispatch(decreaseQuantity(id))} className='px-3 py-1 bg-slate-600 rounded-full text-gray-200 m-1'>-</button>
    </div>
  )
}

export function DeleteItem({onClick}){
    return <Button onClick={onClick}  isAnimated={false} color={'red'}>delete</Button>
}


function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-[#6366f1] px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold bg-transparent text-stone-300 sm:space-x-6">
        <span className='bg-transparent'>{totalCartQuantity} Items</span>
        <span className='bg-transparent'>{totalCartPrice}$</span>
      </p>
      
    </div>
  );
}
  

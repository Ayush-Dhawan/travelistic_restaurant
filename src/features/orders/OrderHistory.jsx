import React, { useEffect } from 'react'
import { getIdbyEmail } from '../../services/apiCustomers'
import useGetOrderHistory, { useGetIdByEmail } from './useGetOrderHistory';
import { NavLink } from 'react-router-dom';
import Navbar from '../../ui/Navbar';

export default function OrderHistory() {
  const userStateString = localStorage.getItem("userState");
  // Parse the JSON string into an object
  const userState = JSON.parse(userStateString);

  const email = userState?.email;
  const user_id = useGetIdByEmail(email);
  const {orderHistory} = useGetOrderHistory(user_id)

  if(orderHistory?.length === 0) return <div className='h-screen w-screen'> <Navbar /> <center><p className='font-bold text-3xl m-20'>You havent ordered anything yet 🥲</p></center></div>


  return (
    <div className='h-screen w-screen'>
      <Navbar />  
      <center><h2 className='font-bold text-3xl m-8 md:m-14'>My Orders</h2></center>
      <div className='p-4'>
      {orderHistory?.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((order) => (
  <NavLink to={`/order/${order.order_id}`} >
    <div className='h-full w[100%] md:w-full flex flex-col items-center justify-center mt-10 mb-10 ' key={order.order_id}>
    <div className='flex flex-col md:flex-row w-[70%] md:w-[50%] justify-between border-b-2 border-[#4338ca]'>
      <span className='text-xl font-semibold text-[#4338ca]'>Order #{order.order_id}</span>
      <span>{new Date(order.created_at).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
      })}</span>
    </div>
    <div className='w-[70%] md:w-[45%]'>
      <ul className='divide-y divide-[#4e46e5] text-slate-500 border-b-2 border-gray-300'>
        {JSON.parse(order.items).map((item, index) => (
          <CartItem item={item} key={index} />
        ))}
      </ul>
      <span className='p-1 rounded-lg text-slate-800' style={{
            backgroundColor: order.status === "cooking your meal" ? '#f06464' :
                              order.status === "left for delivery" ? '#60a5fa' :
                              order.status === 'delivered' ? '#34d399' : ''
          }}>{order?.status}</span>
    </div>
  </div>
  </NavLink>
))}

          
      </div>
    </div>
  )
}


function CartItem({ item }) {
  const { dishName, quantity, totalPrice} = item;

  return (
    <li className='py-3 flex justify-between align-top'>
      <p className='flex justify-between w-full'>
        <span>{quantity}&times; {dishName}</span> <span>{totalPrice}</span>
      </p>
    </li>
  );
}

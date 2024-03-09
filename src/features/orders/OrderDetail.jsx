import React from 'react'
import Navbar from '../../ui/Navbar'
import { useParams } from 'react-router-dom';
import { getItemsById, getOrderById } from '../../services/apiOrders';
import useGetOrderByID, { useItemsByID } from './useGetOrderByID';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../ui/Spinner';
import { Boxes } from '../../ui/Bg-boxes';
import cn from '../../utils/cn'




export default function OrderDetail() {
    const { order_id } = useParams();
    const {data: order, isLoading} = useGetOrderByID(order_id)
    console.log("data->", order)
    const {data: items} =  useItemsByID(order_id);
    let itemsArray;
   if(items){
     itemsArray = JSON.parse(items);
    // console.log("items, ", itemsArray)
   }

   let color;
   if(order?.status === 'cooking your meal') color = '#f06464'
   else if(order?.status === 'On the way') color = '#e4cd05'
   else color = '#28b485'


   if(isLoading) return( 
   <div className='h-screen w-screen'>
        <Navbar />
        <div className='w-full h-[10vh] flex justify-start items-center '>
            <p className='font-bold text-xl m-20'>Order #{order_id}</p>
        </div>
        <Spinner />
    </div>)
  return (

      <div className='h-screen w-screen'>
                <Navbar />
        <div>
            <div className='w-full h-[40vh] md:h-[10vh] flex flex-col gap-1 md:flex-row justify-between items-center '>

            <p className='font-bold text-lg md:text-xl m-10'>Order #{order_id}</p>
                <span style={{backgroundColor: `${color}`}} className={`font-bold text-2xl text-slate-800 m-16 mt-[-12rem] md:m-12 p-3 rounded-3xl`}>{order?.status}</span>
            </div>

        <div className='h-[100vh] md:h-[70vh] w-[90%] flex flex-col items-center justify-center md:flex-row'>
            <div className='shipping details h-[50%] md:h-full w-full md:w-[50%] '>
            <ul className="divide-stone-900 divide-y">
            {itemsArray ? (
              <ul className="divide-stone-500 divide-y  p-5 m-5 border-stone-500">
                {itemsArray?.map((item, index) => (
                <li key={index}>
                    <OrderItem item={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items available for this order.</p>
            )}
        </ul>

        <div className="space-y-2 bg-slate-600 m-6 px-6 py-6">
          <p className="text-sm  bg-transparent text-gray-300 font-semibold">Total cost of cart: {order?.price}$</p>
          {/* {priority && <p className="text-sm font-medium text-stone-600">Price for priority: {formatCurrency(priorityPrice)}</p>} */}
          {/* <p className="text-sm font-medium text-stone-600">Final price: {formatCurrency(orderPrice + priorityPrice)}</p> */}
          {/* <p className="text-sm font-medium text-stone-600">Address: { address}</p> */}
        </div>
                
            </div>
            <div className='shipping details h-[50%] md:h-full w-full md:w-[50%]  '>
                <h2 className='font-bold text-xl m-10 bg-transparent'>Shipping Details</h2>
                <div className='bg-transparent flex md:block'>
                    <span className='text-lg font-semibold m-5 ml-10 bg-transparent'>Phone Number: </span>
                    <span className='text-lg font-bold m-5  bg-transparent'>{order?.phoneNumber}</span>
                </div>
                <div className='bg-transparent flex md:block'>
                    <span className='text-lg font-semibold m-5 ml-10 bg-transparent'>Shipping Address: </span>
                    <span className='text-lg font-bold m-5  bg-transparent'>{order?.address}</span>
                </div>
            </div>
        </div>
      </div>
    </div>

  )
}


function OrderItem({item}) {
    const { quantity, dishName, totalPrice} = item;
    
  
    return (
      <li className="space-y-1 space-x-1">
        <div className="flex items-center  justify-between gap-4 text-sm font-semibold">
          <p className="font-bold text-2xl text-gray-500">
            <span >{quantity}&times;</span> {dishName}
          </p>
          <p className="font-bold">{totalPrice}$</p>
        </div>
        {/* <p className="text-sm text-orange-400 capitalize italic space-x-1">{isLoadingIngredients ? "Loading ingredients..." : ingredients.join(', ')}</p> */}
      </li>
    );
  }


import  cn  from "../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import './MenuItems.css'
import {useDispatch, useSelector} from 'react-redux'
import { addItem, getCurrentQuantityById } from "../features/cart/cartSlice";
import { DeleteItem, UpdateQuantity } from "../features/cart/Cart";
// import MenuTableOperations from "../features/menu/MenuTableOperations";

const MenuItems = ({ items, className, search, setSearch }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  let searchedList;

  // const currentQuantity = ;
  // const isInCart = currentQuantity > 0;

  if(search !== '') searchedList = items?.filter(item => search.toLowerCase() === '' ? item : item.dishName.toLowerCase().includes(search) )
  else searchedList = items;

  if(searchedList?.length === 0)return <div className='h-screen w-screen'> <div className='text-md font-semibold text-center m-[2rem]'>No data to show at the moment</div></div>

  
  return (
    <>
    {/* <h2 className="font-bold text-3xl ml-5">Menu</h2> */}
    <div className="flex flex-col items-center justify-between w-screen">
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 ", className)}>
        {searchedList?.map((item, idx) => (
          <div
          key={item?.id}
            className="relative group block p-2 h-full w-[100%]"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence >
              {hoveredIndex === idx && (
                <motion.span
                  className=" motion-span-bg absolute  inset-0 h-full w-full dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card item={item} className="w-full shadow-custom-md border-none">
              
            </Card>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

const Card = ({ item, className, children }) => {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(item?.id));
  function handleAddToCart(id, dishName, price){
    const newItem = {
      id,
      dishName,
      quantity: 1,
      unitPrice: price,
      totalPrice: price * 1
    }
    dispatch(addItem(newItem))
  }
  return (
    <div className={cn("rounded-2xl  w-[90%] p-0 overflow-hidden bg-slate-800 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20", className)}>
      <div className="relative z-50 ">
        <div className="p-4">
        <div className="flex flex-col items-center justify-between h-[60vh]">
                <CardTitle><span style={{ color: item?.category === "VEG" ? '#28b485' : '#f06464' }}>{item?.dishName}</span></CardTitle>
                {/* <img src={item?.image} height={300} width={300} /> */}
                <div style={{height: '15rem', width: '15rem', backgroundImage: `url(${item?.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                <CardDescription>{item?.description}</CardDescription>
                <div className="flex items-center justify-between w-full">
                <span className="item-text">{item.price}$</span>
                {currentQuantity > 0 ? <UpdateQuantity id={item?.id} quantity={currentQuantity} /> : <button className=" add-to-cart p-3 rounded-md text-gray-200" onClick={() => handleAddToCart(item.id, item.dishName, item.price)}>Add to Cart</button>}
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("item-text font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("mt-8 item-text tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>
  );
};

export { MenuItems, Card, CardTitle, CardDescription };

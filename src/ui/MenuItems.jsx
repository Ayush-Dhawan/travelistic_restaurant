import  cn  from "../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import './MenuItems.css'

const MenuItems = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
    {/* <h2 className="font-bold text-3xl ml-5">Menu</h2> */}
    <div className="flex flex-col items-center justify-between w-screen">
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 ", className)}>
        {items?.map((item, idx) => (
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
            <Card className="w-full border-[#4f46e5] ">
              <div className="flex flex-col items-center justify-between h-[60vh]">
                <CardTitle><span style={{ color: item?.category === "VEG" ? '#28b485' : '#f06464' }}>{item?.dishName}</span></CardTitle>
                {/* <img src={item?.image} height={300} width={300} /> */}
                <div style={{height: '15rem', width: '15rem', backgroundImage: `url(${item?.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                <CardDescription>{item?.description}</CardDescription>
                <div className="flex items-center justify-between w-full">
                <span className="item-text">{item.price}$</span>
                <span  className=" add-to-cart p-3 rounded-md text-gray-200">Add to Cart</span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

const Card = ({ className, children }) => {
  return (
    <div className={cn("rounded-2xl  w-[90%] p-0 overflow-hidden bg-slate-800 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20", className)}>
      <div className="relative z-50 ">
        <div className="p-4">{children}</div>
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

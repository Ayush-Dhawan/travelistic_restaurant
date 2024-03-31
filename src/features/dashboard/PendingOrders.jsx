import React, { useState } from 'react'
import './DashBoard.css'
import useGetOrders from '../orders/useGetOrders';
import {Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import { useDarkModeContext } from '../../contexts/DarkmodeContext';
import Spinner from '../../ui/Spinner';
import { Link, NavLink } from 'react-router-dom';
import StatusModal from '../../ui/StatusModal';

export default function PendingOrders() {
    

  return (
    <div className='PedingOrdersWrapper flex gap-6'>
      <PieChartContainer />
      <PendingOrderList />
    </div>
  )
}

function PendingOrderList(){
    const {allOrders, isGettingOrders} = useGetOrders();
    const {isDarkMode} = useDarkModeContext();


    const ordersPending = allOrders?.filter(order => order.status !== 'delivered');
    console.log(ordersPending)


    return (
        <div className="StyledToday">
          <div className="Row" type="horizontal">
            <h2 className="-mt-6">Pending Orders</h2>
          </div>
          {isGettingOrders ? (
            <Spinner />
          ) : ordersPending?.length > 0 ? (
            <ul className='ordersList'>
              {ordersPending.map((order, index) => (
                <OrderItem order={order} index={index} key={index} />
              ))}
            </ul>
          ) : (
            <p className="NoActivity">No activity</p>
          )}
        </div>
      );
}

function OrderItem({order, index}){
    
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='w-[80%] text-md text-gray-600 my-1 flex items-center justify-between'>
        {index+1} <span className='font-bold text-gray-500'>Order ID: </span> {order.order_id} 
        <Link to={`/order/${order.order_id}`} target='_blank' ><button className={`p-1 rounded-xl bg-[#7e22ce] text-gray-300 font-semibold w-36`}>Order Details</button></Link>
         <StatusModal id={order.order_id} status={order.status} />
         
        </div>
    )
}

function PieChartContainer(){
    const {allOrders, isGettingOrders} = useGetOrders();
    const {isDarkMode} = useDarkModeContext();

     //pie chart data
     const ordersPending = allOrders?.filter(order => order.status !== 'delivered');
     const totalPendingOrders = ordersPending?.length;
     const cookingOrdersCount = ordersPending?.reduce((count, order) => {
         if (order.status === 'cooking your meal') {
             return count + 1;
         }
         return count;
     }, 0);
     const outForDeliveryOrdersCount = totalPendingOrders - cookingOrdersCount


     const dataLight = [
        {
          status: "cooking your meal",
          value: cookingOrdersCount,
          color: "#22c55e",
        },
        {
          status: "out for delivery",
          value: outForDeliveryOrdersCount,
          color: "#eab308",
        },
      ];
      
      const dataDark = [
        {
          status: "cooking your meal",
          value: cookingOrdersCount,
          color: "#15803d",
        },
        {
          status: "out for delivery",
          value: outForDeliveryOrdersCount,
          color: "#a16207",
        },
      ];

      const data = isDarkMode ? dataDark : dataLight;

    return(
        <div className='pieChart'>
            <h2>Pending Orders summary</h2>

            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                <Pie data={data} nameKey="status"  dataKey="value" innerRadius={0} outerRadius={110} cx="40%" cy="50%" paddingAngle={0} >
                    {data?.map(entry => <Cell fill={entry.color} stroke={entry.color} key={entry.status} />)}
                </Pie>
                <Legend verticalAlign="middle" align="right" width="30%" layout="vertical" iconSize={15} iconType="circle" />
                <Tooltip contentStyle={{ color: 'white' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

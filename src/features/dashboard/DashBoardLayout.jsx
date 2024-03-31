import React, { useEffect, useState } from 'react'
import './DashBoard.css'
import useGetOrders from '../orders/useGetOrders'
import Spinner from '../../ui/Spinner';
import getCurrentMonth from '../../utils/getCurrentMonth';
import useGetUsers from '../user/useGetUsers';
import Stats from './Stats';
import PendingOrders from './PendingOrders';
import {useNavigate} from 'react-router-dom'
import { useIsAdminContext } from '../../contexts/IsAdminContext';

export default function DashBoardLayout() {
    const {isAdmin} = useIsAdminContext();
    const navigate = useNavigate();

    if(!isAdmin) navigate('/')
    
    const {allOrders, isGettingOrders} = useGetOrders();
    
    const [currentMonthOrders, setCurrentMonthOrders] = useState([]);
    const [totalRevenueOfCurrentMonth, setTotalRevenueOfCurrentMonth] = useState(0);
    const [overallRevenue, setOverallRevenue] = useState(0);

    //pie chart data
    const ordersPending = allOrders?.filter(order => order.status !== 'Delivered');
    const totalPendingOrders = ordersPending?.length;
    const cookingOrdersCount = ordersPending?.reduce((count, order) => {
        if (order.status === 'cooking your meal') {
            return count + 1;
        }
        return count;
    }, 0);
    const outForDeliveryOrdersCount = totalPendingOrders - cookingOrdersCount
    
    //getting current month
    const currMonth = getCurrentMonth();
    console.log(currMonth)

    //getting current month orders
    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so add 1 to get the actual month number
        const currentMonthFormatted = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // Add leading zero if month is less than 10

        const filteredOrders = allOrders?.filter(order => {
            const orderDate = new Date(order.created_at);
            const orderYear = orderDate.getFullYear();
            const orderMonth = orderDate.getMonth() + 1;
            const orderMonthFormatted = orderMonth < 10 ? `0${orderMonth}` : orderMonth;

            return orderYear === currentYear && orderMonthFormatted === currentMonthFormatted;
        });

        setCurrentMonthOrders(filteredOrders);
    }, [allOrders]);
    
    //getting total revenue of current month
    useEffect(() => {
        const total = currentMonthOrders?.reduce((acc, order) => acc + parseFloat(order.price), 0);
        setTotalRevenueOfCurrentMonth(total);
    }, [currentMonthOrders]);

    //getting overall total revenue
    useEffect(() => {
        const total = allOrders?.reduce((acc, order) => acc + parseFloat(order.price), 0);
        setOverallRevenue(total);
    }, [allOrders]);


    //getting all users and number of users
    const {allUsers, isGettingUsers} = useGetUsers();
    const totalUsers = allUsers?.length;
    console.log("no of users: ",totalUsers)

    if(isGettingOrders || isGettingUsers) return <Spinner />
  return (
    <div className='w-[80vw]'>
      <Stats />
      <PendingOrders />
    </div>
  )
}

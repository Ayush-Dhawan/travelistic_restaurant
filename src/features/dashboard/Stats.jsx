import PropTypes from 'prop-types';
import Stat from './Stat';
import './DashBoard.css'
import useGetOrders from '../orders/useGetOrders'
import getCurrentMonth from '../../utils/getCurrentMonth';
import useGetUsers from '../user/useGetUsers';
import { FaUsers } from "react-icons/fa";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { getCurrentMonthOrders } from '../../utils/getCurrentMonthOrders';
import { useEffect, useState } from 'react';

export default function Stats({ bookings, confirmedStays, numDays, numCabins }) {
    const {allOrders} = useGetOrders();
    
    const [currentMonthOrders, setCurrentMonthOrders] = useState([]);
    const [totalRevenueOfCurrentMonth, setTotalRevenueOfCurrentMonth] = useState(0);
    const [overallRevenue, setOverallRevenue] = useState(0);

    
    //getting current month
    const currMonth = getCurrentMonth();
    console.log(currMonth)

    //getting current month orders
    useEffect(() => {
       if(allOrders) {
        const filteredOrders = getCurrentMonthOrders(allOrders);
        setCurrentMonthOrders(filteredOrders);}
    }, [allOrders]);

    console.log(currentMonthOrders, "from stats")
    
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
    const {allUsers} = useGetUsers();
    const totalUsers = allUsers?.length;
    console.log("no of users: ",totalUsers)


    return (
        <div className="stats-container">
            <Stat title='Total Revenue' color="blue" icon={<HiOutlineCurrencyDollar />} value={overallRevenue + "$"} />
            <Stat title={`Revenue ${currMonth}`} color="green" icon={<HiOutlineCurrencyDollar />} value={totalRevenueOfCurrentMonth + "$"} />
            <Stat title='Total Users' color="indigo" icon={<FaUsers />} value={totalUsers} />
        </div>
    );
}

Stats.propTypes = {
    bookings: PropTypes.array.isRequired,
    confirmedStays: PropTypes.array.isRequired,
    numDays: PropTypes.number.isRequired,
    numCabins: PropTypes.number.isRequired,
};

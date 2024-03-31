export function getCurrentMonthOrders(allOrders) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so add 1 to get the actual month number
    const currentMonthFormatted = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // Add leading zero if month is less than 10

    const currentMonthOrders = allOrders?.filter(order => {
        const orderDate = new Date(order.created_at);
        const orderYear = orderDate.getFullYear();
        const orderMonth = orderDate.getMonth() + 1;
        const orderMonthFormatted = orderMonth < 10 ? `0${orderMonth}` : orderMonth;

        return orderYear === currentYear && orderMonthFormatted === currentMonthFormatted;
    });

    return currentMonthOrders;
}

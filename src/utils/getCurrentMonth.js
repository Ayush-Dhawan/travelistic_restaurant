export default function getCurrentMonth() {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = months[currentMonthIndex];
  
    return currentMonth;
  }
  
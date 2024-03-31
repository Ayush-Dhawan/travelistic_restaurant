import supabase, { supabaseUrl } from "./supabase"

export function generateOrderId() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substr(2, 5).toUpperCase();
    const orderId = `${timestamp}${randomString}`;
  
    return orderId;
  }

  export async function getOrders(){
    
    let { data: requests, error } = await supabase
    .from('restaurant-orders')
    .select('*')

    if(error){
        console.log("error occured reading orders")
        return
    }
    return requests
}

export async function getOrderById(order_id) {
  let { data: order, error } = await supabase
    .from('restaurant-orders')
    .select('*')
    .eq('order_id', order_id)
    .single();

  if (error) {
    console.error(`Error fetching order with order_id ${order_id}:`, error.message);
    return null;
  }
  console.log("order from api", order)
  return order;
}

export async function updateOrderStatusById({order_id, newStatus}) {
  let { data: updatedOrder, error } = await supabase
    .from('restaurant-orders')
    .update({ status: newStatus })
    .eq('order_id', order_id)
    .single();

  if (error) {
    console.error(`Error updating status for order with order_id ${order_id}:`, error.message);
    return null;
  }
  
  console.log("Updated order:", updatedOrder);
  return updatedOrder;
}


export async function getItemsById(order_id) {
  let { data, error } = await supabase
    .from('restaurant-orders')
    .select('items')
    .eq('order_id', order_id)
    .single();

  if (error) {
    console.error(`Error fetching order with order_id ${order_id}:`, error.message);
    return null;
  }
  // console.log("order from api", order)
  return data.items;
}

export async function getOrderHistoryById(id){
  let {data, error} = await supabase
  .from('restaurant-orders')
  .select("*")
  .eq('user_id', id)

  if(error){
    console.log("error occured reading orders")
    return
}
  console.log(data)
  return data;
}




export async function placeOrder({order_id, items, status = "cooking your meal", price, address, phoneNumber, user_id}){

    const { data, error } = await supabase
    .from('restaurant-orders')
    .insert([
      {order_id, items, status, price, address, phoneNumber, user_id},
    ])
    .select()
  
    if (error) {
      console.error(error);
      throw new Error("Order could not be placed in server");
    }
    return data
  
  }
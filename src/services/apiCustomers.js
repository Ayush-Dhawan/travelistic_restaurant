import supabase, { supabaseUrl } from "./supabase"

export async function getCustomers(){
    
    let { data: customers, error } = await supabase
    .from('restaurant-users')
    .select('*')

    if(error){
        console.log("error occured reading guests")
        return
    }

    console.log(customers);

    return customers

}


export async function getIdbyEmail(email){
    let { data, error } = await supabase
    .from('restaurant-users')
    .select('id')
    .eq('email', email)
    .single();
    return Number(data.id)
}

export async function getAddressbyEmail(email){
  let { data, error } = await supabase
  .from('restaurant-users')
  .select('address')
  .eq('email', email)
  .single();
  return data.address;
}

export async function getNamebyEmail(email){
  let { data, error } = await supabase
  .from('restaurant-users')
  .select('fullName')
  .eq('email', email)
  .single();
  // console.log("ye hai naam: ", data.fullName)
  return data.fullName
}

export async function getPasswordbyEmail(email){
let { data, error } = await supabase
.from('restaurant-users')
.select('password')
.eq('email', email)
.single();
// console.log("ye hai naam: ", data.fullName)
return data.password
}

export async function doesEmailExist(email) {
  let { data, error } = await supabase
    .from('restaurant-users')
    .select('id')
    .eq('email', email)
    .single();

    console.log(data)

  return Boolean(data); // Returns true if the email exists, false otherwise
}

export async function insertCustomer({fullName, email, address, password}){

  const { data, error } = await supabase
  .from('restaurant-users')
  .insert([
    { fullName, email, address, password},
  ])
  .select()

  if (error) {
    console.error(error);
    throw new Error("Customer could not be added");
  }
  return data

}


export async function updateCustomer({fullName, email, address}){
  
    const { data, error } = await supabase
    .from('restaurant-users')
    .update({ fullName: fullName, address: address })
    .eq('email', email)
    .select()
    if (error) {
      console.error(error);
      throw new Error("Customer could not be updated");
    }
    return data;
}
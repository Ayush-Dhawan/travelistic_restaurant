import supabase, { supabaseUrl } from "./supabase"

export async function getMenu(){
    
    let { data: requests, error } = await supabase
    .from('restaurant')
    .select('*')

    if(error){
        console.log("error occured reading requests")
        return
    }

    // console.log(guests);

    return requests

}

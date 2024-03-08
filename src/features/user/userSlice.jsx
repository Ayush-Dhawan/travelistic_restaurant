import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    username: '',
    email: '',
    address: '',
    isLoggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action){
            const {fullName, email, address, isLoggedIn} = action.payload;
            state.username = fullName;
            state.email = email;
            state.address = address;
            state.isLoggedIn = isLoggedIn;

            const updatedState = {
                fullName,
                email,
                address,
                isLoggedIn,
              };

              console.log(updatedState)
                // Convert the state object to a JSON string and store it in local storage
            localStorage.setItem("userState", JSON.stringify(updatedState));
        }
    }
})


export const {updateUser} = userSlice.actions;
export default userSlice.reducer;
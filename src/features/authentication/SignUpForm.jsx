// Import React and other necessary modules
import  cn  from '../../utils/cn'
import React, { useState } from "react";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/input";
import { NavLink } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import { useAddCustomers } from '../../hooks/useAddCustomers';
import { doesEmailExist } from '../../services/apiCustomers';
import {useDispatch} from 'react-redux'
import { updateUser } from '../user/userSlice';
import {useNavigate} from 'react-router-dom'
 


// Define the SignupFormDemo component
function SignupForm() {
  const {addCustomer, isAddingCustomer} = useAddCustomers();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Define the submit handler function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.elements.fullName.value;
    const email = e.target.elements.email.value;
    const EnteredPassword = e.target.elements.password.value;
    const ConfirmedPassword = e.target.elements.confirmpassword.value;
    const address = e.target.elements.address.value;

    const password = await bcrypt.hash(EnteredPassword, 10)

    const emailExisting = await doesEmailExist(email)
    
    if(emailExisting){
      alert("This email is already registered")
    }
    else if(EnteredPassword === ConfirmedPassword){
      addCustomer({fullName, email, address, password})
      const isLoggedIn = true;
      dispatch((updateUser({fullName, email, address, isLoggedIn})))
      alert("added")
      navigate("/menu")
    }else{
      alert("Password and confirm password fields do not match")
    }
  };

  // Return the JSX content of the component
  return (
    <div className='h-screen w-screen flex items-center justify-center '>
        <div className="w-[26rem] md:w-[50vw]  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-950 dark:bg-black">
      <h2 className="font-bold text-xl text-[#3730a3]  dark:text-neutral-200 bg-slate-950">
        Welcome to Travelistic Restaurant!
      </h2>

      <form className="my-8 bg-slate-950 text-white" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row bg-slate-950 text-white space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className="bg-slate-950">
            <Label htmlFor="fullName" className="bg-slate-950 text-gray-400">Full name</Label>
            <Input id="fullName"  className="bg-gray-900 text-gray-500" placeholder="Your name" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4 bg-slate-950 text-gray-400">
          <Label htmlFor="email"className="bg-slate-950 text-gray-400">Email Address</Label>
          <Input id="email" className="bg-gray-900 text-gray-500" placeholder="example@gmail.com" type="email" required />
        </LabelInputContainer>
       <div className='flex flex-col md:flex-row bg-slate-950'>
       <LabelInputContainer className="mb-4 bg-slate-950 text-gray-400">
          <Label htmlFor="password" className="bg-slate-950 text-gray-400">Password</Label>
          <Input id="password" className="bg-gray-900 text-gray-500" placeholder="••••••••" type="password" required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 bg-slate-950 text-gray-400">
          <Label htmlFor="confirmpassword" className="bg-slate-950 text-gray-400">Confirm Password</Label>
          <Input id="confirmpassword" className="bg-gray-900 text-gray-500" placeholder="••••••••" type="password" required/>
        </LabelInputContainer>
       </div>
        <LabelInputContainer className="mb-8 bg-slate-950">
          <Label htmlFor="address" className="bg-slate-950 text-gray-400">Your address</Label>
          <Input
            id="address"
            className="bg-gray-900 text-gray-500"
            placeholder="We will deliver here"
            required
            type="text"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-[#312e81]  to-[#6366f1] block  w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isAddingCustomer}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-[#6366f1] dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    <center className='bg-slate-950'><NavLink to="/signIn"><span className='bg-slate-950 text-[#6366f1] cursor-pointer w-[50%] md:w-[35%]'>Already have an account?</span></NavLink></center>
      </form>
    </div>

    </div>
  );
}

// Define the BottomGradient component
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Define the LabelInputContainer component
const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

// Export the SignupFormDemo component
export default SignupForm;

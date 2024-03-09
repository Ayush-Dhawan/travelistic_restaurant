
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {QueryClient,   QueryClientProvider} from '@tanstack/react-query'
import './App.css';

import MenuGrid from './features/menu/MenuGrid';
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import SignupForm from "./features/authentication/SignUpForm";
import SigninForm from "./features/authentication/SignInForm";
import Cart from "./features/cart/Cart";
import { DarkModeContextProvider } from "./contexts/DarkmodeContext";
import UpdateUserForm from "./features/user/updateUserForm";
import NewOrder from "./pages/NewOrder";
import OrderDetail from "./features/orders/OrderDetail";
import OrderHistory from "./features/orders/OrderHistory";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60*1000
      staleTime: 0
    }
  }
})

function App() {
  const test = false;
  return (
    <QueryClientProvider client={queryClient}>
        <DarkModeContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}  />
              <Route path = '/menu' element={<Menu />}  />
              <Route path="/signUp" element={ <SignupForm />} />
              <Route path="/signIn" element={<SigninForm />} />
              <Route path="/settings" element={<UpdateUserForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order/new" element={<NewOrder />} />
              <Route path="/order/:order_id" element={<OrderDetail />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
            </Routes>
          </BrowserRouter> 
        </DarkModeContextProvider>
    </QueryClientProvider>
  );
}

export default App;

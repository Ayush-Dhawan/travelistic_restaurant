
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {QueryClient,   QueryClientProvider} from '@tanstack/react-query'
import './App.css';
import MenuGrid from './features/menu/MenuGrid';
import Home from "./pages/Home";
import Menu from "./pages/Menu";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60*1000
      staleTime: 0
    }
  }
})

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path = '/menu' element={<Menu />}  />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

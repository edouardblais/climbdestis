import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import Map from './components/map/Map.jsx';
import Login from './components/login/Login.tsx';
import Register from './components/login/Register.jsx';
import './App.css';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Map/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

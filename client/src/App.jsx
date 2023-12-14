import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Map from './components/map/Map'
import './App.css';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Map/>} />
              <Route path="/area/:area" element={<Map/>} />
              <Route path="/destination/:destination_id" element={<Map/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

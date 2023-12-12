import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from './map/map/Map'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Map/>} />
            <Route path="/area/:area" element={<Map/>} />
            <Route path="/destination/:destination_id" element={<Map/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

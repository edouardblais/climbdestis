import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Map from './map/map/Map'

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

import Comments from "./Layout/Comments";
import Products from "./Layout/Products";
import Home from './Layout/Home'
import Nav from "./Layout/Nav";
import VariablesEntorno from "./Layout/Variables";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./Layout/Cart";
import RutaProtegida from "./RutaProtegida";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useRequest from './hooks/useRequest';

function App() {
  const home = (useLocation().pathname === '/login');
  const user = useSelector((state) => state.administrador);


  return (
    <div className="App">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
        <Nav home />
        <Routes>
          <Route path="/" element={<RutaProtegida user={user}><Products /></RutaProtegida>} />
          <Route path="/login" element={<Home />} />
          <Route path="/ordenes" element={<RutaProtegida user={user}><Cart /></RutaProtegida>} />
          <Route path="/variables" element={<RutaProtegida user={user}><VariablesEntorno /></RutaProtegida>} />

        </Routes>
      </div>
      <Comments home className={home && "hidden "} />
    </div>
  );
}

export default App;

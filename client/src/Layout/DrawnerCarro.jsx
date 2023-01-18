import carro from '../assets/carro-logo.svg'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleDrawner } from "../redux/EditorSlice";
import { useEffect } from 'react';
import { deleteCart } from "../redux/carroSlice";
import useRequest from '../hooks/useRequest';
import { useNavigate } from "react-router-dom";

const DrawnerCarro = () => {
  const carrito = useSelector((state) => state.carro.carrito);
  const usuario = useSelector((state) => state.administrador);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doSend, errors } = useRequest({
    url: "/api/ordenes",
    method: "post",
    body: { orden: carrito, usuario  },
    onSuccess: (usr) => {        
            dispatch(deleteCart())        
    }
}); 
  const handleBuy = ()=>{
    doSend();
  }

  if (!carrito) { return <h1>Cargando...</h1> }
  return (
    <div id="drawer-carro" className="flex flex-col absolute z-40 h-full right-0 p-4 mt-40 overflow-y-auto bg-white w-96" tabIndex="-1" aria-labelledby="drawer-right-label">
      <h5 id="drawer-label" className="inline-flex items-center mb-4 text-lg mb-12 font-semibold text-gray-500 dark:text-gray-400">
        <img src={carro} className="w-10 mr-4" /> Carro de Compras</h5>
      {carrito.length > 0 &&
        carrito.map((obj) => {
          console.log('Carro', obj);
          return (
            <li>{obj.producto} - {obj.precio}</li>
          )
        })
      }
      {carrito.length < 1 && <h3>Todavia no compro nada</h3>}
      <button
        className=" mt-10 text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
        onClick={handleBuy}
        disabled={carrito.length < 1}
      >
        Comprar
      </button>
      <button
        className=" mt-10 text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
        onClick={()=>navigate('/ordenes')}
      >
        Ver historial de Ordenes
      </button>
    </div>
  );
};

export default DrawnerCarro;

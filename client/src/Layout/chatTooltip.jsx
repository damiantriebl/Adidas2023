import React, { useState, useEffect } from 'react'
import useSocket from '../hooks/useSockect'
import useLocalStorage from '../hooks/useLocalStorage'
const chatTooltip = ({textos, isConnected}) => {
    const [mensaje, setMensaje] = useState("");
    const [user, setUser] = useLocalStorage("user", "");
   
    const { doRequest } = useSocket({
        room: 'recibir',
        body: {
          mensaje,
          email: user.email,
          nombre: user.email
        },
      });
   
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {          
            doRequest();
        }
      }
   
    return (
        <div className='bg-slate-800 p-5 rounded mb-4	'>
            <div className="relative z-0 mb-6 w-full group">
                <input
                    type="text"
                    name="password"
                    id="password"
                    className=" block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onKeyDown={handleKeyDown}
                    onChange={e => setMensaje(e.currentTarget.value)}
                    required
                />
                <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Chat
                </label>
            </div>
    
             {!isConnected && <div>El sistema de chat esta offline</div>}
            
            {textos && !textos[0][0]?.listaComentada?.length > 0 && <p className='text-gray-100'>No hay productos</p>  }
            {textos && textos[0][0]?.listaComentada?.length > 0 && textos[0][0]?.listaComentada?.map((obj, idx)=>{
                if(idx > (textos[0][0]?.listaComentada?.length - 7 )){
                    return <>
                                <p className='text-gray-100'>{obj.mensaje}</p>
                                <p className='text-gray-400'>{obj.email}</p>
                        </>

                    }
            })} 
        </div>
    )
}
export default chatTooltip;
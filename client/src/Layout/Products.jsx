import { useId } from "react";
import { useState, useEffect } from "react";
import Product from './Product';
import ModalConfirm from "./modalConfirm";
import useRequest from '../hooks/useRequest';
import useLocalStorage from '../hooks/useLocalStorage';
import { useDispatch, useSelector } from "react-redux";
import { addProductos, addCart, initCart } from '../redux/carroSlice'
import { setCredentials } from "../redux/AdministradorSlice";
import ChatIcon from "../assets/chatIcon";
import { Button, Tooltip } from 'flowbite-react'
import ChatTooltip from "./chatTooltip";
import useSocket from "../hooks/useSockect";

const productos = (props = []) => {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.carro.productos)
    const error = useSelector((state) => state.err);
    const [user, setUser] = useLocalStorage("user", "");
    const [chatModal, setChatModal] = useState(false)
    const { isConnected, received } = useSocket({
        listen: 'chatMessage',
    })
    const [textos, setTextos] = useState(received);
    useEffect(() => {
        if (isConnected && received.length > 0) {
            setTextos(received)
        }
    }, [received])
    const { doSend, errors } = useRequest({
        url: "/api/productos",
        method: "get",
        onSuccess: (obj) => {
            if (obj.success) {
                dispatch(addProductos(obj.data))
            } else {
                console.log('no hay productos')
            }
        }
    });
 
    const { doSend: doCart, errors: errorCart } = useRequest({
        url: `/api/carro/${user.id}`,
        method: "get",
        onSuccess: (obj) => {
            if (obj.carro.success) {
                dispatch(initCart(obj.carro.data))
            } else {
                console.log('no hay productos')
            }
        }
    });
    useEffect(() => {
        doSend()
    }, [])
    useEffect(() => {
        if (user) {
            doCart()
        }
    }, [])
    useEffect(() => {
        if (user) {
            dispatch(setCredentials(user))
        }
    }, [])
    const handleChatModal = () => {
        setChatModal(!chatModal)
    }
    const id = useId();
    if (productos.length === 0) {
        return <div>Cargando...</div>
    }
    return (
        <div className="p-5 flex flex-wrap justify-around	">
            <ModalConfirm />
            {error?.error &&
                <div class="p-4 mt-20 mb-4 w-full text-center  text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <span class="font-medium">{error.error}</span>
                </div>}
            <div className="fixed z-90 w-56 bottom-10 right-50">
            {chatModal && <ChatTooltip isConnected={isConnected} textos={textos}/>}
                <Button onClick={handleChatModal} className="fixed  bg-blue-600 w-56 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300">
                    <ChatIcon className="w-8 h-8" />        
                </Button>
                
            </div>    
            {productos.map((obj, index) => {
                return (
                    <Product key={`${id}-${index}`} producto={obj.producto} precio={obj.precio} thumbnail={obj.thumbnail} id={obj.id} />
                )
            })}
        </div>
    )
}
export default productos;
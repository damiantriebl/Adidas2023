import useRequest from '../hooks/useRequest';
import { setCredentials } from "../redux/AdministradorSlice";
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addOrdenes } from '../redux/carroSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useLocalStorage("user", "");
    const ordenes = useSelector((state) => state.carro.ordenes);
    const { doSend, errors } = useRequest({
        url: `/api/ordenes/${user.id}`,
        method: "get",
        onSuccess: (obj) => {
            if (obj.ok) {
                dispatch(addOrdenes(obj.ordenes.data))
            }
        }
    });

    useEffect(() => {
        doSend()
    }, [])
    return (
        <div className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12'>
            <h1 className="text-lg">Carro de compras</h1>
            {ordenes?.map((orden) => {
                return (<div>
                    <ul className='border-cyan-600 border-4 rounded-md m-8 p-4 w-auto'>
                        <h1>Fecha: {orden.dateOfJoining}</h1>
                        <div className='flex flex-row'>
                            {orden.orden.map(valorOrden => <li><img className='w-40 h-40 m-10 ' src={valorOrden.thumbnail} title={valorOrden.producto} /></li>)}
                        </div>
                    </ul>
                </div>)
            })}
        </div>
    )
}

export default Cart

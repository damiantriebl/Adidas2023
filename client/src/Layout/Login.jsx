import {useState} from 'react';
import useRequest from '../hooks/useRequest';
import useLocalStorage from '../hooks/useLocalStorage';

import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../redux/AdministradorSlice'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = ({setIsLogin}) => {
    const [user, setUser] = useLocalStorage("user", "");
    const [parametro, setparametro] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
       if( user ){
            dispatch(setCredentials(user))
            navigate("/");
       }
    },[])
    const { doSend, errors } = useRequest({
        url: "/api/login",
        method: "post",
        body: { email: parametro.email, password: parametro.password },
        onSuccess: (usr) => {
            if (usr) {
                setUser(usr.body)
                dispatch(setCredentials(usr.body))
                navigate("/");

            } else {
                dispatch(setError(usr.message))
            }
        }
    });
    const handleLogin = (e)=> {
        doSend();
    }
 
    return (
        <>
            <div className="relative z-0 mb-6 w-full group">
                <input
                    type="text"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={e => setparametro({...parametro, email: e.currentTarget.value})}
                    placeholder=""
                    value={parametro.email}
                    required
                />
                <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    email
                </label>
            </div>

            <div className="relative z-0 mb-6 w-full group">
                <input
                    type="text"
                    name="password"
                    id="password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={e => setparametro({...parametro, password: e.currentTarget.value})}
                    value={parametro.password}
                    required
                />
                <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Contraseña
                </label>
            </div>
            <button
                type="button"
                onClick={handleLogin}
                className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Ingresar

            </button>
            <div className=" text-sm text-gray-500 my-10">
                        O si necesitas una cuenta nueva
                    </div>
                    <button
                        type="button"
                        onClick={setIsLogin}
                        className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Darse de alta
                    </button>
        </>

    )
}
export default Login;
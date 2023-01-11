import { FileInput, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toggleAdministrador } from "../redux/AdministradorSlice";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {setError} from '../redux/ErrorSlice'
const SingUp = ({ setIsLogin }) => {
    const [parametro, setparametro] = useState({ email: '',RepeatPassword: '', password: '', nombre: '', edad: 0, direccion: '', telefono:0 });
    const [files, setFiles] = useState([]);
    const administrador = useSelector((state) => state.administrador.value);
    const [valido, setValido] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async (e) => {
        const formData = new FormData();
        if(RepeatPassword.value === password.value){
//            formData.append('file', files)
            formData.append("email", parametro.email)
            formData.append("password", parametro.password)
            formData.append("nombre", parametro.nombre)
            formData.append("edad", parametro.edad)
            formData.append("telefono", parametro.telefono)
            formData.append("direccion", parametro.direccion)
            formData.append("isAdmin", administrador ?? true)
        }else{
            dispatch(setError("el usuario y el password no son iguales"))
        }


        try {
            const res = await axios.post('https://backend-production-e99b.up.railway.app/api/signup', formData);
            setValido(true)
        } catch (err) {
            if (err.response?.status === 500) {
                console.log(err);
            } else {
                dispatch(setError(`Error ${err.response.data.msg}`))
            }
        }
    }

    const renderForm = () => {
        console.log('is Admin', parametro.isAdmin)
        return (
        <form>
            <div className="relative z-0 mb-6 w-full group">
                <label
                    htmlFor="checked-toggle"
                    className="inline-flex relative items-center cursor-pointer"
                >
                    <input
                        type="checkbox"
                        value={administrador}
                        id="checked-toggle"
                        className="sr-only peer"
                        onChange={() => dispatch(toggleAdministrador())}
                        checked={administrador}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Administrador
                    </span>
                </label>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email"
                            value="Email"
                        />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="usuainBolt@google.com"
                        value={parametro.email}
                        onChange={e => setparametro({ ...parametro, email: e.currentTarget.value })}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password"
                            value="Password"
                        />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="**"
                        value={parametro.password}
                        onChange={e => setparametro({ ...parametro, password: e.currentTarget.value })}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="RepeatPassword"
                            value="Repetir Password"
                        />
                    </div>
                    <TextInput
                        id="RepeatPassword"
                        type="password"
                        placeholder="**"
                        value={parametro.RepeatPassword}
                        onChange={e => setparametro({ ...parametro, RepeatPassword: e.currentTarget.value })}
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="nombre"
                            value="Nombre"
                        />
                    </div>
                    <TextInput
                        id="nombre"
                        type="nombre"
                        placeholder="Usuain Bolt"
                        value={parametro.nombre}
                        onChange={e => setparametro({ ...parametro, nombre: e.currentTarget.value })}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="direccion"
                            value="Direccion"
                        />
                    </div>
                    <TextInput
                        id="direccion"
                        type="direccion"
                        placeholder="en la pista nº 42"
                        value={parametro.direccion}
                        onChange={e => setparametro({ ...parametro, direccion: e.currentTarget.value })}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="edad"
                            value="Edad"
                        />
                    </div>
                    <TextInput
                        id="edad"
                        type="number"
                        placeholder="en la pista nº 42"
                        value={parametro.edad}
                        onChange={e => setparametro({ ...parametro, edad: e.currentTarget.value })}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="Telefono"
                            value="Telefono"
                        />
                    </div>
                    <TextInput
                        id="Telefono"
                        type="number"
                        placeholder="02262 55 55 63 48"
                        value={parametro.telefono}
                        onChange={e => setparametro({ ...parametro, telefono: e.currentTarget.value })}
                    />
                </div>
                <div id="fileUpload">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="file"
                            value="Upload file"
                        />
                    </div>
                    <FileInput
                        id="file"
                        disabled={!!files.length}
                        type="file"
                        onChange={(e) => setFiles(e.target.files[0])}
                        helperText="A profile picture is useful to confirm your are logged into your account"
                    />
                </div>

            </div >
            <div className='w-100 text-center'>
                <button
                    type="button"
                    onClick={onSubmit}
                    className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Cargar el usuario
                </button>
            </div>
        </form >
        )
    }
    const renderOk = () => {
        return(
        <>
            <h1>El usuario se registro correctamente, por favor entre por primera ves</h1>
            <button
                type="button"
                onClick={()=>navigate('/')}
                className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                El usuario
            </button>
        </>)
    }
    return (
        <>
            {valido ? renderOk() : renderForm()}
            {!valido && <>
                <div className=" text-sm text-gray-500 my-5">
                        O si ya tenes cuenta
                    </div>
                    <button
                        type="button"
                        onClick={setIsLogin}
                        className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Loguearse
                    </button>
            </>}
        </>

    )


}
export default SingUp
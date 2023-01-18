import logo from "../assets/adidas-logo.svg";
import useRequest from '../hooks/useRequest';
import DrawnerForm from "./DrawnerForm";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/AdministradorSlice";
import { toggleDrawnerCarro, addCart, initCart } from "../redux/carroSlice";
import { toggleDrawner, updateBody } from "../redux/EditorSlice";
import DrawnerCarro from "./DrawnerCarro";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const Nav = ({ home }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useLocalStorage('user', null)
  const administrador = useSelector((state) => state.administrador);
  const openDrawner = useSelector((state) => state.editor.openDrawner);
  const openDrawnerCarro = useSelector((state) => state.carro.openDrawnerCarro);
  const carrito = useSelector((state) => state.carro.carrito);
  const { doSend: doLogout, errors: errorsLogout } = useRequest({
    url: `/api/logout/`,
    method: "get",
    body: {},
    onSuccess: () => { 
      dispatch(logOut());
      setUsuario(null)
      navigate("/login");
    }
  });

  const handleNew = () => {
    dispatch(
      updateBody({
        id: null,
        producto: "",
        precio: 0,
        thumbnail: "",
        edit: false,
      })
    );
    dispatch(toggleDrawner());
    ;
  }
  const handleCarro = () => {
    dispatch(toggleDrawnerCarro());
  }
  const handleDesloguear = () => {
    doLogout()
  }


  return (
    <>
      {openDrawner && <DrawnerForm open={openDrawner} />}
      {openDrawnerCarro && <DrawnerCarro carro={carrito} />}

      <nav className={home && "hidden" && "bg-white px-2 sm:px-4 py-2  mb-10 fixed w-full z-20 top-0 left-0 border-b border-gray-200"}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <img src={logo} className="w-16 h-16 " alt="Adidas" />
          <h1 className="mx-4 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r  from-sky-600 to-blue-500">
            Adidas 2023
          </h1>
          {location.pathname === "/" && <>
            <button
              className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
              onClick={handleCarro}
            >
              {!openDrawnerCarro ? <p>Ver Carro</p> : <p>Cerrar Carro</p>}
            </button>
            {console.log(administrador)}
            {administrador?.isAdmin &&              
                <button
                  className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
                  onClick={handleNew}
                >
                  Ingresar Producto
                </button>
              }
                <button
                  className=" text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
                  onClick={handleDesloguear}
                >
                  Desloguearse
                </button>
          </>
          }
        </div>
      </nav>
    </>
  );
};
export default Nav;

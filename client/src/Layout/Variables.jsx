import { useState, useEffect } from 'react';
import useRequest from '../hooks/useRequest';

const VariablesEntorno = () => {

    const [variables, setVariables] = useState();
    const { doSend, errors } = useRequest({
        url: `/api/variables`,
        method: "get",
        onSuccess: (variablesEntorno) => {        
            setVariables(variablesEntorno)
        }
    }); 
    useEffect(()=> {
        doSend();
    }, [])
    const getVariables = vars => {
        let content = [];
        for (let [key, value] of  Object.entries(vars)) {
          content.push(<p className="p-2" key={key}><span>{key}</span>: {value}</p>);
        }
        return content;
      };
    return (
        <>
         <h1 className="mt-16 ml-5 mb-3 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r  from-sky-600 to-blue-500">
            Variables de Entorno            
          </h1>
          <div className="m-8">
          {variables && getVariables(variables)}
          </div> 
        </>
    )
}
export default VariablesEntorno;
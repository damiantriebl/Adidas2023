import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError } from "../redux/ErrorSlice";
import { useSelector } from 'react-redux'
import useLocalStorage from './useLocalStorage.js'

const useRequest = ({ url, method, body, onSuccess, headers = "" }) => {
  const [user, setUser] = useLocalStorage("user", "");

  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  let config = {
      headers: {
        authorization: user?.token ?? '',
        "Access-Control-Allow-Origin" : '*',
        "Access-Control-Allow-Methods":'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };
  
  const doSend = async (props = {}) => {
    setErrors(null);
    const formatUrl = `https://back-production-1bdc.up.railway.app${url}`;
    try {
      const response = await axios[method](formatUrl, { ...props, ...body, ...config });
      if (response) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
  return { doSend, errors }; 
};
export default useRequest;

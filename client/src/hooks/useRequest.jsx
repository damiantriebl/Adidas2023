import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError } from '../redux/ErrorSlice'

const useRequest = ({ url, method, body, onSuccess, headers = '' }) => {
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const doSend = async (props = {}) => {
    setErrors(null);
    const formatUrl = `https://backend-production-e99b.up.railway.app/${url}`;
    try {
      const response = await axios[method](formatUrl, { ...props, ...body })
      if (response) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      dispatch(setError(err.message))
    }

  };
  return { doSend, errors };
};
export default useRequest;

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from './AdministradorSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://backend-production-e99b.up.railway.app/',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})
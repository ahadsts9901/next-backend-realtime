import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from "./user"

const UserWrapper = ({ children }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await // get user profile on page reload and set it to redux
                dispatch(login(response.data.data))
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser()

    }, [])


    return (
        <>{children}</>
    )
}

export default UserWrapper
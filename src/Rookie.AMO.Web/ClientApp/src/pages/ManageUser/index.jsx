import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import apiCaller from '../../apis/CallerApi'
import *as action from '../../actions/ManageUser/ActionType'
import UserList from '../../components/User/UserList'
import UserItem from '../../components/User/UserItem'
function ManageUser() {
    const userReducer = useSelector(state => state.userReducer)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     async function fetchUsers() {
    //         const res = await apiCaller('users', 'GET', null);
    //         dispatch({ type: action.FETCH_USERS, payload: res });
    //     }    
    //     fetchUsers()
    // }, [])
    // console.log(users);

    const showUsers = () => {
        let result = null
        if (userReducer.length > 0) {
            result = userReducer.map((user, index) => {
                return (
                    <UserItem
                        key={index}
                        user={user}
                        index={index}
                    />
                )
            })
        }
        return result
    }

    return (
        <UserList>{showUsers()}</UserList>
    )
}

export default ManageUser

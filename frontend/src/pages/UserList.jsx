import axios from 'axios';
import React, { useContext, useReducer } from 'react'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../context/Store';
import userListReducer from '../context/userListReducer';
import { getError } from '../utils/util';

const UserList = () => {
    const [{ loading, error, users, loadingDelete, successDelete }, dispatch] = useReducer(userListReducer, {
        loading: true,
        error: '',
    })
    const navigate = useNavigate();

    const { state } = useContext(Store)
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get('/api/users',
                    { headers: { authorization: `Bearer ${userInfo.token}` } }
                )
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAILED' });
                toast.error(getError(err))
            }
        }
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        } else { fetchData(); }
    }, [userInfo, successDelete])

    const deleteUser = async (user) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                dispatch({ type: 'DELETE_REQUEST' });
                await axios.delete(`/api/users/${user._id}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                toast.success('user has been deleted successfully')
                dispatch({ type: 'DELETE_SUCCESS' });
            } catch (err) {
                dispatch({ type: 'DELETE_FAIL' });
                toast.error(getError(err))
            }
        }
    }
    return (
        <div>
            <Helmet><title>Users</title></Helmet>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {loading ? <LoadingBox />
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>IS ADMIN</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? "Yes" : "No"}</td>
                                        <td>
                                            <Button type='button'
                                                variant='light'
                                                onClick={() => navigate(`/admin/user/${user._id}`)}
                                            >Edit</Button>&nbsp;
                                            <Button type='button'
                                                variant='light'
                                                onClick={() => deleteUser(user)}
                                            >Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
            }
        </div>
    )
}

export default UserList

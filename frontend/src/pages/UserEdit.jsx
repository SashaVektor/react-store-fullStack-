import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../context/Store';
import userEditReducer from '../context/userEditReducer';
import { getError } from '../utils/util';

const UserEdit = () => {
    const [{ loading, error, loadingUpdate}, dispatch] = useReducer(userEditReducer, {
        loading: true,
        error: '',
    })
    const { state } = useContext(Store)
    const { userInfo } = state;

    const params = useParams();
    const {id: userId} = params;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                dispatch({ type: 'FETCH_REQUEST' });
                const {data} = await axios.get(`/api/users/${userId}`, 
                    {headers: {authorization: `Bearer ${userInfo.token}`}}
                )
                setEmail(data.email);
                setName(data.name);
                setIsAdmin(data.isAdmin);
                dispatch({ type: 'FETCH_SUCCESS' });
            }catch(err){
                dispatch({ type: 'FETCH_FAILED' });
                toast.error(getError(err))
            }
        }
        fetchData();
    },[userId, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
             await axios.put(`/api/users/${userId}`, {_id: userId, email, name, isAdmin},
                {headers: {authorization: `Bearer ${userInfo.token}`}}
            )
            dispatch({ type: 'UPDATE_SUCCESS' });
            toast.success("User updated success")
            navigate('/admin/users')
        }catch(err){
            dispatch({ type: 'UPDATE_FAIL' });
            toast.error(getError(err)) 
        }
    }

  return (
    <Container className='small-container'>
    <Helmet><title>Edit User ${userId}</title></Helmet>
    <h1>Edit User ${userId}</h1>
    {loading ? <LoadingBox />
    : error ? <MessageBox variant="danger">{error}</MessageBox>
    : (
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control value={name}
                onChange={e => setName(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email' type="email">
                <Form.Label>Email</Form.Label>
                <Form.Control value={email}
                onChange={e => setEmail(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Check className='mb-3' type='checkbox' id="isAdmin" 
            label = "isAdmin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
            <div className='mb-3'>
                <Button disabled={loadingUpdate} type="submit">Update</Button>
                {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
        </Form>
    )
    }
</Container>
  )
}

export default UserEdit

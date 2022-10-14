import React, { useContext, useReducer, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Store } from '../context/Store'
import { Button } from 'react-bootstrap'
import { profileReducer } from '../context/profileReducer'
import { toast } from 'react-toastify'
import { getError } from '../utils/util'
import axios from 'axios'

const Profile = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state

    const [email, setEmail] = useState(userInfo.email);
    const [name, setName] = useState(userInfo.name);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(profileReducer, {
        loadingUpdate: false,

    })

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/users/profile`, { name, email, password },
                { headers: {Authorization: `Bearer ${userInfo.token}`}}
            )
            dispatch({type: 'UPDATE_SUCCESS', })
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
        }catch (err) {
    dispatch({ type: 'FETCH_FAIL' })
    toast.error(getError(err))
}
     }
return (
    <div className='container small-container'>
        <Helmet>
            <title>User Profile</title>
        </Helmet>
        <h1 className='my-3'>User Profile</h1>
        <form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password"
                    required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <div className='mb-3'>
                <Button type='submit'>Update</Button>
            </div>
        </form>
    </div>
)
}

export default Profile

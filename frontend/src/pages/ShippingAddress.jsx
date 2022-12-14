import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import CheckOut from '../components/CheckOut'
import { Store } from '../context/Store'

const ShippingAddress = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctsDispatch } = useContext(Store);
    const { userInfo, fullBox, cart: { shippingAddress } } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [navigate, userInfo])
    const handlerSubmit = e => {
        e.preventDefault();
        ctsDispatch({
            type: 'SAVE_SHOPPING_ADDRESS',
            payload: {
                fullName, address, city, postalCode, country,
                location: shippingAddress.location
            }
        })
        localStorage.setItem('shippingAddress', JSON.stringify({
            fullName, address, city, postalCode, country,
           location: shippingAddress.location
        }))
        navigate('/payment')
    }

    useEffect(() => {
        ctsDispatch({ type: 'SET_FULLBOX_OFF' })

    }, [ctsDispatch, fullBox])
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckOut step1 step2></CheckOut>
            <div className='container small-container'>
                <h1 className='my-3'>Shipping Address</h1>
                <Form onSubmit={handlerSubmit}>
                    <Form.Group className='mb-3' controlId='fullName'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='Address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='City'>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country}
                            onChange={e => setCountry(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className='mb-3'> 
                        <Button variant='light' type="button" id="chooseMap"
                           onClick={() => navigate('/map')}>
                            Choose Location on Map
                        </Button>
                        {shippingAddress.location && shippingAddress.location.lat ?(
                            <div>
                                LAT: {shippingAddress.location.lat}
                                LNG: {shippingAddress.location.lng}
                            </div>)
                            : (
                                <div>No location</div>
                            )
                            }
                    </div> 
                    <div className='mb-3'>
                        <Button variant='primary' type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ShippingAddress

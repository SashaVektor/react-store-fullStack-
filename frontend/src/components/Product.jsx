import { Button } from 'react-bootstrap'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Rating from './Rating'
import axios from 'axios'
import { Store } from '../context/Store'


const Product = ({ item }) => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const addToCardHandler = async (item) => {
        const existItem = cartItems.find(x => x._id === item._id)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock')
            return;
        }
        ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } })
    }
    return (
        <Card className="product" key={item.slug}>
            <Link to={`/product/${item.slug}`}>
                <img src={item.image} alt={item.name} className='card-img-top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${item.slug}`}>
                    <Card.Title>{item.name}</Card.Title>
                </Link>
                <Rating rating={item.rating} numRevievs={item.numRevievs} />
                <Card.Text>$ {item.price}</Card.Text>
                {item.countInStock === 0 ? <Button variant='light' disabled>Out of stock</Button>
                    : <Button onClick={() => addToCardHandler(item)}>Add to cart</Button>}
            </Card.Body>
        </Card>
    )
}

export default Product

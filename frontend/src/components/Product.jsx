import { Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Rating from './Rating'

const Product = ({ item }) => {
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
                <Button>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}

export default Product

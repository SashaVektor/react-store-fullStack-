import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import reducerProduct from '../context/fetchProduct'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge, Button, Card, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils/util'
import { Store } from '../context/Store'

const ProductPage = () => {
  const params = useParams()
  const { slug } = params;
  const navigate = useNavigate()

  const [{ loading, error, product }, dispatch] = useReducer((reducerProduct), {
    product: [],
    loading: true,
    error: '',
  })
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(err) })
      }
    }
    fetchData();
  }, [slug])

  const {state, dispatch: ctxDispatch} = useContext(Store); 
  const {cart} = state;
  const addToCart = async () => {
    const existItem = cart.cartItems.find(x => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`)
    if(data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return;
    }
    ctxDispatch({type: "CART_ADD_ITEM", payload: {...product, quantity}})
    navigate('/cart')
  }
  return (
    loading ? <LoadingBox /> :
      error ? <MessageBox variant="danger">{error}</MessageBox>
        : <div>
          <Row>
            <Col md={6}>
              <img src={product.image} className="img-large" alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={product.rating} numRevievs={product.numRevievs}></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: <p>{product.price}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status: </Col>
                        <Col>
                          {product.countInStock > 0
                            ? <Badge bg="success">In Stock</Badge>
                            : <Badge bg="danger">Unavailible</Badge>
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <div className='d-grid'>
                            <Button variant='primary' onClick={addToCart}>Add to cart</Button>
                          </div>
                        </ListGroup.Item>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
  )
}

export default ProductPage

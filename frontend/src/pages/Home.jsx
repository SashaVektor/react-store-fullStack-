import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import logger from 'use-reducer-logger'
import { useReducer } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product'
import reducer from '../context/fetchProducts'
import { Helmet } from 'react-helmet-async'


const Home = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  })
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message })
      }
    }
    fetchData();
  }, [])
  return (
    <>
    <Helmet>
      <title>Store</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? <div><b>Loading... </b></div> :
          error ? <div>{error}</div> :
            <Row>
              {products.map(item => (
                <Col sm={6} md={4} lg={3} className="mb-3">
                  <Product item={item} key={item.slug}/>
                </Col>
              ))}
            </Row>
        }
      </div>
    </>
  )
}

export default Home

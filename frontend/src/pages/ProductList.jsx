import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { productListReducer } from '../context/productListReducer'
import { Store } from '../context/Store'
import { getError } from '../utils/util'

const ProductList = () => {
    const [{ loading, error, products, pages, loadingCreate, loadingDelete, successDelete }, dispatch] 
    = useReducer(productListReducer, {
        loading: true,
        error: '',
    })
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;
    const { state } = useContext(Store)
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/products/admin?page=${page}`,
                    { headers: { authorization: `Bearer ${userInfo.token}` } }
                )

                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }
        fetchData();
        if(successDelete){
            dispatch({type: "DELETE_RESET"})
        } else {
            fetchData();
        }
    }, [page, userInfo, successDelete])

    const createProduct = async () => {
        if (window.confirm('Are you sure to create?')) {
            try {
                dispatch({ type: 'CREATE_REQUEST' });
                const { data } = await axios.post('/api/products', {},
                    { headers: { authorization: `Bearer ${userInfo.token}` } })
                toast.success('product created successfully')
                dispatch({ type: 'CREATE_SUCCESS' });
                navigate(`/admin/product/${data.product._id}`)
            } catch (err) {
                dispatch({ type: 'CREATE_FAIL' });
                toast.error(getError(err))
            }
        }
    }

    const deleteHandler = async (product) => {
        if(window.confirm('Are you sure to delete?'))
        {
            try{
                await axios.delete(`/api/products/${product._id}`, {
                    headers: { authorization: `Bearer ${userInfo.token}`}
                })
                toast.success('product has been deleted successfully')
                dispatch({ type: 'DELETE_SUCCESS' });
            }catch(err){
                dispatch({ type: 'DELETE_FAIL' });
                toast.error(getError(err))
            }
        }
    }
    return (
        <div>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='col text-end'>
                    <div>
                        <Button type="button" onClick={createProduct}>Create Product</Button>
                    </div>
                </Col>
            </Row>
            {loadingCreate && <LoadingBox></LoadingBox>}
            {loadingDelete && <LoadingBox></LoadingBox>}
            {loading ? <LoadingBox />
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td><Link to={`/product/${product.slug}`}>{product.name}</Link></td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <Button type='button'
                                                    variant='light'
                                                    onClick={() => navigate(`/admin/product/${product._id}`)}
                                                >Edit</Button>&nbsp;
                                                 <Button type='button'
                                                    variant='light'
                                                    onClick={() => deleteHandler(product)}
                                                >Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                {[...Array(pages).keys()].map(x => (
                                    <Link
                                        key={x + 1}
                                        className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                                        to={`/admin/products?page=${x + 1}`}
                                    >
                                        {x + 1}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default ProductList

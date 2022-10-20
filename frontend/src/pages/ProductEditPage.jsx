import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Container, Form, ListGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { productEditReducer } from '../context/productEditReducer';
import { Store } from '../context/Store';
import { getError } from '../utils/util';

const ProductEditPage = () => {
    const params = useParams(); // /product/:id
    const { id: productId } = params;
    const { state } = useContext(Store)
    const navigate = useNavigate();
    const { userInfo } = state;
    const [{ loading, error, loadingUpdate, loadingUpload}, dispatch] = useReducer(productEditReducer, {
        loading: true,
        error: '',
    })
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/products/${productId}`)
                setName(data.name);
                setSlug(data.slug);
                setPrice(data.price);
                setImage(data.image);
                setImages(data.images);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setBrand(data.brand);
                setDescription(data.desc);
                dispatch({ type: 'FETCH_SUCCESS' });
            } catch (err) {
                dispatch({ type: 'FETCH_FAILED', payload: getError(err) })
            }
        }
        fetchData();
    }, [productId])

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            dispatch({ type: 'UPDATE_REQUEST' })
            await axios.put(`/api/products/${productId}`, {
                    _id: productId,
                    name,
                    slug,
                    price,
                    image,
                    images,
                    category,
                    brand,
                    countInStock,
                    description
                },
                    { headers: { authorization: `Bearer ${userInfo.token}` } })
                toast.success('product updated successfully')
                dispatch({ type: 'UPDATE_SUCCESS' });
                navigate('/admin/products')
        }catch(err){
            toast.error(getError(err))
            dispatch({ type: 'UPDATE_FAILED', payload: getError(err) })
        }
    }

    const deleteFileHandler = async (fileName) => {
        setImages(images.filter(x => x !== fileName))
        toast.success('image removed successfully. click Update to apply it');
    }

    const uploadHandler = async (e, forImages) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            dispatch({ type: 'UPLOAD_REQUEST' })
            const {data} = await axios.post('/api/upload', bodyFormData, {
                headers : {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${userInfo.token}`
                }
            })
            dispatch({ type: 'UPLOAD_SUCCESS' });
            if(forImages){
                setImages([...images, data.secure_url]) 
            }else {
             setImage(data.secure_url) 
            }
            toast.success('image upload successfully. click Update to apply it')
        }catch(err){
            toast.error(getError(err))
            dispatch({ type: 'UPLOAD_FAILED', payload: getError(err) })
        }
    }
    return (
        <Container className='small-container'>
            <Helmet><title>Edit Product ${productId}</title></Helmet>
            <h1>Edit Product ${productId}</h1>
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
                    <Form.Group className='mb-3' controlId='slug'>
                        <Form.Label>Slug</Form.Label>
                        <Form.Control value={slug}
                        onChange={e => setSlug(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='image'>
                        <Form.Label>Image File</Form.Label>
                        <Form.Control value={image}
                        onChange={e => setImage(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='imageFile'>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type='file'
                        onChange={uploadHandler}
                        />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='images'>
                        <Form.Label>Additional Images</Form.Label>
                        {images.length === 0 && <MessageBox>No image</MessageBox>}
                        <ListGroup variant='flush'>
                            {images.map(x => (
                                <ListGroup.Item key={x}>
                                    {x}
                                    <Button variant='light' onClick={() => deleteFileHandler(x)}>
                                        <i className='fa fa-times-circle'></i>
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='addImageFile'>
                        <Form.Label>Upload Aditional Images</Form.Label>
                        <Form.Control type='file'
                        onChange={e => uploadHandler(e, true)}
                        />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control value={brand}
                        onChange={e => setBrand(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control value={countInStock}
                        onChange={e => setCountInStock(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='desc'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        />
                    </Form.Group>
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

export default ProductEditPage
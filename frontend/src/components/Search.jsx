import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search')
    }
    return (
        <Form className='d-flex me-auto' onSubmit={submitHandler}>
            <InputGroup>
                <Form.Control type="text" name="q" 
                id="q" value={query} onChange={e => setQuery(e.target.value)} 
                placeholder="search..."
                aria-label='Search Products'
                aria-describedby='button-search'
                >
                </Form.Control>
                <Button variant='outline-primary' type="submit" id="button-search">
                    <i className='fas fa-search'></i>
                </Button>
            </InputGroup>
        </Form>
    )
}

export default Search

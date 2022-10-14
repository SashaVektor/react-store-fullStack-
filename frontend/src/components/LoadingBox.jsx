import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingBox = () => {
  return (
    <Spinner animation='border' role="statux">
        <span className='visualy-hidden'></span>
    </Spinner>
  )
}

export default LoadingBox

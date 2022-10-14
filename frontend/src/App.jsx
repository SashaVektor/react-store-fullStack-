import { Link, Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './context/Store';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import ShippingAddress from './pages/ShippingAddress';
import Signup from './pages/Signup';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position='top-right' limit={1} />
      <header>
        <NavBar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <NavBar.Brand>
                React Store
              </NavBar.Brand>
            </LinkContainer>
            <NavBar.Toggle aria-controls='basic-navbar-nav' />
            <NavBar.Collapse id ="basic-navbar-nav">
            <Nav className="me-auto w-100 justify-content-end">
              <Link to="/cart" className='nav-link'>
                Cart
                {
                  cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )
                }
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link className='dropdown-item' to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className='nav-link' to="/signin">
                  Sign In
                </Link>
              )}
            </Nav>
            </NavBar.Collapse>
          </Container>
        </NavBar>
      </header>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/product/:slug' element={<ProductPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/orderhistory' element={<OrderHistory />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/shipping' element={<ShippingAddress />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div >
  );
}

export default App;

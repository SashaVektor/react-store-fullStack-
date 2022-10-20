import { Link, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Button, NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
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
import { getError } from './utils/util';
import axios from 'axios';
import Search from './components/Search';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AdminRoute from './components/AdminRoute'
import ProductList from './pages/ProductList';
import ProductEditPage from './pages/ProductEditPage';
import OrderList from './pages/OrderList';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import MapPage from './pages/MapPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo, fullBox } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`)
        setCategories(data)
      } catch (err) {
        toast.error(getError(err))
      }
    }
    fetchCategories();
  }, [])


  return (
    <div className={isOpen ? fullBox
      ? "d-flex flex-column site-container active-cont full-box"
      : "d-flex flex-column site-container active-cont"
      : fullBox
      ? 'site-container d-flex flex-column full-box'
      : 'site-container d-flex flex-column'
    }>
      <ToastContainer position='top-right' limit={1} />
      <header>
        <NavBar bg="dark" variant="dark" expand="lg">
          <Container>
            <Button variant='dark' onClick={() => setIsOpen(!isOpen)}>
              <i className='fas fa-bars'></i>
            </Button>
            <LinkContainer to="/">
              <NavBar.Brand>
                React Store
              </NavBar.Brand>
            </LinkContainer>
            <NavBar.Toggle aria-controls='basic-navbar-nav' />
            <NavBar.Collapse id="basic-navbar-nav">
              <Search />
              <Nav className="me-auto w-100 justify-content-end align-items-center">
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
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </NavBar.Collapse>
          </Container>
        </NavBar>
      </header>
      <div
        className={
          isOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              <Link className='nav-link' to={`/search?category=${category}`}
                onClick={() => setIsOpen(false)}>{category}</Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
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
            <Route path='/order/:id' element={<ProtectedRoute
            ><Order /></ProtectedRoute>} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/orderhistory' element={<ProtectedRoute
            ><OrderHistory /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute
            ><Profile /></ProtectedRoute>} />
             <Route path='/map' element={<ProtectedRoute
            ><MapPage /></ProtectedRoute>} />
            <Route path='/shipping' element={<ShippingAddress />} />
           { /* For Admin*/}
            <Route path='/admin/dashboard' element={<AdminRoute
            ><Dashboard /></AdminRoute>} />
            <Route path='/admin/products' element={<AdminRoute
            ><ProductList/></AdminRoute>} />
            <Route path='/admin/product/:id' element={<AdminRoute
            ><ProductEditPage/></AdminRoute>} />
            <Route path='/admin/orders' element={<AdminRoute
            ><OrderList/></AdminRoute>} />
             <Route path='/admin/users' element={<AdminRoute
            ><UserList/></AdminRoute>} />
             <Route path='/admin/user/:id' element={<AdminRoute
            ><UserEdit/></AdminRoute>} />
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

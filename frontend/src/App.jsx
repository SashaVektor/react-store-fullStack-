import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <NavBar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <NavBar.Brand>
                React Store
              </NavBar.Brand>
            </LinkContainer>
          </Container>
        </NavBar>
      </header>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/product/:slug' element={<ProductPage />} />
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

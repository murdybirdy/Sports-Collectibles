import React, { useState, useEffect } from 'react';
 

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { 
  Register,
  Login,
  Products,
  EditProduct,

} from './';
import '../style/App.css';
import AddProduct from './AddProduct';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  function logout() {
    setToken("");
    setCurrentUser("");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentUser");
    window.location.href = "/";
  }  

  return (
    <Router>
      <div className='app-container'>
        <nav>
          <h1 className="frontPageTitle">SPORTY</h1>
          <h4 className="sportydiscription">A Sports Collectibles Shop</h4>
          <div className="buttons">
            <>
            <Link to="/" className="gg-home"></Link>
            { token ? 
              <Link to="/" className="loginBtn" onClick={ logout }>Logout</Link> : 
              <Link to="/login" className="loginBtn">Login</Link>
            }
            { token ? 
              ( currentUser.isAdmin ? <Link to="/addProduct" className="registerBtn">Add Product</Link> : null ) :
              <Link to="/register" className="registerBtn">Register</Link> }
            <button className="gg-shopping-cart"></button>
            </>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Products currentUser={currentUser} token={token} setCurrentProduct={setCurrentProduct} />} />
          <Route path="/register" element={<Register setToken={setToken} setCurrentUser={setCurrentUser} />} />
          <Route path="/login" element={<Login setToken={setToken} setCurrentUser={setCurrentUser} />} />
          <Route path="/addProduct" element={<AddProduct token={token} />} />
          <Route path="/editProduct" element={<EditProduct token={token} currentProduct={currentProduct} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
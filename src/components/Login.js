import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../axios-services';

function Login({ setToken, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const data = await getUser(username, password);

    // Login successful, you can redirect or perform additional actions
    setToken(data.token);
    window.localStorage.setItem("token", data.token);
    setCurrentUser(data.user);
    window.localStorage.setItem("currentUser",data.user);
    navigate("/");

    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="loginTitle">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="UserName">Username:</label>
          <input className="inputUserName"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="PassWord">Password:</label>
          <input className="inputPassWord"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button className="loginButton"type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
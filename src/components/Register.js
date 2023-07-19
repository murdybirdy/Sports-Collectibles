import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../axios-services';

function Register({ setToken, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords don't match!");

    } else {
      const newUser = await addUser(username, password, isAdmin);
      // Registration successful, you can redirect or show a success message
      setToken(newUser.token);
      window.localStorage.setItem("token", newUser.token);
      setCurrentUser(newUser.user);
      window.localStorage.setItem("currentUser", newUser.user);
      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className='registerTitle'>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="UserName">Username:</label>
          <input className="inputUserName"
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="PassWord">Password:</label>
          <input className='inputPassWord'
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="PassWord">Confirm Password:</label>
          <input className='inputPassWord'
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="PassWord">Website Admin?</label>
          <input className='inputPassWord'
            type="checkbox"
            defaultChecked={isAdmin}
            onClick={(e) => setIsAdmin(e.target.checked)}
          />
        </div>
        {error && <p>{error}</p>}
        <button className="loginButton" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
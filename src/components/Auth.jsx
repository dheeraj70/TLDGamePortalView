import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

export const Auth = () => {
  const { user, login, register, loading } = useContext(AuthContext);
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); // Clear previous messages
  
    let result;
  
    if (mode === 'login') {
      result = await login(username, password);
      if (result.success) {
        setMessage(result.message);
        navigate('/'); // Redirect to home page after successful login
      } else {
        setMessage(result.message); // Display error message
      }
    } else {
      result = await register(username, password);
      if (result.success) {
        setMessage(result.message); // Display success message
        setMode('login'); // Switch to login mode after successful registration
      } else {
        setMessage(result.message); // Display error message
      }
    }
  };
  
  
  
  const handleSocialLogin = (provider) => {
    // Redirect the user to the authentication URL for the specified provider
    window.location.href = `${process.env.REACT_APP_API_URL}/${provider}`;
  };

  return (
    <div className="auth-hero">
    <div className="auth-container">
    <h2 className='auth-head'>{mode === 'login' ? 'Login' : 'Register'}</h2>
    <form className='auth-form' onSubmit={handleSubmit}>
      <div>
        <label className='auth-label'>Email</label>
        <input
          type="text"
          className='auth-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className='auth-label'>Password</label>
        <input
          type="password"
          className='auth-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className='auth-submit-btn' type="submit" disabled={loading}>
        {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
      </button>
      <p className='auth-switch-text'>
      {mode === 'login' ? (
        <>
          Don’t have an account?{' '}
          <button className='auth-alt-btn'   onClick={() => {
          setMode('register');
          setUsername('');
          setPassword('');
          setMessage('');
        }}>Register Here</button>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <button className='auth-alt-btn'   onClick={() => {
          setMode('login');
          setUsername('');
          setPassword('');
          setMessage('');
        }}>Login</button>
        </>
      )}
    </p>
    </form>
    
    {message && <p>{message}</p>}
    <div>
    <div className="auth-or"> <div className="auth-or-hr"></div> <span>or</span> <div className="auth-or-hr"></div></div>
  <div className="o-auth-btns">
  <button className="o-auth-btn" onClick={() => handleSocialLogin('google')}>
              <i className="fa-brands fa-google"></i>
            </button>
            <button className="o-auth-btn" onClick={() => handleSocialLogin('facebook')}>
              <i className="fa-brands fa-facebook-f"></i>
            </button>
            <button className="o-auth-btn" onClick={() => handleSocialLogin('linkedin')}>
              <i className="fa-brands fa-linkedin-in"></i>
            </button>
  </div>
  </div>
  </div>
  <div style={{backgroundImage: "url('game.jpg')"}} className="auth-img">

  </div>
  </div>
  );
};

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';


export const Auth = () => {
  const { user, login, register, loading , timedalert} = useContext(AuthContext);
  const [params] = useSearchParams();
  const urlmode = params.get('mode');
  const refID = params.get('refID');
  const [mode, setMode] = useState(urlmode==="register"?urlmode:'login'); // 'login' or 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Individual checks for password criteria
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&#]/.test(password);
  
    if (mode === 'register') {
      if (password !== confirmPassword) {
        timedalert("Passwords do not match!", 'red');
        return;
      }
      
      // Check each condition and set specific error message
      if (!minLength) {
        timedalert("Password must be at least 8 characters long.", 'red');
        return;
      }
      if (!hasUpperCase) {
        timedalert("Password must include at least one uppercase letter.", 'red');
        return;
      }
      if (!hasLowerCase) {
        timedalert("Password must include at least one lowercase letter.", 'red');
        return;
      }
      if (!hasNumber) {
        timedalert("Password must include at least one number.", 'red');
        return;
      }
      if (!hasSpecialChar) {
        timedalert("Password must include at least one special character.",'red');
        return;
      }
    }
  
    let result;
  
    if (mode === 'login') {
      result = await login(username, password);
      if (result.success) {
        timedalert("Logged in !",'green');
        navigate('/'); // Redirect to home page after successful login
      } else {
        timedalert(result.message,'red');
      }
    } else {
      const referedBy = refID || sessionStorage.getItem('refID');
      result = await register(username, password, referedBy);
      
      if (result.success) {
        sessionStorage.removeItem('refID');
        timedalert(result.message,'green');
        setMode('login'); // Switch to login mode after successful registration
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } else {
        timedalert(result.message,'red');
      }
    }
  };
  
  
  
  
  const handleSocialLogin = (provider) => {
    const refID = sessionStorage.getItem('refID');
    const redirectUrl = `${process.env.REACT_APP_API_URL}/${provider}?${refID?`refID=${refID}`:''}`;
    sessionStorage.removeItem('refID');
    window.location.href = redirectUrl;
  };
  


  useEffect(() => {
    if (refID) {
      sessionStorage.setItem('refID', refID);
    }
  }, [refID]);

  if(user){
    navigate('/');
  }else{
  return (
    <>
    <div className="auth-hero">
      
    <div className="auth-container">
    <h2 className='auth-head'>{mode === 'login' ? 'Login' : 'Register'}</h2>
    <form className='auth-form' onSubmit={handleSubmit}>
      <div>
        <label className='auth-label'>Email</label>
        <input
          type="email"
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
      {mode === 'register' && <div>
        <label className='auth-label'>Confirm Password</label>
        <input
          type="password"
          className='auth-input'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>}
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
          setConfirmPassword('');
        }}>Register Here</button>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <button className='auth-alt-btn'   onClick={() => {
          setMode('login');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
        }}>Login</button>
        </>
      )}
    </p>
    </form>
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
  <div style={{backgroundImage: "url('/game.jpg')"}} className="auth-img">

  </div>
  </div></>
  );}
};

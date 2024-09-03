import React, { createContext, useState, useEffect, useRef } from 'react';
import { TimedAlert } from '../components/TimedAlert';
// Create a context with default values
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  register: () => {},
  logout: () => {},
  timedalert: () => {}
});

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTA, setShowTA] = useState(false);
  const [alertProps, setAlertProps] = useState({ text: '', color: 'red' });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/current-user`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, []);

const timedalert = (text, color) => {
    setAlertProps({ text, color });
    setShowTA(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() =>{ setShowTA(false); timeoutRef.current = null;}, 3000);
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setUser(data.user);
        return { success: true, message: data.message, user: data.user };
      } else {
        return { success: false, message: data.message || 'Failed to login' };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };
  

  const register = async (username, password, referedBy) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password ,referedBy}),
        credentials: 'include',
      });
  
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        //setUser(data.user);
        
        return { success: true, message: data.message, user: data.user };
      } else {
        return { success: false, message: data.message || 'Failed to register' };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };
  
  const logout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/logout`, { method: 'POST', credentials: 'include' });
      setUser(null);
    } catch (err) {

    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout ,timedalert}}>
      {showTA && <TimedAlert text={alertProps.text} color={alertProps.color} />}
      {children}
    </AuthContext.Provider>
  );
};

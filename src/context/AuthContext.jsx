import React, { createContext, useState, useEffect } from 'react';

// Create a context with default values
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  register: () => {},
  logout: () => {},
});

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


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

  const login = async (username, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      const data = await response.json();
  
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
  

  const register = async (username, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUser(data.user);

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
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        // Quick JWT payload extraction to get user id (backend uses { id: user._id })
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        const userData = { email, name: email.split('@')[0], id: payload.id };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      return { success: false, error: 'Token missing' };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, username: name.split(' ').join('').toLowerCase(), email, password, bio: "Developer" }),
      });
      // Auto login
      return await login(email, password);
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
       {children}
    </AuthContext.Provider>
  );
};

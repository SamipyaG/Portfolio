import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    api.get('/admin/me')
      .then((res) => {
        setAdmin(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post('/admin/login', { email, password });
    const { token, data } = res.data;
    localStorage.setItem('admin_token', token);
    setAdmin(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
    toast.success('Logged out successfully');
  }, []);

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

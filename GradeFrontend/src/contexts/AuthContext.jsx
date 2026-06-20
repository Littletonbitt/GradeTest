import { createContext, useState, useContext, useEffect } from 'react';
import { apiFetch } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch('http://localhost:5204/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiFetch('http://localhost:5204/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const meRes = await apiFetch('http://localhost:5204/me');
        if (meRes.ok) {
          const data = await meRes.json();
          setUser(data);
          return { success: true };
        }
      }
      const err = await res.json();
      return { success: false, error: err.message || 'Login failed' };
    } catch {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    await apiFetch('http://localhost:5204/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



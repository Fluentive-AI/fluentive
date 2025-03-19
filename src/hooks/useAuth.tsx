
import { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.resolve(false),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  useEffect(() => {
    // Check if user is authenticated from session/local storage
    const sessionAuth = sessionStorage.getItem('isAuthenticated') === 'true';
    const localAuth = localStorage.getItem('isAuthenticated') === 'true';
    
    if (sessionAuth || localAuth) {
      setIsAuthenticated(true);
      // In a real app, you would fetch user data from an API
      setUser({
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock login - in a real app, you would validate against an API
    if (email && password) {
      setIsAuthenticated(true);
      setUser({
        name: 'Admin User',
        email: email,
        role: 'admin'
      });
      
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;

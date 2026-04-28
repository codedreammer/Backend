import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
    // No explicit redirect needed on success, PublicRoute will handle it
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel animate-fade">
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Sign in to your blog feed</p>
        
        {error && (
          <div style={{ color: 'var(--danger-color)', marginBottom: '16px', background: 'rgba(244,63,94,0.1)', padding: '10px', borderRadius: '6px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)' }}>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn-primary mt-4 flex items-center justify-center gap-2" disabled={isLoading}>
            <LogIn size={18} />
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

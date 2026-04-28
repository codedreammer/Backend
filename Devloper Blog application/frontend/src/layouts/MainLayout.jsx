import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon, Home } from 'lucide-react';

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      <header className="header glass-panel animate-fade">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logo">Developer-Blog</div>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            <Home size={18} />
            <span>Feed</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            <UserIcon size={18} />
            <span>{user?.name || 'Developer'}</span>
          </Link>
          
          <button 
            onClick={logout} 
            className="btn-danger flex items-center gap-2"
            title="Log Out"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>
      
      {/* Outlet renders the matched child route (Dashboard) */}
      <main className="animate-fade" style={{ animationDelay: '0.1s' }}>
        <Outlet />
      </main>
    </div>
  );
}

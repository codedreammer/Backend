import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import PostList from '../components/PostList';
import { User, Mail, FileText, Heart } from 'lucide-react';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { posts, isLoading, fetchPosts, toggleLike } = usePosts();

  useEffect(() => {
    // True passes 'userOnly' flag
    fetchPosts(true);
  }, [fetchPosts]);

  const totalLikesReceived = posts.reduce((sum, p) => sum + (Array.isArray(p.likes) ? p.likes.length : 0), 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <section className="glass-panel animate-fade" style={{ padding: '32px', display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--glass-bg)', border: '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'var(--accent-color)' }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '8px' }}>{user?.name}</h2>
          <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={16}/> {user?.email}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16}/> Developer</span>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <FileText size={32} color="var(--accent-color)" style={{ margin: '0 auto 12px' }}/>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>{posts.length}</div>
          <div style={{ color: 'var(--text-muted)' }}>Articles Authored</div>
        </div>
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <Heart size={32} color="var(--danger-color)" style={{ margin: '0 auto 12px' }}/>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>{totalLikesReceived}</div>
          <div style={{ color: 'var(--text-muted)' }}>Total Hearts Received</div>
        </div>
      </div>

      <section>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Your Articles
        </h3>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading your posts...</div>
        ) : (
          <PostList posts={posts} onPostLiked={toggleLike} />
        )}
      </section>
    </div>
  );
}

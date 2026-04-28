import { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { usePosts } from '../hooks/usePosts';
import { AlertCircle, Code } from 'lucide-react';

export default function Dashboard() {
  const { 
    posts, 
    isLoading, 
    error, 
    fetchPosts, 
    createPost, 
    toggleLike 
  } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
      
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger-color)', background: 'rgba(244,63,94,0.1)', padding: '16px', borderRadius: '12px' }}>
          <AlertCircle />
          {error}
        </div>
      )}
      
      <section className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={20} color="var(--accent-color)"/> Draft an Article
        </h2>
        <PostForm onPostCreated={createPost} />
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: '500', display: 'flex', justifyContent: 'space-between' }}>
          Developer Feed
          <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{posts.length} articles</span>
        </h2>
        
        {isLoading && posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <div className="spinner"></div> Loading feed...
          </div>
        ) : (
          <PostList 
            posts={posts} 
            onPostLiked={toggleLike}
          />
        )}
      </section>
    </div>
  );
}

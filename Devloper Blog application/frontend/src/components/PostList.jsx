import PostItem from './PostItem';

export default function PostList({ posts, onPostLiked }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No articles published yet. Be the first to share! 🚀
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {posts.map((post, index) => (
        <PostItem 
          key={post._id || index} 
          post={post} 
          onLiked={onPostLiked}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </div>
  );
}

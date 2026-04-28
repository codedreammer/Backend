import { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PostItem({ post, onLiked, style }) {
  const [isLiking, setIsLiking] = useState(false);
  const navigate = useNavigate();

  // Since we might not have a reliable active user ID from backend login (it only returns token),
  // we cannot perfectly highlight if "I" liked it. In a robust app, we would verify this.
  const likesCount = Array.isArray(post.likes) ? post.likes.length : (post.likes || 0);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      await onLiked(post._id);
    } catch (err) {
      console.error('Like failed', err);
    } finally {
      setIsLiking(false);
    }
  };

  const formattedDate = new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <article 
      className="glass-panel animate-fade" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        padding: '24px',
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <h3 
          onClick={() => navigate(`/post/${post._id}`)}
          style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-main)', cursor: 'pointer' }}
          className="hover:underline"
        >
          {post.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Posted on {formattedDate}</span>
        </div>
      </div>

      <div style={{ 
        color: 'var(--text-muted)', 
        lineHeight: '1.6', 
        marginBottom: '20px',
        whiteSpace: 'pre-line' 
      }}>
        {post.content}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
        <button 
          onClick={handleLike}
          disabled={isLiking || !post._id}
          className="flex items-center gap-2"
          style={{ 
            background: 'rgba(244, 63, 94, 0.1)', 
            border: 'none', 
            borderRadius: '20px',
            padding: '6px 14px',
            color: 'var(--danger-color)',
            fontSize: '0.9rem'
          }}
        >
          <Heart size={16} fill={isLiking ? 'var(--danger-color)' : 'none'}/>
          <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
        </button>
        
        <button 
          onClick={() => navigate(`/post/${post._id}`)}
          className="flex items-center gap-2"
          style={{ 
            background: 'rgba(99, 102, 241, 0.1)', 
            border: 'none', 
            borderRadius: '20px',
            padding: '6px 14px',
            color: 'var(--accent-color)',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          <MessageSquare size={16} />
          <span>Discuss</span>
        </button>
      </div>
    </article>
  );
}

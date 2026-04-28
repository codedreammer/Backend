import { MessageCircle } from 'lucide-react';

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>
        No comments yet. Start the conversation!
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
      {comments.map((comment, i) => {
        const formattedDate = new Date(comment.createdAt || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric' });
        const isOptimistic = !comment._id;
        
        return (
          <div 
            key={comment._id || i}
            style={{ 
              display: 'flex', 
              gap: '12px',
              padding: '16px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '12px',
              opacity: isOptimistic ? 0.6 : 1
            }}
          >
            <div style={{ padding: '4px', color: 'var(--text-muted)' }}>
              <MessageCircle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', marginBottom: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                  {comment.user?.name || comment.user?.username || 'You'}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>• {formattedDate}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {comment.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

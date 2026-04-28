import { useState } from 'react';
import { Send } from 'lucide-react';

export default function CommentForm({ postId, onCommentAdded }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await onCommentAdded(postId, text);
      setText('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
      <input 
        type="text" 
        placeholder="Add a comment..." 
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={isSubmitting}
        style={{ 
          flex: 1, 
          padding: '12px 16px', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.3)'
        }}
      />
      <button 
        type="submit" 
        className="btn-primary" 
        disabled={isSubmitting || !text.trim()}
        style={{ borderRadius: '24px', padding: '0 20px', width: 'auto' }}
      >
        <Send size={16} />
      </button>
    </form>
  );
}

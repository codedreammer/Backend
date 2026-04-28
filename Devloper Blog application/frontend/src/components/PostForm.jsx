import { useState } from 'react';
import { Send } from 'lucide-react';

export default function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await onPostCreated(title, content);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Failed to create post', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <input 
          type="text" 
          placeholder="Article Title..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ fontSize: '1.2rem', padding: '16px', background: 'rgba(0,0,0,0.3)', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px 8px 0 0' }}
        />
      </div>
      
      <div>
        <textarea 
          placeholder="Write your dev thoughts here..." 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          style={{ resize: 'vertical' }}
        />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}
          disabled={isSubmitting}
        >
          <Send size={18} />
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </form>
  );
}

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useComments } from '../hooks/useComments';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import PostItem from '../components/PostItem';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, isLoading: postLoading, error: postError, getPostById, toggleLike } = usePosts();
  const { comments, isLoading: commentsLoading, fetchComments, addComment, setComments } = useComments();

  useEffect(() => {
    // We only need to fetch post details.
    // getPostById actually brings back { post, comments } from backend!
    const init = async () => {
      const data = await getPostById(id);
      if (data && data.comments) {
        setComments(data.comments);
      }
    };
    init();
  }, [id, getPostById, setComments]);

  if (postLoading && !currentPost) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading post details...</div>;
  }

  if (postError || !currentPost) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--danger-color)' }}>
        <AlertCircle size={40} style={{ margin: '0 auto 16px' }} />
        {postError || 'Post not found.'}
        <br/>
        <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '20px', width: 'auto' }}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      <button 
        onClick={() => navigate('/')}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', cursor: 'pointer' }}
      >
        <ArrowLeft size={18} /> Back to Feed
      </button>

      <PostItem post={currentPost} onLiked={toggleLike} style={{ marginBottom: '32px' }} />

      <section className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: '500' }}>Discussion ({comments.length})</h3>
        
        <CommentForm postId={id} onCommentAdded={addComment} />
        
        {commentsLoading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading comments...</div>
        ) : (
            <CommentList comments={comments} />
        )}
      </section>
    </div>
  );
}

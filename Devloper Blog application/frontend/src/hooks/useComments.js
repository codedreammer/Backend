import { useState, useCallback } from 'react';
import { apiFetch } from '../services/api';

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = useCallback(async (postId) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await apiFetch(`/comments/${postId}`);
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addComment = async (postId, text) => {
    try {
      const data = await apiFetch('/comments', {
        method: 'POST',
        body: JSON.stringify({ postId, text })
      });
      
      const newComment = data.comment || data;
      setComments(prev => [newComment, ...prev]);
    } catch (err) {
      setError(err.message || 'Failed to add comment');
      throw err;
    }
  };

  return { comments, isLoading, error, fetchComments, addComment, setComments };
};

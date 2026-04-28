import { useState, useCallback } from 'react';
import { apiFetch } from '../services/api';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = useCallback(async (userOnly = false) => {
    setIsLoading(true);
    setError('');
    try {
      const endpoint = userOnly ? '/posts/user' : '/posts';
      const data = await apiFetch(endpoint);
      setPosts(Array.isArray(data) ? data : (data.posts || []));
    } catch (err) {
      setError(err.message || 'Something went wrong fetching posts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPostById = useCallback(async (id) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await apiFetch(`/posts/${id}`);
      setCurrentPost(data.post || data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch post details');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPost = async (title, content) => {
    // Generate temp ID for optimistic UI
    const tempId = Date.now().toString();
    const optimisticPost = { 
      _id: tempId, 
      title, 
      content, 
      likes: [], 
      createdAt: new Date().toISOString(),
      author: JSON.parse(localStorage.getItem('user') || '{}')
    };
    
    setPosts(prev => [optimisticPost, ...prev]);

    try {
      const data = await apiFetch('/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content })
      });
      const actualPost = data.post || data;
      setPosts(prev => prev.map(p => p._id === tempId ? actualPost : p));
    } catch (err) {
      setPosts(prev => prev.filter(p => p._id !== tempId));
      setError(err.message || 'Failed to publish post');
      throw err;
    }
  };

  const toggleLike = async (postId) => {
    try {
      const data = await apiFetch(`/posts/${postId}/like`, { method: 'POST' });
      // Update in posts list
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          // Simplistic optimistic toggle since backend only returns count, 
          // but we can parse the userId to do it precisely.
          const user = JSON.parse(localStorage.getItem('user'));
          const userId = user?.id || ''; // Wait, user obj in context doesn't store native _id from backend login reliably without decoding JWT, but we can just use length
          
          return { ...p, likes: new Array(data.likesCount || p.likes.length).fill('x') };
        }
        return p;
      }));
      
      // Update currentPost if viewing it
      setCurrentPost(prev => {
        if (prev && prev._id === postId) {
          return { ...prev, likes: new Array(data.likesCount || prev.likes.length).fill('x') };
        }
        return prev;
      });
    } catch (err) {
      setError(err.message || 'Failed to like post');
    }
  };

  return { 
    posts, 
    currentPost, 
    isLoading, 
    error, 
    fetchPosts, 
    getPostById, 
    createPost, 
    toggleLike 
  };
};

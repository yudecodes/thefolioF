// frontend/src/pages/PostPage.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch post and comments on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await API.get(`/posts/${id}/comments`);
        setComments(data);
      } catch {
        // Comments simply won't show if fetch fails
      }
    };

    fetchPost();
    // Only fetch comments if the user is logged in
    if (user) fetchComments();
  }, [id, user]);

  // Submit a new comment
  const handleComment = async (e) => {
    e.preventDefault();
    setCommentError('');
    if (!commentText.trim()) return;

    try {
      const { data } = await API.post(`/posts/${id}/comments`, {
        text: commentText,
      });
      setComments((prev) => [data, ...prev]);
      setCommentText('');
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to post comment');
    }
  };

  // Delete a comment (admin or comment owner)
  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/posts/${id}/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch {
      // Silently fail
    }
  };

  // Admin remove post
  const handleRemovePost = async () => {
    if (!window.confirm('Remove this post?')) return;
    try {
      await API.put(`/admin/posts/${id}/remove`);
      navigate('/home');
    } catch {
      // Silently fail
    }
  };

  // Author/admin edit post
  const handleEditPost = () => {
    navigate(`/edit-post/${id}`);
  };

  // Helpers
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const canEditPost =
    user && (user.role === 'admin' || user._id === post?.author?._id);

  const canDeleteComment = (comment) =>
    user && (user.role === 'admin' || user._id === comment.author?._id);

  const avatarSrc = (pic) =>
    pic ? `http://localhost:5000/uploads/${pic}` : '/default-avatar.png';

  // ── Loading / Error states ──────────────────────────────────────
  if (loading) {
    return (
      <div className="post-page">
        <p className="post-loading">Loading post...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="post-page">
        <p className="post-not-found">Post not found or has been removed.</p>
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="post-page">

      {/* Cover image (admin-uploaded) */}
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt="Cover"
          className="post-cover"
        />
      )}

      {/* Post header */}
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <img
            src={avatarSrc(post.author?.profilePic)}
            alt={post.author?.name}
            className="meta-avatar"
          />
          <span>{post.author?.name || 'Unknown'}</span>
          <span className="meta-sep">·</span>
          <span>{formatDate(post.createdAt)}</span>
          {post.status === 'removed' && (
            <>
              <span className="meta-sep">·</span>
              <span className="status-badge removed">Removed</span>
            </>
          )}
        </div>
      </div>

      {/* Admin / author actions */}
      {canEditPost && (
        <div className="post-actions">
          <button className="btn-edit" onClick={handleEditPost}>
            Edit Post
          </button>
          {user.role === 'admin' && post.status === 'published' && (
            <button className="btn-remove" onClick={handleRemovePost}>
              Remove Post
            </button>
          )}
        </div>
      )}

      {/* Post body */}
      <div className="post-body">{post.body}</div>

      {/* ── Comments ── */}

      {/* Guest wall — not logged in */}
      {!user && (
        <div className="post-guest-wall">
          <p>
            🔒 You need to be logged in to view and post comments.
          </p>
          <Link to="/login">Log In</Link>
          <Link to="/register" className="link-secondary">
            Register
          </Link>
        </div>
      )}

      {/* Comments section — logged-in users and admins only */}
      {user && (
        <div className="comments-section">
          <h3>
            Comments ({comments.length})
          </h3>

          {/* Add comment form */}
          <div className="comment-form">
            <form onSubmit={handleComment}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                required
              />
              {commentError && (
                <p className="error-msg">{commentError}</p>
              )}
              <button type="submit">Post Comment</button>
            </form>
          </div>

          {/* Comment list */}
          {comments.length === 0 ? (
            <p className="no-comments">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((c) => (
              <div className="comment-card" key={c._id}>
                <img
                  src={avatarSrc(c.author?.profilePic)}
                  alt={c.author?.name}
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <div className="comment-author">
                    {c.author?.name || 'Unknown'}
                    <span className="comment-date">
                      {formatDate(c.createdAt)}
                    </span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                  {canDeleteComment(c) && (
                    <button
                      className="comment-delete"
                      onClick={() => handleDeleteComment(c._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PostPage;
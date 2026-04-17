import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Star } from 'lucide-react';
import { getProductById, getReviews, addReview } from '../api/api';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [activeSize, setActiveSize] = useState('');
  
  const [reviewForm, setReviewForm] = useState({ username: '', comment: '', rating: 5 });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productData, reviewsData] = await Promise.all([
          getProductById(id),
          getReviews(id).catch(() => []) // Fallback if reviews fail
        ]);
        
        setProduct(productData);
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
        
        // Setup initial active image
        const images = Array.isArray(productData.images) && productData.images.length > 0 
          ? productData.images 
          : [productData.image || productData.imageUrl];
        if (images && images.length > 0) setActiveImage(images[0]);
        
        // Setup active size
        if (productData.sizes && productData.sizes.length > 0) setActiveSize(productData.sizes[0]);
        else setActiveSize('50ml');
        
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.username || !reviewForm.comment) return;
    
    try {
      const newReview = await addReview({ ...reviewForm, productId: id });
      // If addReview doesn't return the full review, fallback to form data format
      const addedReview = newReview || { ...reviewForm, _id: Date.now().toString() };
      setReviews([...reviews, addedReview]);
      setReviewForm({ username: '', comment: '', rating: 5 });
    } catch (err) {
      alert('Failed to submit review. Try again later.');
    }
  };

  if (loading) return <div className="loader-container"><span className="loader"></span></div>;
  if (error || !product) return <div className="container" style={{textAlign: 'center', margin: '100px 0', color: 'red'}}>{error || 'Product not found'}</div>;

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image || product.imageUrl || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&h=500&fit=crop'];

  return (
    <div className="product-detail container fade-in">
      <div className="detail-grid">
        <div className="gallery-section">
          <div className="gallery-main">
            <img src={activeImage || images[0]} alt={product.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&h=500&fit=crop'; }} />
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumb ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=No+Image'; }} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="detail-info">
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${parseFloat(product.price).toFixed(2)}</p>
          <div className="detail-desc">
            {product.description || "An elegant combination of premium notes meticulously crafted for those who appreciate fine fragrance."}
          </div>
          
          <div className="detail-sizes">
            <span className="size-label">Select Size</span>
            <div className="size-options">
              {(product.sizes || ['50ml', '100ml']).map(size => (
                <button 
                  key={size} 
                  className={`size-btn ${activeSize === size ? 'active' : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-primary" style={{ flex: 1, padding: '16px' }}>Add to Bag</button>
            <button className="btn-share" onClick={handleShare} title="Share product">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review, idx) => (
              <div key={review._id || review.id || idx} className="review-card">
                <div className="review-header">
                  <span className="review-author">{review.username}</span>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} color={i < review.rating ? "currentColor" : "var(--border)"} />
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))
          )}
        </div>
        
        <div className="review-form">
          <h3>Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={reviewForm.username}
                onChange={e => setReviewForm({...reviewForm, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-select">
                {[1, 2, 3, 4, 5].map(star => (
                   <button 
                     type="button" 
                     key={star}
                     className={`star-btn ${star <= reviewForm.rating ? 'active' : ''}`}
                     onClick={() => setReviewForm({...reviewForm, rating: star})}
                   >
                     <Star size={24} fill={star <= reviewForm.rating ? "currentColor" : "none"} />
                   </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Review Comment</label>
              <textarea 
                className="form-control" 
                value={reviewForm.comment}
                onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

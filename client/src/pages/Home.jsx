import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please ensure the backend is running at localhost:5000.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page fade-in">
      <section className="hero">
        <div className="container">
          <h1>Discover Your Signature Scent</h1>
          <p>Explore our exclusive collection of premium fragrances, crafted to evoke emotion and embody elegance.</p>
          <a href="#collections" className="btn btn-primary">Shop Collection</a>
        </div>
      </section>

      <section id="collections" className="container">
        <h2 className="section-title">Featured Collection</h2>
        {loading ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'red' }}>{error}</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>No products available at the moment.</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section id="about" className="about-section container">
        <h2>About L'AURA</h2>
        <p>
          Born from a passion for timeless elegance, L'AURA creates luxury fragrances that capture unforgettable moments. 
          Each scent is meticulously crafted using only the finest ingredients to become your perfect signature.
        </p>
      </section>
    </div>
  );
};

export default Home;

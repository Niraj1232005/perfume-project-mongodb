import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Primary image
  const primaryImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.image ||
        product.imageUrl ||
        "https://via.placeholder.com/400x500?text=No+Image";

  // Secondary image (for hover)
  const secondaryImage =
    Array.isArray(product.images) && product.images.length > 1
      ? product.images[1]
      : null;

  return (
    <Link
      to={`/product/${product._id || product.id}`}
      className="product-card fade-in"
    >
      <div className={`product-image-wrap ${secondaryImage ? "has-hover" : ""}`}>
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className="product-image primary-img"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&h=500&fit=crop";
          }}
        />

        {/* Secondary Image (only if exists) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt="hover"
            className="product-image secondary-img"
          />
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          ${!isNaN(product.price) ? Number(product.price).toFixed(2) : "0.00"}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
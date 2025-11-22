import React, { useState } from 'react';
import { useCart } from './ShoppingCart';

export const ProductCatalog = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 1,
      title: "Organic Fruit & Vegetable Box",
      subtitle: "Mixed seasonal produce",
      basePrice: 24.99,
      category: "mixed",
      image: "🥕🍎🥬",
      description: "A perfect mix of seasonal fruits and vegetables",
      popular: true
    },
    {
      id: 2,
      title: "Pure Vegetable Box",
      subtitle: "Fresh vegetables only",
      basePrice: 19.99,
      category: "vegetables",
      image: "🥕🥬🥒",
      description: "Farm-fresh vegetables for healthy meals"
    },
    {
      id: 3,
      title: "Organic Fruit Box",
      subtitle: "Seasonal organic fruits",
      basePrice: 22.99,
      category: "fruits",
      image: "🍎🍊🍇",
      description: "Sweet and juicy organic fruits"
    },
    {
      id: 4,
      title: "Herb & Salad Box",
      subtitle: "Fresh herbs and salad greens",
      basePrice: 16.99,
      category: "herbs",
      image: "🌿🥬🌱",
      description: "Perfect for fresh salads and cooking"
    },
    {
      id: 5,
      title: "Family Mega Box",
      subtitle: "Large family portion",
      basePrice: 39.99,
      category: "mixed",
      image: "📦🥕🍎",
      description: "Extra large box for big families"
    },
    {
      id: 6,
      title: "Smoothie Special Box",
      subtitle: "Fruits perfect for smoothies",
      basePrice: 18.99,
      category: "fruits",
      image: "🍌🫐🥭",
      description: "Ideal fruits for delicious smoothies"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'mixed', label: 'Mixed Boxes' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'herbs', label: 'Herbs & Salads' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.basePrice - b.basePrice;
        case 'price-high':
          return b.basePrice - a.basePrice;
        case 'popular':
          return b.popular ? 1 : -1;
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const handleQuickAdd = (product) => {
    addToCart({
      ...product,
      size: 'medium',
      delivery: 'weekly',
      quantity: 1,
      price: product.basePrice
    });
  };

  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <h1>Our Fresh Produce Boxes</h1>
        <p>Choose from our selection of fresh, organic produce boxes</p>
      </div>

      <div className="catalog-filters">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            {product.popular && (
              <div className="popular-badge">Popular</div>
            )}
            
            <div className="product-image">
              {product.image}
            </div>
            
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-subtitle">{product.subtitle}</p>
              <p className="product-description">{product.description}</p>
              
              <div className="product-footer">
                <span className="product-price">
                  From £{product.basePrice.toFixed(2)}
                </span>
                <button 
                  className="quick-add-btn"
                  onClick={() => handleQuickAdd(product)}
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export const ProductDetail = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedDelivery, setSelectedDelivery] = useState('weekly');

  const sizeOptions = [
    { value: 'small', label: 'Small Box (2-3 people)', priceModifier: -5 },
    { value: 'medium', label: 'Medium Box (3-4 people)', priceModifier: 0 },
    { value: 'large', label: 'Large Box (4-6 people)', priceModifier: 10 }
  ];

  const deliveryOptions = [
    { value: 'weekly', label: 'Weekly Delivery' },
    { value: 'biweekly', label: 'Bi-weekly Delivery' },
    { value: 'monthly', label: 'Monthly Delivery' }
  ];

  const getCurrentPrice = () => {
    const basePrice = product.basePrice;
    const sizeModifier = sizeOptions.find(opt => opt.value === selectedSize)?.priceModifier || 0;
    return (basePrice + sizeModifier) * quantity;
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      delivery: selectedDelivery,
      quantity,
      price: getCurrentPrice() / quantity
    });
    onClose();
  };

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>×</button>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            {product.image}
          </div>
          
          <div className="product-detail-info">
            <h2>{product.title}</h2>
            <p className="subtitle">{product.subtitle}</p>
            <p className="description">{product.description}</p>
            
            <div className="price-display">
              £{getCurrentPrice().toFixed(2)}
            </div>

            <div className="product-options">
              <div className="option-group">
                <label>Box Size:</label>
                <select 
                  value={selectedSize} 
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {sizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                      {option.priceModifier !== 0 && 
                        ` (${option.priceModifier > 0 ? '+' : ''}£${option.priceModifier})`
                      }
                    </option>
                  ))}
                </select>
              </div>

              <div className="option-group">
                <label>Delivery:</label>
                <select 
                  value={selectedDelivery} 
                  onChange={(e) => setSelectedDelivery(e.target.value)}
                >
                  {deliveryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart - £{getCurrentPrice().toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
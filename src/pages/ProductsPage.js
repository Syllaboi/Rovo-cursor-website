import React, { useState } from 'react';
import { useCart } from '../components/ShoppingCart';

export const ProductsPage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      title: "Organic Mixed Vegetable Box",
      subtitle: "Seasonal farm vegetables",
      basePrice: 24.99,
      category: "mixed",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&h=400&fit=crop"
      ],
      description: "A perfect mix of seasonal organic vegetables sourced from local farms",
      contents: ["Carrots", "Broccoli", "Spinach", "Tomatoes", "Bell Peppers", "Onions", "Potatoes", "Lettuce"],
      popular: true
    },
    {
      id: 2,
      title: "Premium Fruit Box",
      subtitle: "Sweet seasonal fruits",
      basePrice: 22.99,
      category: "fruits",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&h=400&fit=crop"
      ],
      description: "Hand-picked organic fruits at peak ripeness for maximum flavor",
      contents: ["Apples", "Oranges", "Bananas", "Grapes", "Berries", "Pears", "Kiwi", "Peaches"],
      popular: false
    },
    {
      id: 3,
      title: "Herb & Salad Collection",
      subtitle: "Fresh herbs and greens",
      basePrice: 16.99,
      category: "herbs",
      image: "https://images.unsplash.com/photo-1542990253-0b8173d7796a?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1542990253-0b8173d7796a?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1622467506210-83d8d4c9683d?w=500&h=400&fit=crop"
      ],
      description: "Perfect selection for fresh salads and culinary creations",
      contents: ["Basil", "Parsley", "Cilantro", "Arugula", "Mixed Lettuce", "Mint", "Dill", "Chives"],
      popular: false
    },
    {
      id: 4,
      title: "Root Vegetable Selection",
      subtitle: "Hearty root vegetables",
      basePrice: 19.99,
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1595475038665-8b9113e8ab15?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1595475038665-8b9113e8ab15?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608040834949-dd491ab1b5ca?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590502593747-42a996133562?w=500&h=400&fit=crop"
      ],
      description: "Essential root vegetables perfect for hearty winter meals",
      contents: ["Potatoes", "Carrots", "Turnips", "Parsnips", "Sweet Potatoes", "Beets", "Radishes", "Onions"],
      popular: false
    },
    {
      id: 5,
      title: "Tropical Fruit Paradise",
      subtitle: "Exotic tropical fruits",
      basePrice: 28.99,
      category: "fruits",
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&h=400&fit=crop"
      ],
      description: "Exotic tropical fruits to brighten your day",
      contents: ["Mango", "Pineapple", "Papaya", "Dragon Fruit", "Passion Fruit", "Kiwi", "Star Fruit", "Coconut"],
      popular: true
    },
    {
      id: 6,
      title: "Green Power Box",
      subtitle: "Leafy greens and cruciferous",
      basePrice: 21.99,
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1588348575377-dd3fd82fc72d?w=500&h=400&fit=crop"
      ],
      description: "Nutrient-packed greens for health-conscious families",
      contents: ["Kale", "Spinach", "Broccoli", "Brussels Sprouts", "Bok Choy", "Swiss Chard", "Collards", "Cabbage"],
      popular: false
    },
    {
      id: 7,
      title: "Mediterranean Delight",
      subtitle: "Mediterranean vegetables",
      basePrice: 26.99,
      category: "mixed",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500&h=400&fit=crop"
      ],
      description: "Sun-kissed vegetables perfect for Mediterranean cooking",
      contents: ["Tomatoes", "Eggplant", "Zucchini", "Bell Peppers", "Olives", "Artichokes", "Fennel", "Basil"],
      popular: true
    },
    {
      id: 8,
      title: "Berry Lovers Box",
      subtitle: "Fresh seasonal berries",
      basePrice: 24.99,
      category: "fruits",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&h=400&fit=crop"
      ],
      description: "A delicious assortment of fresh, antioxidant-rich berries",
      contents: ["Strawberries", "Blueberries", "Raspberries", "Blackberries", "Cranberries", "Gooseberries"],
      popular: false
    },
    {
      id: 9,
      title: "Chef's Special",
      subtitle: "Gourmet cooking vegetables",
      basePrice: 32.99,
      category: "mixed",
      image: "https://images.unsplash.com/photo-1566594799464-277b31cf1c99?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1566594799464-277b31cf1c99?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1576834924008-f6c3ea7fdb96?w=500&h=400&fit=crop"
      ],
      description: "Premium selection for serious home cooks and chefs",
      contents: ["Heirloom Tomatoes", "Purple Carrots", "Rainbow Chard", "Baby Vegetables", "Microgreens", "Edible Flowers"],
      popular: true
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
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Fresh Produce</h1>
          <p>Choose from our wide selection of organic fruits, vegetables, and herbs</p>
        </div>

        <div className="products-filters">
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
                <img src={product.image} alt={product.title} />
              </div>
              
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-subtitle">{product.subtitle}</p>
                <p className="product-description">{product.description}</p>
                
                <div className="product-footer">
                  <span className="product-price">
                    From £{product.basePrice.toFixed(2)}
                  </span>
                  <div className="product-buttons">
                    <button 
                      className="view-details-btn"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </button>
                    <button 
                      className="quick-add-btn"
                      onClick={() => handleQuickAdd(product)}
                    >
                      Quick Add
                    </button>
                  </div>
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

const ProductDetailModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedDelivery, setSelectedDelivery] = useState('weekly');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>×</button>
        
        <div className="product-detail-content">
          <div className="product-detail-images">
            <div className="main-image">
              <img src={product.images[activeImageIndex]} alt={product.title} />
            </div>
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="product-detail-info">
            <h2>{product.title}</h2>
            <p className="subtitle">{product.subtitle}</p>
            <p className="description">{product.description}</p>
            
            <div className="contents-section">
              <h4>What's Included:</h4>
              <div className="contents-list">
                {product.contents.map((item, index) => (
                  <span key={index} className="content-tag">{item}</span>
                ))}
              </div>
            </div>
            
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
                        ` (${option.priceModifier > 0 ? '+' : ''}£${Math.abs(option.priceModifier)})`
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
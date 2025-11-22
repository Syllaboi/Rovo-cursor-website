import React from 'react';
import { useCart } from '../components/ShoppingCart';

export const HomePage = ({ setCurrentPage }) => {
  const { addToCart } = useCart();

  const featuredProducts = [
    {
      id: 1,
      title: "Organic Mixed Vegetable Box",
      subtitle: "Farm-fresh seasonal vegetables",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop",
      description: "A perfect selection of organic vegetables from local farms"
    },
    {
      id: 2,
      title: "Premium Fruit Box",
      subtitle: "Sweet, juicy organic fruits",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=300&fit=crop",
      description: "Hand-picked seasonal fruits at peak ripeness"
    },
    {
      id: 3,
      title: "Herb & Salad Selection",
      subtitle: "Fresh herbs and leafy greens",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1542990253-0b8173d7796a?w=500&h=300&fit=crop",
      description: "Perfect for fresh salads and cooking"
    }
  ];

  const handleQuickAdd = (product) => {
    addToCart({
      ...product,
      size: 'medium',
      delivery: 'weekly',
      quantity: 1
    });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Fresh Organic Produce Delivered to Your Door</h1>
              <p>Support local farms while enjoying the freshest vegetables, fruits, and herbs. 
                 Sustainably grown, carefully selected, and delivered with care.</p>
              <div className="hero-buttons">
                <button 
                  className="btn-primary"
                  onClick={() => setCurrentPage('products')}
                >
                  Shop Now
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setCurrentPage('about')}
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1564759224907-65b7bb2b9f9e?w=600&h=400&fit=crop" 
                alt="Fresh organic vegetables"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Fresh Harvest?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>100% Organic</h3>
              <p>Certified organic produce from trusted local farms</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fresh Delivery</h3>
              <p>Next-day delivery to keep your produce at peak freshness</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Sustainable</h3>
              <p>Supporting eco-friendly farming and reducing food waste</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🌾</div>
              <h3>Local Farms</h3>
              <p>Direct partnerships with farmers in your region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card-home">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-subtitle">{product.subtitle}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="price">£{product.price.toFixed(2)}</span>
                    <button 
                      className="add-btn"
                      onClick={() => handleQuickAdd(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <button 
              className="btn-outline"
              onClick={() => setCurrentPage('products')}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Your Box</h3>
              <p>Select from our variety of organic produce boxes</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Set Your Delivery</h3>
              <p>Pick your delivery frequency and preferred day</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Enjoy Fresh Produce</h3>
              <p>Receive your box and enjoy the freshest organic produce</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>"The quality is outstanding! Fresh, organic vegetables delivered right to my door. My family loves the variety."</p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>London</span>
              </div>
            </div>
            <div className="testimonial">
              <p>"Supporting local farmers while getting the best produce has never been easier. Highly recommend!"</p>
              <div className="testimonial-author">
                <strong>Mike Davis</strong>
                <span>Manchester</span>
              </div>
            </div>
            <div className="testimonial">
              <p>"The herb selection is fantastic. As a chef, I appreciate the quality and freshness of every delivery."</p>
              <div className="testimonial-author">
                <strong>Emma Thompson</strong>
                <span>Edinburgh</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
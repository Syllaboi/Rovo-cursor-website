import React, { useState } from 'react';
import './index.css';
import { CartProvider, ShoppingCart, useCart } from './components/ShoppingCart';
import { UserProvider, LoginModal, UserAccount, useUser } from './components/UserAccount';
import { Checkout } from './components/Checkout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();
  const { user, setIsLoginOpen } = useUser();

  const handleCartClick = () => {
    if (getTotalItems() > 0) {
      setIsCartOpen(true);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage />;
      case 'account':
        return user ? <UserAccount /> : <div>Please log in to view your account</div>;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo" onClick={() => setCurrentPage('home')}>
              Fresh Harvest
            </div>
            <ul className="nav-links">
              <li><a href="#" onClick={() => setCurrentPage('home')}>Home</a></li>
              <li><a href="#" onClick={() => setCurrentPage('products')}>Products</a></li>
              <li><a href="#" onClick={() => setCurrentPage('about')}>About</a></li>
              <li><a href="#" onClick={() => setCurrentPage('contact')}>Contact</a></li>
              <li>
                {user ? (
                  <a href="#" onClick={() => setCurrentPage('account')}>
                    👤 {user.name}
                  </a>
                ) : (
                  <a href="#" onClick={() => setIsLoginOpen(true)}>Login</a>
                )}
              </li>
              <li>
                <a href="#" onClick={handleCartClick}>
                  🛒 Cart ({getTotalItems()})
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Fresh Harvest</h3>
              <p>
                Delivering the freshest organic produce directly from farm to your door. 
                Supporting local agriculture and healthy eating habits.
              </p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <p><a href="#" onClick={() => setCurrentPage('products')}>All Products</a></p>
              <p><a href="#" onClick={() => setCurrentPage('products')}>Organic Boxes</a></p>
              <p><a href="#" onClick={() => setCurrentPage('about')}>About Us</a></p>
              <p><a href="#" onClick={() => setCurrentPage('contact')}>Contact</a></p>
            </div>
            <div className="footer-section">
              <h3>Customer Service</h3>
              <p>📞 01234 567890</p>
              <p>📧 hello@freshharvest.co.uk</p>
              <p>🕒 Mon-Fri: 8am-6pm</p>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <p><a href="#">Facebook</a></p>
              <p><a href="#">Instagram</a></p>
              <p><a href="#">Twitter</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Fresh Harvest. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShoppingCart onCheckout={handleCheckout} />
      <LoginModal />
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
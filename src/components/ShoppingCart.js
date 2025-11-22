import React, { useState, useContext } from 'react';

const CartContext = React.createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.delivery === product.delivery
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === existingItem.id && 
          item.size === existingItem.size && 
          item.delivery === existingItem.delivery
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }

      return [...prevItems, { ...product, id: Date.now() }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const ShoppingCart = ({ onCheckout }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button 
            className="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p className="cart-item-details">
                    {item.size} box • {item.delivery}
                  </p>
                  <p className="cart-item-price">£{item.price.toFixed(2)} each</p>
                </div>
                
                <div className="cart-item-controls">
                  <div className="cart-quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn small"
                    >
                      -
                    </button>
                    <span className="quantity-display small">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn small"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total: £{getTotalPrice().toFixed(2)}</strong>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
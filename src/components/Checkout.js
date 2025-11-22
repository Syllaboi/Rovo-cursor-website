import React, { useState } from 'react';
import { useCart } from './ShoppingCart';
import { useUser } from './UserAccount';

export const Checkout = ({ isOpen, onClose }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  const getNextAvailableDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (orderComplete) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="checkout-modal success-modal" onClick={e => e.stopPropagation()}>
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order. We'll send you an email confirmation shortly.</p>
            <p><strong>Order Number:</strong> #FH{Date.now().toString().slice(-6)}</p>
            <button className="close-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={e => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>

        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Review</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Delivery</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Payment</div>
        </div>

        <div className="checkout-content">
          {step === 1 && (
            <div className="review-step">
              <h3>Order Review</h3>
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-item">
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p>{item.size} box • {item.delivery}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>£{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>£{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="next-step-btn"
                onClick={() => setStep(2)}
              >
                Continue to Delivery
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="delivery-step">
              <h3>Delivery Information</h3>
              
              {user ? (
                <div className="delivery-address">
                  <h4>Delivery Address</h4>
                  <p>{user.address}</p>
                  <p>Phone: {user.phone}</p>
                </div>
              ) : (
                <div className="guest-delivery">
                  <p>Please log in to set delivery address</p>
                </div>
              )}

              <div className="delivery-options">
                <h4>Preferred Delivery Date</h4>
                <input 
                  type="date" 
                  value={deliveryDate}
                  min={getNextAvailableDate()}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />

                <h4>Special Instructions</h4>
                <textarea
                  placeholder="e.g., Leave at front door, Ring doorbell twice..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>

              <div className="step-buttons">
                <button 
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button 
                  className="next-step-btn"
                  onClick={() => setStep(3)}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="payment-step">
              <h3>Payment Information</h3>
              
              <div className="payment-methods">
                <label>
                  <input 
                    type="radio" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit/Debit Card
                </label>
                <label>
                  <input 
                    type="radio" 
                    value="paypal" 
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </label>
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handlePaymentSubmit} className="payment-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name on Card</label>
                      <input 
                        type="text" 
                        value={paymentData.nameOnCard}
                        onChange={(e) => setPaymentData({...paymentData, nameOnCard: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input 
                        type="text" 
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group half">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group half">
                      <label>CVV</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="order-total">
                    <strong>Total: £{getTotalPrice().toFixed(2)}</strong>
                  </div>

                  <div className="step-buttons">
                    <button 
                      type="button"
                      className="back-btn"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="place-order-btn"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              )}

              {paymentMethod === 'paypal' && (
                <div className="paypal-section">
                  <p>You will be redirected to PayPal to complete your payment.</p>
                  <div className="step-buttons">
                    <button 
                      className="back-btn"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>
                    <button 
                      className="paypal-btn"
                      onClick={handlePaymentSubmit}
                    >
                      Pay with PayPal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
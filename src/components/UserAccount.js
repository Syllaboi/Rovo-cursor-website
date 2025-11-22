import React, { useState, useContext } from 'react';

const UserContext = React.createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: '12345',
      date: '2024-01-15',
      status: 'Delivered',
      items: [{ name: 'Medium Organic Box', quantity: 1, price: 24.99 }],
      total: 24.99
    },
    {
      id: '12346',
      date: '2024-01-22',
      status: 'Processing',
      items: [{ name: 'Large Organic Box', quantity: 2, price: 34.99 }],
      total: 69.98
    }
  ]);

  const login = (email, password) => {
    // Simulate login
    setUser({
      email,
      name: email.split('@')[0],
      address: '123 Green Street, Organic City, OC1 2AB',
      phone: '07123 456789'
    });
    setIsLoginOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      register,
      orders,
      isLoginOpen,
      setIsLoginOpen
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const LoginModal = () => {
  const { login, register, isLoginOpen, setIsLoginOpen } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });

  if (!isLoginOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      register(formData);
    }
    setFormData({ email: '', password: '', name: '', phone: '', address: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsLoginOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
          <button 
            className="close-modal-btn"
            onClick={() => setIsLoginOpen(false)}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="form-toggle">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="link-btn"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                className="link-btn"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const UserAccount = () => {
  const { user, logout, orders } = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  return (
    <div className="account-section">
      <h2>My Account</h2>
      
      <div className="account-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </div>

      <div className="account-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="profile-info">
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </div>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-tab">
            <h3>Order History</h3>
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order.id}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <p className="order-date">Date: {order.date}</p>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} × {item.quantity} - £{item.price.toFixed(2)}
                    </p>
                  ))}
                </div>
                <p className="order-total">Total: £{order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-tab">
            <h3>Delivery Preferences</h3>
            <div className="preference-group">
              <label>Default Box Size:</label>
              <select>
                <option>Medium Box</option>
                <option>Small Box</option>
                <option>Large Box</option>
              </select>
            </div>
            <div className="preference-group">
              <label>Delivery Frequency:</label>
              <select>
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="preference-group">
              <label>
                <input type="checkbox" /> Email notifications
              </label>
            </div>
            <div className="preference-group">
              <label>
                <input type="checkbox" /> SMS notifications
              </label>
            </div>
            <button className="save-preferences-btn">Save Preferences</button>
          </div>
        )}
      </div>
    </div>
  );
};
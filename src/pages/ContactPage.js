import React, { useState } from 'react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <section className="contact-header">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </section>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="delivery">Delivery Issues</option>
                    <option value="quality">Product Quality</option>
                    <option value="partnership">Farm Partnership</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-info">
                  <h3>Phone Support</h3>
                  <p><strong>01234 567890</strong></p>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📧</div>
                <div className="method-info">
                  <h3>Email Support</h3>
                  <p><strong>hello@freshharvest.co.uk</strong></p>
                  <p>We typically respond within 4 hours</p>
                  <p>For urgent matters, please call us</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">💬</div>
                <div className="method-info">
                  <h3>Live Chat</h3>
                  <p><strong>Available on our website</strong></p>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Average response time: 2 minutes</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-info">
                  <h3>Visit Our Office</h3>
                  <p><strong>Fresh Harvest HQ</strong></p>
                  <p>123 Green Street</p>
                  <p>Organic District</p>
                  <p>London, EC1 2AB</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="office-hours">
              <h3>Office Hours</h3>
              <div className="hours-grid">
                <div className="day">
                  <span className="day-name">Monday - Friday</span>
                  <span className="day-time">8:00 AM - 6:00 PM</span>
                </div>
                <div className="day">
                  <span className="day-name">Saturday</span>
                  <span className="day-time">9:00 AM - 4:00 PM</span>
                </div>
                <div className="day">
                  <span className="day-name">Sunday</span>
                  <span className="day-time">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I modify my delivery schedule?</h3>
              <p>You can easily change your delivery frequency, skip deliveries, or pause your subscription through your account dashboard or by contacting our customer service team.</p>
            </div>
            <div className="faq-item">
              <h3>What if I'm not satisfied with my box?</h3>
              <p>We guarantee the quality of our produce. If you're not completely satisfied with any item in your box, contact us within 48 hours and we'll provide a full refund or replacement.</p>
            </div>
            <div className="faq-item">
              <h3>Do you deliver to my area?</h3>
              <p>We currently deliver throughout England, Scotland, and Wales. Enter your postcode during checkout to see if delivery is available in your area.</p>
            </div>
            <div className="faq-item">
              <h3>Can I customize my box contents?</h3>
              <p>While our boxes are pre-curated for the best seasonal variety, you can set preferences for items you'd prefer not to receive. We also offer specialized boxes for specific dietary needs.</p>
            </div>
            <div className="faq-item">
              <h3>How far in advance should I place my order?</h3>
              <p>We recommend placing your first order at least 3 days in advance. For ongoing subscriptions, we'll automatically prepare your next box unless you make changes 48 hours before delivery.</p>
            </div>
            <div className="faq-item">
              <h3>What happens if I'm not home for delivery?</h3>
              <p>We'll text you the evening before delivery with a time window. If you're not home, we can leave your box in a safe place you specify, or arrange redelivery for the next business day.</p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-icon">🗺️</div>
              <p><strong>Fresh Harvest Headquarters</strong></p>
              <p>123 Green Street, Organic District</p>
              <p>London, EC1 2AB</p>
              <p>United Kingdom</p>
              <button className="directions-btn">Get Directions</button>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="social-section">
          <h2>Follow Us</h2>
          <p>Stay connected with Fresh Harvest for updates, recipes, and seasonal tips</p>
          <div className="social-links">
            <a href="#" className="social-link facebook">
              <span className="social-icon">📘</span>
              <span>Facebook</span>
            </a>
            <a href="#" className="social-link instagram">
              <span className="social-icon">📸</span>
              <span>Instagram</span>
            </a>
            <a href="#" className="social-link twitter">
              <span className="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
            <a href="#" className="social-link youtube">
              <span className="social-icon">📺</span>
              <span>YouTube</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
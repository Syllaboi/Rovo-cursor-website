import React from 'react';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <div className="about-text">
              <h1>About Fresh Harvest</h1>
              <p className="lead">
                We're passionate about bringing you the freshest, most delicious organic produce 
                straight from local farms to your door. Since 2020, we've been building 
                relationships with sustainable farmers and helping families eat healthier.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop" 
                alt="Fresh Harvest farm"
              />
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="our-story">
          <h2>Our Story</h2>
          <div className="story-grid">
            <div className="story-text">
              <p>
                Fresh Harvest began as a simple idea: what if getting fresh, organic produce 
                could be as easy as ordering online? Our founders, Sarah and Michael, were 
                frustrated by the lack of truly fresh vegetables in supermarkets and the 
                disconnect between consumers and local farmers.
              </p>
              <p>
                Starting with just three partner farms in 2020, we've grown to work with 
                over 50 certified organic farms across the UK. Every box we deliver 
                represents our commitment to sustainability, quality, and supporting 
                local agriculture.
              </p>
              <p>
                Today, we're proud to serve thousands of families, helping them discover 
                the joy of seasonal eating while supporting farmers who care for the land 
                the same way we care for our customers.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1593113616828-6fdfb38e7ced?w=500&h=400&fit=crop" 
                alt="Farm workers in field"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="our-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability First</h3>
              <p>
                We partner only with farms that use sustainable, organic farming practices. 
                Our packaging is 100% recyclable, and we work to minimize food waste at 
                every step of our process.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Fair Partnerships</h3>
              <p>
                We believe in paying fair prices to our farmer partners, ensuring they 
                can continue to grow high-quality produce while caring for their land 
                and communities.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🏆</div>
              <h3>Quality Promise</h3>
              <p>
                Every piece of produce is hand-selected for freshness and quality. 
                If you're not completely satisfied with your box, we'll make it right.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Community Focus</h3>
              <p>
                We're committed to building stronger local food systems and helping 
                our customers connect with the sources of their food.
              </p>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="our-process">
          <h2>From Farm to Your Table</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-image">
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop" 
                  alt="Farmer harvesting"
                />
              </div>
              <h3>Harvest</h3>
              <p>Our farmers harvest produce at peak ripeness, usually in the early morning when vegetables are at their freshest.</p>
            </div>
            <div className="process-step">
              <div className="step-image">
                <img 
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop" 
                  alt="Quality inspection"
                />
              </div>
              <h3>Quality Check</h3>
              <p>Each item is carefully inspected for quality, freshness, and appearance before being selected for our boxes.</p>
            </div>
            <div className="process-step">
              <div className="step-image">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" 
                  alt="Packing produce"
                />
              </div>
              <h3>Pack & Prepare</h3>
              <p>Our team carefully packs your box with a variety of seasonal produce, ensuring everything arrives in perfect condition.</p>
            </div>
            <div className="process-step">
              <div className="step-image">
                <img 
                  src="https://images.unsplash.com/photo-1566576912011-6ce7c2ed3a6c?w=300&h=200&fit=crop" 
                  alt="Delivery van"
                />
              </div>
              <h3>Deliver Fresh</h3>
              <p>Your box is delivered within 24 hours of harvest, ensuring maximum freshness and nutritional value.</p>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="our-impact">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Farms</div>
            </div>
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat">
              <div className="stat-number">500,000+</div>
              <div className="stat-label">Boxes Delivered</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Organic Certified</div>
            </div>
          </div>
          <div className="impact-text">
            <p>
              Since our founding, we've helped reduce food waste by 30% among our partner farms, 
              supported the growth of organic farming in the UK, and introduced thousands of 
              families to the joy of seasonal, local eating.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="our-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b8b5?w=200&h=200&fit=crop&crop=face" 
                  alt="Sarah Johnson"
                />
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Co-Founder & CEO</p>
              <p>Sarah's background in sustainable agriculture and passion for local food systems drives our mission forward.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                  alt="Michael Chen"
                />
              </div>
              <h3>Michael Chen</h3>
              <p className="member-role">Co-Founder & Operations</p>
              <p>Michael ensures our supply chain runs smoothly and our farmers are supported every step of the way.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" 
                  alt="Emma Thompson"
                />
              </div>
              <h3>Emma Thompson</h3>
              <p className="member-role">Head of Quality</p>
              <p>Emma's keen eye for quality ensures every box meets our high standards for freshness and selection.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                  alt="James Wilson"
                />
              </div>
              <h3>James Wilson</h3>
              <p className="member-role">Customer Success</p>
              <p>James leads our customer service team, ensuring every Fresh Harvest customer has an amazing experience.</p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="certifications">
          <h2>Our Certifications</h2>
          <div className="cert-grid">
            <div className="cert-item">
              <div className="cert-logo">🌿</div>
              <h4>Soil Association Organic</h4>
              <p>Certified organic by the UK's leading organic certification body</p>
            </div>
            <div className="cert-item">
              <div className="cert-logo">♻️</div>
              <h4>Carbon Neutral Delivery</h4>
              <p>All our deliveries are carbon neutral through renewable energy and offsetting</p>
            </div>
            <div className="cert-item">
              <div className="cert-logo">⭐</div>
              <h4>B-Corp Certified</h4>
              <p>Meeting the highest standards of verified social and environmental performance</p>
            </div>
            <div className="cert-item">
              <div className="cert-logo">🛡️</div>
              <h4>Food Safety Approved</h4>
              <p>Exceeding all UK food safety standards and regulations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
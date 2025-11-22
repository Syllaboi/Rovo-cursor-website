# Fresh Harvest - Organic Fruit & Vegetable Box Website

A React-based e-commerce website for organic produce delivery, inspired by modern fruit and vegetable box services.

## Features

- **Product Display**: Beautiful product images and detailed information
- **Interactive Options**: Box size selection and delivery frequency
- **Quantity Selector**: Easy quantity adjustment with price updates
- **Product Tabs**: Description, contents, and delivery information
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

### Build for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── App.js          # Main application component
├── index.js        # React entry point
└── index.css       # Global styles

public/
├── index.html      # HTML template
└── manifest.json   # PWA manifest
```

## Key Components

### Product Features
- **Dynamic Pricing**: Prices update based on selected options
- **Box Size Options**: Small, Medium, and Large boxes with different pricing
- **Delivery Frequency**: Weekly, bi-weekly, or monthly delivery options
- **Image Gallery**: Multiple product images with thumbnail navigation
- **Tabbed Information**: Organized product details in easy-to-navigate tabs

### Design Features
- **Green Color Scheme**: Professional agricultural/organic theme
- **Typography**: Modern Poppins font for clean readability
- **Responsive Layout**: CSS Grid and Flexbox for optimal layouts
- **Smooth Animations**: Hover effects and transitions throughout
- **Accessibility**: Semantic HTML and proper form labels

## Customization

### Colors
The main theme colors can be modified in `src/index.css`:
- Primary Green: `#7cb342`
- Dark Green: `#2d5e3e`
- Light Green: `#e8f5e8`

### Content
Product information, pricing, and content can be modified in the `product` object in `src/App.js`.

### Styling
All styles are contained in `src/index.css` using modern CSS features like Grid and Flexbox.

## Browser Support

This project supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).
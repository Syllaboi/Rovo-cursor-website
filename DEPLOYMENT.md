# Deployment Guide - Fresh Harvest Website

This guide will help you deploy your React website to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended - Free)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up
   - Drag and drop the `build` folder to Netlify
   - Your site will be live instantly with a random URL
   - You can customize the domain name in settings

### Option 2: Vercel (Free)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts** and your site will be deployed

### Option 3: GitHub Pages (Free)

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Firebase Hosting (Free)

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## 🛠️ Custom Domain Setup

### For Netlify:
1. Go to Site Settings > Domain Management
2. Add your custom domain
3. Update DNS records at your domain provider

### For Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records

## 📝 Environment Variables

If you add environment variables later (e.g., for API keys):

1. **Create `.env` file:**
   ```
   REACT_APP_API_KEY=your_api_key_here
   REACT_APP_STRIPE_KEY=your_stripe_key_here
   ```

2. **Use in code:**
   ```javascript
   const apiKey = process.env.REACT_APP_API_KEY;
   ```

3. **Add to hosting platform:**
   - Netlify: Site Settings > Environment Variables
   - Vercel: Project Settings > Environment Variables

## 🔧 Build Optimization

### Reduce Bundle Size:
```bash
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

### Enable Gzip Compression:
Most hosting platforms enable this automatically, but you can verify in browser dev tools.

## 📊 Analytics Setup

### Google Analytics:
```bash
npm install gtag
```

Add to `public/index.html`:
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Build Errors:
- Ensure all dependencies are installed: `npm install`
- Clear cache: `npm start -- --reset-cache`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Routing Issues (SPA):
Add `_redirects` file to `public/` folder:
```
/*    /index.html   200
```

### HTTPS Issues:
Most modern hosting platforms provide HTTPS automatically. If not:
- Use Cloudflare (free SSL)
- Let's Encrypt certificates

## 📱 PWA (Progressive Web App)

To make your site installable:

1. **Update `public/manifest.json`:**
   ```json
   {
     "short_name": "Fresh Harvest",
     "name": "Fresh Harvest - Organic Produce",
     "start_url": "/",
     "display": "standalone",
     "theme_color": "#2d5e3e",
     "background_color": "#f8f9fa"
   }
   ```

2. **Add service worker** (optional for caching)

## 🔄 Continuous Deployment

### GitHub Actions (Automatic deployment):
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - name: Deploy to netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --dir=build --prod
```

## 🎯 Performance Tips

1. **Image Optimization:**
   - Use WebP format when possible
   - Compress images before adding
   - Consider lazy loading

2. **Code Splitting:**
   ```javascript
   const LazyComponent = React.lazy(() => import('./Component'));
   ```

3. **Caching:**
   - Static assets are cached automatically
   - Use React.memo for expensive components

## 📞 Support

If you need help with deployment:
- Check hosting platform documentation
- GitHub Issues for React-specific problems
- Stack Overflow for general questions

Your website is now ready for production! 🎉
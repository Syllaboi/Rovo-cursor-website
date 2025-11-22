#!/bin/bash

# Fresh Harvest Website - Production Deployment Script
# This script builds and prepares your website for deployment

echo "🌱 Fresh Harvest - Production Deployment"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the project
echo "🔨 Building production version..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
if [ -d "build" ]; then
    # Create a deployment folder
    mkdir -p deployment
    cp -r build/* deployment/
    cp README.md deployment/
    cp DEPLOYMENT.md deployment/
    
    # Create a simple deployment info file
    cat > deployment/DEPLOYMENT_INFO.txt << EOF
Fresh Harvest Website - Production Build
=======================================

Build Date: $(date)
Version: 1.0.0
Status: Ready for deployment

Files included:
- Complete React production build
- Optimized assets and images
- Documentation

Deployment Options:
1. Upload 'deployment' folder contents to your web server
2. Use Netlify: Drag and drop the 'deployment' folder
3. Use Vercel: Connect to Git repository
4. Use GitHub Pages: Enable in repository settings

For detailed instructions, see DEPLOYMENT.md

Ready to launch your organic produce business! 🚀
EOF

    echo "✅ Deployment package created in 'deployment' folder"
else
    echo "❌ Build folder not found"
    exit 1
fi

# Generate simple analytics
echo "📊 Project Statistics:"
echo "   - React Components: $(find src -name "*.js" | wc -l) files"
echo "   - CSS Lines: $(wc -l < src/index.css) lines"
echo "   - Total Files: $(find . -type f -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.md" | wc -l) files"

echo ""
echo "🎉 SUCCESS! Your Fresh Harvest website is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Test the build: Open 'deployment/index.html' in your browser"
echo "2. Deploy to hosting: See DEPLOYMENT.md for detailed instructions"
echo "3. Configure domain: Set up your custom domain with your hosting provider"
echo ""
echo "Your complete e-commerce website is ready to launch! 🌱🚀"
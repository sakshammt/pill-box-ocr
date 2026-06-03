#!/bin/bash

# MediCare Deployment Script
# This script helps you deploy your app quickly

echo "🚀 MediCare Deployment Helper"
echo "================================"
echo ""

# Check if node and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Show deployment options
echo "Choose your deployment platform:"
echo "1) Vercel (Recommended - Fast & Easy)"
echo "2) Netlify CLI"
echo "3) Build only (manual deployment)"
echo "4) GitHub Pages"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📦 Deploying to Vercel..."
        echo ""
        
        # Check if vercel is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "Running deployment..."
        vercel --prod
        
        echo ""
        echo "✅ Deployment complete!"
        echo "🌐 Your app should now be live on Vercel"
        ;;
        
    2)
        echo ""
        echo "📦 Deploying to Netlify..."
        echo ""
        
        # Check if netlify is installed
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        echo "Building project..."
        npm run build
        
        echo "Deploying..."
        netlify deploy --prod --dir=dist
        
        echo ""
        echo "✅ Deployment complete!"
        echo "🌐 Your app should now be live on Netlify"
        ;;
        
    3)
        echo ""
        echo "📦 Building project..."
        echo ""
        
        npm run build
        
        echo ""
        echo "✅ Build complete!"
        echo "📁 Your built files are in the 'dist' folder"
        echo ""
        echo "Next steps:"
        echo "1. Go to https://app.netlify.com/drop"
        echo "2. Drag the 'dist' folder to deploy"
        echo "3. Or upload to your hosting provider"
        ;;
        
    4)
        echo ""
        echo "📦 Deploying to GitHub Pages..."
        echo ""
        
        # Check if gh-pages is installed
        if ! npm list -g gh-pages &> /dev/null; then
            echo "Installing gh-pages..."
            npm install -g gh-pages
        fi
        
        echo "Building project..."
        npm run build
        
        echo "Deploying to GitHub Pages..."
        npx gh-pages -d dist
        
        echo ""
        echo "✅ Deployment complete!"
        echo "🌐 Your app should be live at: https://YOUR_USERNAME.github.io/medicare-app/"
        echo ""
        echo "Make sure to enable GitHub Pages in your repository settings:"
        echo "Settings → Pages → Source: gh-pages branch"
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1-4."
        exit 1
        ;;
esac

echo ""
echo "🎉 Thank you for using MediCare Deployment Helper!"
echo ""

#!/bin/bash

# Deployment Script for CryptoRent
# This script helps deploy to Vercel and GitHub

echo "🚀 CryptoRent Deployment Script"
echo "================================"

# Check if we're on the main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch. Current branch: $current_branch"
    read -p "Do you want to continue? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Stage all changes
echo "📦 Staging changes..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message: " commit_message
if [ -z "$commit_message" ]; then
    commit_message="Update deployment"
fi
git commit -m "$commit_message"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🌐 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Connect your GitHub repository"
echo "3. Configure environment variables"
echo "4. Deploy!"
echo ""
echo "📋 Required Environment Variables for Vercel:"
echo "- DATABASE_URL (use PostgreSQL for production)"
echo "- NEXTAUTH_SECRET (generate a random string)"
echo "- NEXTAUTH_URL (auto-set by Vercel)"
echo "- ZAI_API_KEY (for AI features)"
echo ""
echo "🔗 Quick Vercel deploy link:"
echo "https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme"
echo ""
echo "🎉 Ready for deployment!"
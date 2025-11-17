# 🚀 Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - Create account at [github.com](https://github.com)
2. **Vercel Account** - Create account at [vercel.com](https://vercel.com)
3. **Git Installed** - Make sure git is installed on your system

## 🎯 Step-by-Step Deployment

### 1. **Setup GitHub Repository**

```bash
# Create new repository on GitHub first, then:

git remote add origin https://github.com/YOUR_USERNAME/cryptorent.git
git branch -M main
git push -u origin main
```

### 2. **Deploy to Vercel**

#### Option A: Quick Deploy (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Configure environment variables
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. **Configure Environment Variables**

In Vercel dashboard, add these environment variables:

```env
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=https://your-app.vercel.app
ZAI_API_KEY=your-zai-api-key
```

### 4. **Database Setup**

For production, use PostgreSQL:
1. Go to [supabase.com](https://supabase.com) or [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Get connection string
4. Add to Vercel environment variables
5. Run: `npm run db:push`

## 🔧 Production Checklist

- [ ] GitHub repository created and pushed
- [ ] Vercel project connected
- [ ] Environment variables configured
- [ ] Database setup (PostgreSQL)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate (auto by Vercel)
- [ ] Analytics setup (optional)

## 🌍 Custom Domain

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate

## 📊 Monitoring

Vercel provides:
- Real-time logs
- Performance metrics
- Error tracking
- Analytics

## 🔄 Auto-Deploy

Enable automatic deployments:
1. In Vercel project settings
2. Go to "Git Integration"
3. Enable "Auto Deploy"
4. Now every push to main branch auto-deploys

## 🚨 Troubleshooting

### Build Errors
- Check `package.json` dependencies
- Verify environment variables
- Check build logs in Vercel

### Database Connection
- Verify DATABASE_URL format
- Check IP whitelist (if using external DB)
- Test connection locally first

### Authentication Issues
- Verify NEXTAUTH_SECRET
- Check NEXTAUTH_URL matches deployed URL
- Clear browser cookies

## 📱 Mobile App

For mobile deployment:
- **iOS**: Use React Native and publish to App Store
- **Android**: Use React Native and publish to Play Store

## 🎉 Success!

Your app is now live at:
- Primary: `https://your-app.vercel.app`
- Custom: `https://yourdomain.com` (if configured)

## 📞 Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: Create issue in repository

---

**Happy Deploying! 🚀**
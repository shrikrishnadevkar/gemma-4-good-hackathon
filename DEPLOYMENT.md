# 🚀 LearnMate AI - Deployment Guide

## Complete Production Deployment Instructions

---

## 📋 Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] npm/yarn/pnpm
- [ ] Vercel account (free tier works)
- [ ] Optional: Railway/Render for backend
- [ ] Optional: PostgreSQL database
- [ ] Optional: Gemma 4 API key

---

## 🔧 Pre-Deployment Checklist

### ✅ Code Quality
- [x] All TypeScript errors resolved
- [x] No console errors
- [x] Production build passes
- [x] All pages functional
- [x] Responsive design verified

### ✅ Environment Variables
- [ ] `.env` configured locally
- [ ] All required keys set in deployment platform

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Frontend Only)

**Step 1: Install Vercel CLI**
```bash
npm i -g vercel
```

**Step 2: Login to Vercel**
```bash
vercel login
```

**Step 3: Deploy**
```bash
# From project root
vercel
```

**Step 4: Configure Environment Variables**

In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_APP_ENV=production
VITE_GEMMA4_API_KEY=your_gemma4_key_here
VITE_GEMMA4_ENDPOINT=https://api.gemma4.ai/v1
```

**Step 5: Production Deploy**
```bash
vercel --prod
```

**Result**: Your app will be live at `https://your-project.vercel.app`

---

### Option 2: Full Stack with Railway

**Backend Setup (Express + PostgreSQL)**

1. **Create Railway Project**
   - Go to https://railway.app
   - Create new project

2. **Add PostgreSQL**
   - Click "New" → "Database" → "PostgreSQL"

3. **Deploy Backend**
   ```bash
   # Create server directory
   mkdir server && cd server
   npm init -y
   npm install express cors dotenv prisma @prisma/client
   ```

4. **Environment Variables (Railway)**
   ```
   DATABASE_URL=<auto-populated by Railway>
   NODE_ENV=production
   PORT=8080
   ```

5. **Deploy Backend to Railway**
   - Connect GitHub repo
   - Set root directory to `server/`

---

### Option 3: Render (Alternative)

**Frontend on Render Static Sites**
- Build Command: `npm run build`
- Publish Directory: `dist`

**Backend on Render Web Services**
- Connect repo
- Build: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start: `npm start`

---

## 🗄️ Database Setup (Production)

### PostgreSQL + Prisma

**1. Install Prisma**
```bash
npm install prisma @prisma/client
npx prisma init
```

**2. Configure Connection**
Update `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/learnmate?sslmode=require"
```

**3. Generate Client**
```bash
npx prisma generate
```

**4. Run Migrations**
```bash
npx prisma migrate deploy
```

**5. Seed Database (Optional)**
```bash
npx prisma db seed
```

---

## 🔐 Environment Variables Reference

### Required Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMMA4_API_KEY` | Gemma 4 API access | ✅ For AI |
| `VITE_APP_ENV` | Environment mode | ✅ |
| `DATABASE_URL` | PostgreSQL connection | For production DB |
| `VITE_CLERK_PUBLISHABLE_KEY` | Auth provider | For real auth |

### Optional Variables

| Variable | Purpose |
|----------|---------|
| `VITE_PINECONE_API_KEY` | Vector database |
| `REDIS_URL` | Caching layer |
| `VITE_SENTRY_DSN` | Error tracking |
| `VITE_FIREBASE_CONFIG` | Storage/Auth |

---

## 🧪 Pre-Launch Verification

Run these commands before going live:

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Type check
npx tsc --noEmit

# 3. Lint check
npm run lint  # if configured

# 4. Production build
npm run build

# 5. Preview build locally
npm run preview

# Verify at http://localhost:4173
```

---

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (Free)
   - Built-in with Vercel deployment
   - Real-time metrics

2. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/react
   ```

3. **PostHog** (Product Analytics)
   ```bash
   npm install posthog-js
   ```

---

## 🔄 CI/CD Pipeline (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## ✅ Final Deployment Checklist

Before announcing your launch:

- [x] Build passes successfully
- [x] All pages render correctly
- [x] AI chat functional
- [x] Quizzes working
- [x] Analytics charts display
- [x] Mobile responsive
- [x] Dark mode works
- [x] No console errors
- [x] Environment variables set
- [x] Custom domain configured (optional)
- [x] SSL/HTTPS enabled (automatic on Vercel)
- [x] SEO metadata complete

---

## 🌍 Post-Deployment

### Custom Domain (Vercel)

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records
4. SSL auto-provisions

### Performance Optimization

- [ ] Enable Vercel Edge Network
- [ ] Configure CDN caching
- [ ] Set up image optimization
- [ ] Enable compression

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

### API Not Working
- Verify environment variables in dashboard
- Check API endpoint URLs
- Review browser console for CORS errors

### Database Connection Issues
- Verify DATABASE_URL format
- Check firewall rules
- Ensure SSL mode is correct

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Railway Docs: https://docs.railway.app

---

**🎉 Congratulations! Your LearnMate AI platform is now live!**

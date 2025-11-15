# Quick Start Guide - TetraZero Portfolio

## 🎯 5-Minute Setup

### Step 1: Install Dependencies (if not done)
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Step 3: Essential Customizations

#### A. Update Your Name & Title
File: `src/app/components/Hero.tsx` (Line 12-20)
```typescript
<span className="hero-name gradient-text">Your Name Here</span>
<h2 className="hero-subtitle">
  Your Professional Title Here
</h2>
```

#### B. Add Your Photo
1. Add your photo to `/public/profile.jpg` (400x400px recommended)
2. If no photo, the component will gracefully hide it

#### C. Update Contact Email
File: `src/app/components/Contact.tsx` (Line 115)
```typescript
<a href="mailto:your.email@example.com">your.email@example.com</a>
```

#### D. Update Social Links
Files: `Hero.tsx`, `Contact.tsx`, `Footer.tsx`
Replace all instances of:
- `https://github.com/yourusername`
- `https://linkedin.com/in/yourusername`
- `https://twitter.com/yourusername`

### Step 4: Add Your Content

#### Skills (2 minutes)
File: `src/app/components/Skills.tsx` (Line 14+)
```typescript
const skills: Skill[] = [
  { name: 'Your Skill', level: 85, category: 'frontend' },
  // Add more...
];
```

#### Projects (5 minutes)
File: `src/app/components/Projects.tsx` (Line 24+)
1. Update project details
2. Add project images to `/public/projects/`
3. Update URLs

#### Experience (3 minutes)
File: `src/app/components/Experience.tsx` (Line 17+)
Update work history with your roles and achievements.

### Step 5: Test Everything

- ✅ Click all navigation links
- ✅ Test dark/light mode toggle (bottom right)
- ✅ Try contact form
- ✅ Check mobile responsiveness (browser DevTools)
- ✅ Scroll through all sections

### Step 6: Deploy

#### Option A: Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

#### Option B: Build Locally
```bash
npm run build
npm start
```

## 🎨 Quick Color Change

Want a different color scheme? Update one line in `src/app/css/portfolio.css`:

```css
/* Line 8-9 - Change accent colors */
--accent-primary: #6366f1;    /* Your primary color */
--accent-secondary: #8b5cf6;  /* Your secondary color */
```

Popular choices:
- Blue: `#3b82f6` and `#06b6d4`
- Green: `#10b981` and `#14b8a6`
- Pink: `#ec4899` and `#f43f5e`
- Orange: `#f59e0b` and `#ef4444`

## 📱 Mobile Preview

Test on real devices or use browser DevTools:
1. Press F12 (Chrome/Edge)
2. Click device toggle icon
3. Select iPhone/Android device
4. Test all interactions

## 🐛 Troubleshooting

**Port already in use:**
```bash
npm run dev -- -p 3001
```

**Build fails:**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Images not showing:**
- Check file paths match exactly
- Images must be in `/public/` folder
- Refresh browser (Ctrl+Shift+R)

## 📚 Next Steps

1. ✅ Read [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed guides
2. ✅ Add your real projects and content
3. ✅ Set up email form (see CUSTOMIZATION.md)
4. ✅ Optimize images before deployment
5. ✅ Test on multiple devices
6. ✅ Deploy to production!

## 🎉 You're Ready!

Your portfolio is now running! Take your time customizing each section with your actual content.

**Need help?** Check:
- [README.md](./README.md) - Full documentation
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Detailed customization guide
- GitHub Issues - Report bugs or ask questions

**Happy coding! 🚀**

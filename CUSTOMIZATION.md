# Customization Guide

## 📝 Quick Start Customization

Follow these steps to personalize your portfolio:

### 1. Personal Information

#### Hero Section (`src/app/components/Hero.tsx`)
```typescript
// Line ~12-15: Update your name and title
<span className="hero-name gradient-text">Your Name</span>
<h2 className="hero-subtitle">
  Full Stack Developer & Creative Technologist
</h2>

// Line ~17-20: Update your description
<p className="hero-description">
  Your personal description here...
</p>

// Line ~29-41: Update social media links
<a href="https://github.com/yourusername" ...>
<a href="https://linkedin.com/in/yourusername" ...>
<a href="https://twitter.com/yourusername" ...>
```

**Add Your Profile Image:**
- Place your profile photo at `/public/profile.jpg`
- Recommended size: 400x400px or larger (square)
- Supported formats: JPG, PNG, WebP

### 2. About Section (`src/app/components/About.tsx`)

```typescript
// Line ~13-17: Update intro paragraph
<p className="about-intro">
  Your introduction...
</p>

// Line ~22-50: Update your background, focus, and interests

// Line ~55-74: Update statistics
<div className="stat-number">5+</div>  // Years experience
<div className="stat-number">50+</div> // Projects completed
// ... etc
```

### 3. Skills Section (`src/app/components/Skills.tsx`)

```typescript
// Line ~14-35: Update skills array
const skills: Skill[] = [
  { name: 'React / Next.js', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  // Add your skills with levels 0-100
];

// Categories: 'frontend', 'backend', 'tools', 'other'
```

### 4. Projects Section (`src/app/components/Projects.tsx`)

```typescript
// Line ~24-90: Update projects array
const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Short description',
    longDescription: 'Detailed description',
    techStack: ['Next.js', 'TypeScript', ...],
    image: '/projects/yourproject.jpg',
    liveUrl: 'https://...',
    githubUrl: 'https://github.com/...',
    featured: true,
    category: 'fullstack'
  },
  // Add more projects...
];
```

**Add Project Images:**
- Create folder: `/public/projects/`
- Add images: `ecommerce.jpg`, `taskapp.jpg`, etc.
- Recommended size: 800x500px
- Formats: JPG, PNG, WebP

### 5. Experience Section (`src/app/components/Experience.tsx`)

```typescript
// Line ~17-80: Update experiences array
const experiences: Experience[] = [
  {
    id: 1,
    role: 'Your Role',
    company: 'Company Name',
    period: '2022 - Present',
    description: 'What you did...',
    achievements: [
      'Achievement 1',
      'Achievement 2',
    ],
    technologies: ['Next.js', 'React', ...]
  },
  // Add more experiences...
];
```

### 6. Contact Section (`src/app/components/Contact.tsx`)

```typescript
// Line ~115-120: Update email
<a href="mailto:contact@tetrazero.com">contact@tetrazero.com</a>

// Line ~128-132: Update location
<p>San Francisco, CA</p>

// Line ~152-162: Update social links
```

### 7. Navbar & Footer

#### Navbar (`src/app/components/Navbar.tsx`)
```typescript
// Line ~7-10: Logo and title are already customized
// Links are auto-generated from sections
```

#### Footer (`src/app/components/Footer.tsx`)
```typescript
// Line ~23-26: Update description
<p className="footer-description">
  Your tagline...
</p>

// Line ~52-56: Update social links
```

## 🎨 Color Customization

Edit `src/app/css/portfolio.css`:

### Dark Theme (Default)
```css
:root {
  --accent-primary: #6366f1;      /* Indigo */
  --accent-secondary: #8b5cf6;    /* Purple */
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}
```

### Light Theme
```css
[data-theme="light"] {
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  /* Colors auto-adjust for light mode */
}
```

### Popular Color Schemes

**Blue & Cyan:**
```css
--accent-primary: #3b82f6;
--accent-secondary: #06b6d4;
--accent-gradient: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
```

**Green & Teal:**
```css
--accent-primary: #10b981;
--accent-secondary: #14b8a6;
--accent-gradient: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
```

**Pink & Rose:**
```css
--accent-primary: #ec4899;
--accent-secondary: #f43f5e;
--accent-gradient: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
```

## 📧 Email Setup

### Using EmailJS (Easiest)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email service and template
3. Install package:
```bash
npm install @emailjs/browser
```

4. Update `src/app/components/Contact.tsx`:
```typescript
import emailjs from '@emailjs/browser';

// In handleSubmit function (line ~63):
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message
  },
  'YOUR_PUBLIC_KEY'
);
```

### Using API Route (Advanced)

1. Create `src/app/api/contact/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json();
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${subject}`,
    text: `From: ${name} (${email})\n\n${message}`
  });

  return NextResponse.json({ success: true });
}
```

2. Update Contact form to call API:
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## 🖼️ Image Guidelines

### Profile Image
- **Path:** `/public/profile.jpg`
- **Size:** 400x400px (minimum)
- **Format:** JPG, PNG, or WebP
- **Style:** Professional headshot, square crop

### Project Images
- **Path:** `/public/projects/projectname.jpg`
- **Size:** 800x500px (16:10 ratio)
- **Format:** JPG recommended for photos, PNG for graphics
- **Style:** Screenshots, mockups, or hero images

### Optimization Tips
- Use Next.js Image component (already implemented)
- Compress images before uploading
- Consider WebP format for better compression
- Max file size: 500KB per image

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project to Vercel
3. Deploy automatically

### Custom Domain
1. Add domain in Vercel/Netlify settings
2. Update DNS records
3. Enable SSL certificate

## 📱 Testing Checklist

- [ ] All personal information updated
- [ ] Profile image added and displays correctly
- [ ] Project images added
- [ ] Email form configured and tested
- [ ] Social links work
- [ ] Dark/Light mode toggle works
- [ ] Responsive on mobile, tablet, desktop
- [ ] All sections scroll smoothly
- [ ] No console errors
- [ ] Fast loading time

## 💡 Tips

1. **Start Small:** Update one section at a time
2. **Test Locally:** Run `npm run dev` to see changes immediately
3. **Use Real Data:** Add actual projects and experiences
4. **Optimize Images:** Compress before uploading
5. **Check Mobile:** Test on real devices
6. **Get Feedback:** Share with friends before going live

## 🆘 Common Issues

**Images not loading:**
- Check file paths are correct
- Ensure images are in `/public/` folder
- Verify file extensions match code

**Animations not working:**
- Clear browser cache
- Check browser console for errors
- Ensure GSAP installed: `npm install gsap`

**Form not submitting:**
- Check email service configuration
- Verify API keys/credentials
- Test with console.log statements

**Theme toggle not persisting:**
- Check localStorage in browser DevTools
- Clear site data and try again
- Ensure ThemeProvider wraps app

## 📚 Further Customization

Want to go deeper? Check these files:
- `src/app/css/portfolio.css` - All styles
- `src/app/components/AnimationController.tsx` - GSAP animations
- `src/app/particleJS.tsx` - Particle effects
- `tailwind.config.ts` - Tailwind configuration

Need help? Open an issue on GitHub!

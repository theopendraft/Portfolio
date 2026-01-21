# Pankaj Robert - Portfolio Website

A modern, high-performance portfolio website built with Next.js, featuring custom cursor interactions, smooth animations, and a cinematic design aesthetic.

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.2 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.26.2, GSAP 3.14.2
- **Fonts**: Geist (Sans & Mono)

## ✨ Key Features

### Custom Cursor System

- Context-based global cursor state management
- Three cursor states: default, hover, and active
- Smooth spring animations (stiffness: 120, damping: 25)
- Dynamic image previews on skill hover
- Auto-disabled on mobile devices and screens < 1024px

### Sections

1. **Hero Section**
   - Three-column layout with animated card
   - Scroll-based rotation effects
   - Bouncing hello emoji with optimized animation

2. **What I Can Do**
   - Interactive skill showcase (6 skills)
   - Cursor-following image previews
   - Subtle entrance animations

3. **About Me**
   - Trust-building stats (50+ Projects, 5 Years, 30+ Clients)
   - Personal story teaser
   - Social media links with animations
   - Parallax-enabled animated card

4. **Featured Projects**
   - GSAP-powered sticky card stacking (desktop only)
   - Mobile-optimized vertical layout
   - Smooth fade and scale transitions
   - Proper cleanup on unmount

5. **Testimonials**
   - 3×2 grid with 4 testimonials + 2 stat highlights
   - Star ratings
   - Client quotes
   - Staggered entrance animations

6. **FAQ**
   - Accordion-style Q&A (8 questions)
   - Sticky left header on desktop
   - Only one item open at a time
   - Keyboard accessible

7. **Contact Section**
   - Form with validation (Name, Email, Service, Message)
   - Mobile-responsive input fields
   - Success/error state handling
   - Focus states with brand color

8. **Footer**
   - Floating action buttons (Resume & GitHub) on desktop
   - Personal contact information
   - Social media links
   - Mobile-responsive spacing

## 🎨 Design Highlights

- **Color Palette**: Zinc (900-950) with lime-green accent (#C4F047)
- **Typography**: Clean hierarchy with uppercase headings
- **Animations**: Reduced motion respect, optimized durations (0.5-0.7s)
- **Responsive**: Mobile-first with breakpoints at 640px, 768px, 1024px

## 📱 Performance Optimizations

- Spring stiffness reduced from 150 to 120 for premium feel
- Animation durations reduced by 10-20% (0.8s → 0.6-0.7s)
- Viewport margins (-50px) for earlier animation triggers
- GSAP cleanup on component unmount
- Cursor system disabled on mobile and touch devices
- Reduced animation intensity on mobile devices
- Custom easing curves: [0.22, 1, 0.36, 1]

## 🔧 Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout with metadata and providers
│   ├── page.js            # Homepage with all sections
│   └── globals.css        # Global styles
├── components/
│   ├── home/              # Homepage sections
│   │   ├── HeroSection.js
│   │   ├── WhatICanDo.js
│   │   ├── AboutMe.js
│   │   ├── FeaturedProjects.js
│   │   ├── Testimonials.js
│   │   ├── FAQ.js
│   │   └── ContactSection.js
│   ├── layout/            # Global layout components
│   │   ├── Navbar.js
│   │   └── Footer.js
│   └── shared/            # Reusable components
│       ├── AnimatedCard.js
│       └── CursorFollower.js
├── data/                  # Content data
│   ├── skills.js
│   ├── projects.js
│   ├── testimonials.js
│   └── faq.js
├── hooks/
│   └── useCursor.js       # Cursor state management
└── styles/                # Additional styles
```

## 🎯 TODO

- Replace placeholder images in:
  - `/public/placeholder-portrait.jpg` (AnimatedCard)
  - Skill preview images (WhatICanDo section)
  - Project images (FeaturedProjects section)
  - Client avatars (Testimonials section)
  - Navbar profile avatar
- Update personal information:
  - Email, location in Footer.js
  - Social media links (GitHub, LinkedIn, Twitter)
  - Resume PDF path in Footer.js
  - Project URLs and details in projects.js
  - Testimonials in testimonials.js

## 🚀 Deployment

This project is ready to deploy on [Vercel](https://vercel.com):

```bash
npm run build
```

## 📄 License

This project is for portfolio demonstration purposes.

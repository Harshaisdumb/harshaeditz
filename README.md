# Minimal Video Editing & Photoshop Thumbnail Portfolio

A sleek, minimal, cinematic dark-mode portfolio website specifically crafted for **Video Editors** and **Photoshop Thumbnail Designers**.

---

## 📁 Project Structure

```
video-editor-portfolio/
├── index.html        # Main markup, hero, showreel, video gallery, thumbnail grid, contact
├── style.css         # Modern dark aesthetic, responsive layout, glassmorphism, animations
├── script.js         # Interactive video modal, image lightbox, category filters, form logic
└── README.md         # Instructions and customization guide
```

---

## 🚀 How to Run & Preview Locally

1. Open the project folder:
   `C:\Users\Hemant\.gemini\antigravity\scratch\video-editor-portfolio`
2. Double-click `index.html` or right-click and choose **Open with Google Chrome / Brave / Edge**.
3. That's it! No build tools or Node.js required.

---

## 🎨 How to Add Your Own Photoshop Thumbnails

1. **Export your thumbnails from Photoshop**:
   - Recommended resolution: `1920x1080` or `1280x720` (16:9 aspect ratio).
   - Format: `.webp` or `.png` / `.jpg` (keep file size under 500KB each for fast loading).
2. Save your images into a folder inside the project, e.g., `assets/thumbnails/my-thumb-1.jpg`.
3. In `index.html`, locate the `<section id="thumbnails">` area:
   ```html
   <div class="thumb-card" data-category="tech" onclick="openLightbox('assets/thumbnails/my-thumb-1.jpg', 'My Video Title | 14.2% CTR', 'Photoshop CC')">
     <div class="thumb-frame">
       <img src="assets/thumbnails/my-thumb-1.jpg" alt="Video Title Thumbnail" loading="lazy">
       <div class="thumb-overlay">
         <span class="zoom-icon">🔍 Click to Expand</span>
       </div>
       <div class="ctr-badge">CTR: 14.2%</div>
     </div>
     <div class="thumb-info">
       <h4>My Video Title</h4>
       <p>Subject isolation, 3D rim lighting, typography</p>
     </div>
   </div>
   ```

---

## 🎬 How to Add Your YouTube Videos & Showreel

In `index.html`:
1. Find any `openVideoModal('...')` function call:
   ```html
   onclick="openVideoModal('https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID?autoplay=1')"
   ```
2. Replace `YOUR_VIDEO_ID` with your YouTube video ID (the letters/numbers after `v=` in your YouTube URL).
3. Update the poster image (`<img>` inside `.card-media`) with either:
   - Your custom thumbnail: `assets/thumbnails/thumb1.jpg`
   - Or YouTube's auto-generated high-res thumbnail:
     `https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg`

---

## ✉️ Receiving Contact Form Inquiries

To receive real emails from the contact form for free:
1. Go to [Formspree](https://formspree.io/) (free plan: 50 submissions/month).
2. Create a new form and copy your endpoint URL (e.g. `https://formspree.io/f/xyzabced`).
3. In `index.html`, change:
   ```html
   <form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR_ENDPOINT" method="POST">
   ```
   (and remove `onsubmit="handleFormSubmit(event)"` or adapt `script.js` to send via `fetch`).

---

## 🌐 Free Deployment (1-Click)

- **GitHub Pages**: Create a GitHub repository, upload these files, and enable Pages under Settings > Pages.
- **Vercel / Netlify**: Drag & drop the `video-editor-portfolio` folder directly into Vercel or Netlify to get a live URL in 10 seconds.

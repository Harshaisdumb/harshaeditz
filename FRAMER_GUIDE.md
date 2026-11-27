# How to Build Your Video Editing & Thumbnail Portfolio in Framer

This guide gives you the exact setup, CMS schemas, and 3 custom Framer Code Components to build an award-winning minimal portfolio in [Framer](https://www.framer.com/).

---

## 🛠️ Step 1: Add the Custom Code Components in Framer

We've created 3 ready-to-paste components in the `framer-components/` folder:

1. **`ThumbnailLightbox.tsx`**: Click-to-expand minimal lightbox with CTR badge and full-res image modal.
2. **`VideoModalCard.tsx`**: Clean video project card that opens an autoplaying YouTube/Vimeo embed on click.
3. **`BeforeAfterSlider.tsx`**: Interactive slider comparing raw camera frame vs. final Photoshop thumbnail.

### How to paste them into Framer:
1. Open your Framer project.
2. In the left panel, click on **Assets** → click the `+` icon next to **Code**.
3. Choose **Create Component**. Name it `ThumbnailLightbox` (or `VideoModalCard` / `BeforeAfterSlider`).
4. Replace all code in the editor with the corresponding file from `framer-components/`.
5. Press `Ctrl + S` (or `Cmd + S` on Mac) to save.
6. Now you can drag and drop it directly onto any canvas or connect it to your CMS!

---

## 🗄️ Step 2: Set Up Framer CMS Collections

Using Framer CMS lets you add new video edits and Photoshop thumbnails in seconds without touching your layout.

### Collection 1: `Thumbnails`
Click **CMS** → **Add Collection** → Name it **Thumbnails**.
Add these fields:

| Field Name | Type | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **Title** | Plain Text (Default) | Name of video/concept | `Next-Gen Setup Tour` |
| **Category** | Formatted / Text | Niche | `Tech / Gaming` |
| **CTR Badge** | Plain Text | Click-Through Rate | `14.2%` |
| **Thumbnail Image** | Image | 16:9 Photoshop export | `Setup-thumb.webp` |
| **Full Res Image** | Image | High-res version for zoom | `Setup-thumb-4k.webp` |
| **Raw Frame (Optional)**| Image | Unedited frame for Before/After | `Raw-camera-frame.jpg` |

### Collection 2: `Video Projects`
Click **CMS** → **Add Collection** → Name it **Videos**.
Add these fields:

| Field Name | Type | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **Title** | Plain Text | Video Title | `The Evolution of Silicon` |
| **Client** | Plain Text | Creator or Brand name | `TechVision Media` |
| **Category** | Option / Text | Filter | `YouTube Longform` |
| **YouTube ID** | Plain Text | Video ID (from URL) | `ScMzIvxBSi4` |
| **Duration** | Plain Text | Video run time | `14:22` |
| **Cover Poster** | Image | High-res poster frame | `Cover.webp` |
| **Tags** | Plain Text | Software / Role | `Premiere Pro, Sound Design`|

---

## 🎨 Step 3: Page Design & Canvas Structure

Set up your Framer page with these sections (using **Stacks** set to `Fill` width and `Auto` height):

### 1. Global Styles
- **Background Color**: `#0A0B10` (Matte dark obsidian)
- **Primary Text**: `#F8FAFC` (Crisp white)
- **Secondary Text**: `#94A3B8` (Muted slate)
- **Accent Color**: `#6366F1` (Indigo glow)
- **Font**: `Syne` or `Clash Display` for Headings, `Plus Jakarta Sans` or `Inter` for body.

### 2. Hero Section
- **Status Badge**: Green pulsing dot with text *"Available for Freelance & Long-term Contracts"*.
- **Headline**: *"Crafting High-Retention Videos & High-CTR Thumbnails"*.
- **CTA Buttons**: 
  - Button 1: *"Watch 2026 Showreel"* (Smooth scroll to `#showreel`).
  - Button 2: *"Explore Thumbnails"* (Smooth scroll to `#thumbnails`).
- **Stats Row**: 4-column stack showing `25M+ Views`, `11.8% Avg CTR`, `120+ Videos`, `48h Turnaround`.

### 3. Featured Showreel
- Large 16:9 video frame (`Max Width: 1000px`, `Border Radius: 16px`).
- Connect it with the `VideoModalCard` component or native Framer YouTube embed.

### 4. Photoshop Thumbnails Section
- **Heading**: *"Thumbnails That Convert"* with subtext *"Clean composition, custom lighting, and zero clutter"*.
- **Grid Layout**: 3 columns on Desktop (`1fr 1fr 1fr`), 2 on Tablet, 1 on Mobile.
- Connect your **CMS Collection (Thumbnails)** to your grid using the `ThumbnailLightbox` component.

### 5. Before & After Showcase (Secret Weapon for Thumbnails)
- Add a 2-column section:
  - Left column: Explanation of your Photoshop process (cutouts, rim lighting, atmospheric haze, color matching).
  - Right column: Drag the `BeforeAfterSlider` component so clients can drag back and forth between raw footage and the final thumbnail!

### 6. Video Projects Section
- Filter tabs for **YouTube**, **Reels/Shorts**, and **Commercial**.
- 2-column grid connected to the **Videos** CMS collection.

### 7. Contact / Booking
- Input fields for: Name/Channel, Email, Service Needed (Full Package, Video Only, Thumbnails Only), and Message.
- Links to your Discord, Twitter/X, and Email.

---

## 🚀 Step 4: Publish
Click **Publish** in the top right of Framer to get an instant live `.framer.website` link or connect your custom domain (e.g. `yourname.com`).

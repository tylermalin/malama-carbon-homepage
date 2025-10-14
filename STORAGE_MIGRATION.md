# 📦 Website Assets Storage Migration

## Overview

Moving all website images from the codebase to Supabase Storage for better performance and easier management.

---

## ✅ Benefits

### **Performance**
- ⚡ **60% faster deploys** - No need to upload images each time
- 🚀 **CDN delivery** - Global edge caching via Supabase
- 📦 **90% smaller bundle** - From ~50MB to ~5MB
- 💾 **Better caching** - Images cached independently

### **Management**
- 🎨 **Update images instantly** - No code deployment needed
- 📁 **Organized structure** - All assets in folders
- 🔄 **Version control** - No large binaries in git
- 💰 **Cost effective** - Supabase storage is very affordable

### **Developer Experience**
- 🚫 **Cleaner repo** - No large image files
- ⚡ **Faster git operations** - Smaller repo size
- 🔧 **Easy collaboration** - Image updates don't conflict
- 📸 **Simple uploads** - Drag & drop in Supabase UI

---

## 🎯 Current Image Inventory

### **Images in Repo (~50+ MB)**

```
/public/
  - malamalabbs.png (58 KB)
  - android-chrome-192x192.png
  - android-chrome-512x512.png
  - apple-touch-icon.png
  - favicon icons (multiple)

/src/assets/
  - Team photos (Tyler, Dominick, Jeffrey)
  - Project images
  - Marketing materials

Root directory:
  - malama-logo-blue.png (4 MB)
  - malama-logo-orange.png (3 MB)
  - malama-bw.png (1 MB)
  - bw malama logo image.png
  - carbon-journey.jpeg (2 MB)
  - Carbon Protocols.png (5 MB)
  - malama labs - our mission.mp4 (233 MB! 😱)

/Malama Images/
  - carbon credit studio.png
  - carbon registry icons.png
  - dMRV.png
  - Universal drmv.png
  - Universal Protocol Suite.png

/registry logos/
  - 17 PNG files

/Shell/
  - 17 PNG files

/platform images/
  - 1.png, 2.png, 3.png

/malama websiter images/
  - 1.png, 2.png, 3.png, 4.png
```

**Total: ~300+ MB (!)**

---

## 🚀 Migration Plan

### **Phase 1: Setup (5 minutes)**

#### Step 1: Create Storage Bucket (UI Method)

1. Go to: https://app.supabase.com
2. Select your project
3. Go to **Storage** → **New bucket**
4. Fill in:
   - **Name:** `website-assets`
   - **Public:** ✅ **ON** (important!)
   - **File size limit:** `10485760` (10MB)
5. Click **Create bucket**

#### Step 2: Set Permissions

1. Click **Policies** tab on your bucket
2. Click **New Policy** → **Full customization**
3. **Policy name:** `Public read access`
4. **Allowed operation:** SELECT
5. **Target roles:** `public`
6. **Policy definition:**
   ```sql
   bucket_id = 'website-assets'::text
   ```
7. Click **Save**

8. Add admin upload policy:
   - **Policy name:** `Admins can upload`
   - **Allowed operations:** INSERT, UPDATE, DELETE
   - **Target roles:** `authenticated`
   - **Policy definition:**
     ```sql
     (bucket_id = 'website-assets'::text) 
     AND EXISTS (
       SELECT 1 FROM auth.users 
       WHERE id = auth.uid() 
       AND raw_user_meta_data->>'role' = 'admin'
     )
     ```

---

### **Phase 2: Upload Images (15 minutes)**

#### Recommended Folder Structure:

```
website-assets/
  ├── logos/
  │   ├── malama-logo-blue.png
  │   ├── malama-logo-orange.png
  │   ├── malama-bw.png
  │   └── malamalabbs.png
  │
  ├── team/
  │   ├── tyler2025headshot.png
  │   ├── Dominick.png
  │   └── jeffrey.jpeg
  │
  ├── projects/
  │   ├── carbon-journey.jpeg
  │   ├── Carbon-Protocols.png
  │   └── carbon-credit-studio.png
  │
  ├── marketing/
  │   ├── hero-background.jpg
  │   └── social-preview.png
  │
  ├── platform/
  │   ├── screenshot-1.png
  │   ├── screenshot-2.png
  │   ├── screenshot-3.png
  │   └── screenshot-4.png
  │
  ├── registries/
  │   ├── verra-logo.png
  │   ├── gold-standard-logo.png
  │   └── puro-earth-logo.png
  │
  ├── videos/
  │   └── malama-labs-our-mission.mp4
  │
  └── favicons/
      ├── favicon-16x16.png
      ├── favicon-32x32.png
      └── apple-touch-icon.png
```

#### Upload Methods:

**Option A: Supabase UI (Easiest)**
1. Go to Storage → `website-assets`
2. Create folders: `logos`, `team`, `projects`, etc.
3. Click folder → **Upload file**
4. Drag & drop images

**Option B: Bulk Upload Script (Faster)**
```typescript
// scripts/upload-assets.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function uploadAssets() {
  const assets = [
    { local: 'malama-logo-blue.png', remote: 'logos/malama-logo-blue.png' },
    { local: 'malama-logo-orange.png', remote: 'logos/malama-logo-orange.png' },
    // ... add all files
  ];

  for (const asset of assets) {
    const file = fs.readFileSync(asset.local);
    const { error } = await supabase.storage
      .from('website-assets')
      .upload(asset.remote, file, { upsert: true });
    
    if (error) console.error(`Failed to upload ${asset.local}:`, error);
    else console.log(`✅ Uploaded ${asset.remote}`);
  }
}

uploadAssets();
```

---

### **Phase 3: Update Code (30 minutes)**

#### Step 1: Import Asset Manager

```typescript
// Before (old way)
import malamaLogo from '../assets/malama-logo-blue.png';

// After (new way)
import ASSETS from '../lib/imageAssets';
```

#### Step 2: Replace Image Imports

**Example: Header Logo**

```typescript
// Old
<img src={malamaLogo} alt="Malama Labs" />

// New
<img src={ASSETS.LOGO_BLUE} alt="Malama Labs" />
```

**Example: Team Photos**

```typescript
// Old
import tylerPhoto from '../assets/tyler.png';

// New
import ASSETS from '../lib/imageAssets';

<img src={ASSETS.TEAM.TYLER} alt="Tyler Malin" />
```

#### Step 3: Update Components

**Priority Files to Update:**

1. **Header/Navigation**
   - Replace logo imports

2. **Team Page**
   - Replace team photos

3. **Hero Section**
   - Replace background images

4. **Project Gallery**
   - Replace project images

5. **About Page**
   - Replace company photos

---

### **Phase 4: Cleanup (10 minutes)**

#### Delete Old Image Files

After verifying everything works:

```bash
# Create backup first
mkdir ../malama-images-backup
cp -r public/assets ../malama-images-backup/
cp malama*.png ../malama-images-backup/
cp *.jpeg ../malama-images-backup/

# Delete from repo
git rm public/assets/*.png
git rm malama*.png
git rm *.jpeg
git rm -r "Malama Images"
git rm -r "registry logos"
git rm -r Shell
git rm "malama labs - our mission.mp4"

git commit -m "refactor: Move images to Supabase Storage

- Reduces bundle size by 90%
- Images now served from CDN
- Faster deployments
- Easier to update images"

git push
```

---

## 📋 Migration Checklist

### **Setup**
- [ ] Create `website-assets` bucket in Supabase
- [ ] Enable public read access
- [ ] Set up admin upload policy
- [ ] Test upload one image

### **Upload Images**
- [ ] Upload logos (4 files)
- [ ] Upload team photos (3+ files)
- [ ] Upload project images (5+ files)
- [ ] Upload marketing materials
- [ ] Upload favicons
- [ ] Upload registry logos (17 files)
- [ ] Upload platform screenshots
- [ ] Upload mission video (optional - 233MB!)

### **Update Code**
- [ ] Add `imageAssets.ts` helper
- [ ] Update Header component
- [ ] Update TeamPage component
- [ ] Update HeroSection component
- [ ] Update ProjectGallery component
- [ ] Update AboutPage component
- [ ] Test all pages load correctly

### **Verify**
- [ ] All images loading on homepage
- [ ] Team photos showing correctly
- [ ] Project images displaying
- [ ] Logos rendering properly
- [ ] No console errors
- [ ] Test on mobile

### **Cleanup**
- [ ] Create image backup
- [ ] Remove old image files from repo
- [ ] Update .gitignore if needed
- [ ] Commit and push changes
- [ ] Deploy to production
- [ ] Verify production site

---

## 🔧 Usage Examples

### **Basic Usage**

```typescript
import ASSETS from '@/lib/imageAssets';

// Simple image
<img src={ASSETS.LOGO_BLUE} alt="Logo" />

// With loading state
<img 
  src={ASSETS.TEAM.TYLER} 
  alt="Tyler"
  loading="lazy"
/>

// Background image
<div 
  style={{ backgroundImage: `url(${ASSETS.MARKETING.HERO_BG})` }}
/>
```

### **Advanced Usage**

```typescript
import { getAssetUrl, uploadAsset } from '@/lib/imageAssets';

// Dynamic asset
const logoType = 'blue'; // or 'orange'
const logoUrl = getAssetUrl(`logos/malama-logo-${logoType}.png`);

// Upload new asset (admin only)
const handleUpload = async (file: File) => {
  try {
    await uploadAsset(file, `projects/new-project.jpg`);
    console.log('Uploaded successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### **Preload Critical Images**

```typescript
import { preloadCriticalImages } from '@/lib/imageAssets';

// In your App.tsx or main component
useEffect(() => {
  preloadCriticalImages();
}, []);
```

---

## 🎨 Admin Asset Management

### **Upload New Images**

1. Go to Supabase → Storage → `website-assets`
2. Navigate to folder (or create new)
3. Click **Upload**
4. Drag & drop image
5. Image is immediately available at:
   ```
   https://your-project.supabase.co/storage/v1/object/public/website-assets/folder/image.jpg
   ```

### **Update Existing Images**

1. Upload new image with **same filename**
2. Enable **upsert** option
3. Old image is replaced
4. URL stays the same
5. Browser cache updates automatically

### **Delete Images**

1. Select image in Supabase UI
2. Click **Delete**
3. Confirm deletion
4. Remove references from code if needed

---

## 📊 Expected Results

### **Bundle Size**

```
Before: ~300 MB (with all images)
After:  ~5 MB (code only)
Savings: 98% reduction
```

### **Deployment Speed**

```
Before: 3-5 minutes
After:  30-60 seconds
Improvement: 5x faster
```

### **Git Operations**

```
Before: git clone takes 2+ minutes
After:  git clone takes 10 seconds
Improvement: 12x faster
```

---

## 🚨 Important Notes

### **Caching**

- Supabase Storage has CDN caching
- Cache-Control set to 1 hour by default
- To force update: rename file or add version query param

### **URLs**

Public URL format:
```
https://{project}.supabase.co/storage/v1/object/public/website-assets/{path}
```

### **Fallback**

The `imageAssets.ts` helper includes fallback to local assets if Supabase is not configured. This ensures development works offline.

### **Video Files**

The mission video (233 MB) should probably be:
1. Uploaded to YouTube/Vimeo instead
2. Or compressed significantly
3. Or stored in Supabase but lazy-loaded

---

## 🎯 Recommended Priority

### **Phase 1 - Critical (Do First)**
1. Logos (4 files) - Used on every page
2. Team photos (3 files) - Used on Team & About pages
3. Favicon files - Browser tab icons

### **Phase 2 - Important (Do Next)**
4. Project images (5-10 files) - Homepage gallery
5. Marketing images - Hero backgrounds
6. Platform screenshots - Demo pages

### **Phase 3 - Optional (Nice to Have)**
7. Registry logos (17 files) - Footer/integrations
8. Shell images (17 files) - If used
9. Mission video (233 MB!) - Consider YouTube instead

---

## ✅ Quick Start (TL;DR)

1. **Create bucket:** Supabase → Storage → New bucket → `website-assets` (Public ON)
2. **Upload images:** Drag & drop into organized folders
3. **Use helper:** Import `ASSETS` from `imageAssets.ts`
4. **Replace imports:** `<img src={ASSETS.LOGO_BLUE} />`
5. **Test:** Verify all images load
6. **Cleanup:** Delete old image files from repo
7. **Deploy:** Push to production

**Est. Time:** 1-2 hours for complete migration

---

**Ready to migrate?** Start with Phase 1 and upload just the logos first to test! 🚀


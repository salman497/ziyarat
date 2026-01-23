# Ziyarat Guide - Project Context

## Overview
A mobile-first React website serving as a Ziyarat (pilgrimage) guide for a family Umrah trip (Jan 24-31, 2026). The app displays holy places in Madinah and Makkah with engaging stories, audio narrations, and progress tracking.

**Target Users:** Family of 5 (3 kids ages 13, 11, 8 and 2 adults)
**Trip Route:** Karachi → Madinah (2 nights) → Makkah (3 nights) → Riyadh → Karachi

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI framework |
| Vite | 6.0.7 | Build tool |
| TypeScript | 5.7.2 | Type safety |
| Tailwind CSS | 4.0.0 | Styling (v4 with @tailwindcss/vite plugin) |
| Shadcn UI | New York style | Component library |
| React Router | 7.1.1 | Client-side routing |
| Lucide React | 0.469.0 | Icons |
| ElevenLabs | MCP | Audio generation (text-to-speech) |

---

## Project Structure

```
ziyarat/
├── public/
│   ├── audio/
│   │   ├── madinah/          # 12 MP3 files (10 complete, 2 pending rename)
│   │   └── makkah/           # 15 MP3 files (not yet generated)
│   └── mosque.svg            # Favicon/logo
├── src/
│   ├── components/
│   │   ├── ui/               # Shadcn components (accordion, badge, button, card, etc.)
│   │   ├── layout/
│   │   │   └── Header.tsx    # App header with back button, title, theme toggle
│   │   ├── AudioPlayer.tsx   # Custom audio player with progress bar
│   │   ├── CitySelector.tsx  # Madinah/Makkah selection cards
│   │   ├── PlaceCard.tsx     # Card for place list with animations
│   │   ├── PlaceDetail.tsx   # Bottom sheet with accordions, audio, maps link
│   │   └── SortSelector.tsx  # Dropdown for sort options
│   ├── pages/
│   │   ├── HomePage.tsx      # Landing page with city selection
│   │   ├── MadinahPage.tsx   # Madinah places list + detail sheet
│   │   └── MakkahPage.tsx    # Makkah places list + detail sheet
│   ├── data/
│   │   ├── types.ts          # ZiyaratPlace interface, City, SortOption types
│   │   ├── madinah-places.ts # 12 Madinah locations with full content
│   │   └── makkah-places.ts  # 15 Makkah locations with full content
│   ├── hooks/
│   │   ├── useSessionStorage.ts  # Session storage hook + STORAGE_KEYS
│   │   └── useMobile.ts      # Mobile detection hook
│   ├── lib/
│   │   └── utils.ts          # cn() utility for Tailwind class merging
│   ├── App.tsx               # Router setup + dark mode state
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind + custom theme + animations
├── components.json           # Shadcn configuration
├── netlify.toml              # Netlify deployment config
├── vite.config.ts            # Vite + Tailwind v4 plugin config
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

---

## Data Model

### ZiyaratPlace Interface (src/data/types.ts)

```typescript
interface ZiyaratPlace {
  id: string                    // URL-friendly slug (e.g., "masjid-nabawi")
  nameEnglish: string           // English name
  nameArabic: string            // Arabic name
  briefSummary: string          // 2-3 lines for card display
  historicalSignificance: string[]  // Array of historical points
  kidFriendlyFacts: string[]    // Fun facts for children
  fullStory: string             // Complete narration for audio (2-3 min read)
  distanceFromCenter: string    // Human readable (e.g., "3.5 km")
  distanceKm: number            // Numeric for sorting
  coordinates: { lat: number; lng: number }
  googleMapsUrl: string         // Direct Google Maps link
  category: "mosque" | "cemetery" | "mountain" | "landmark" | "ritual-site"
  historicalRating: number      // 1-5 for sorting by significance
  imageUrl: string              // Placeholder (images not yet added)
  audioUrl?: string             // Path to MP3 file
}
```

---

## Places Content

### Madinah (12 Places) - ALL AUDIO COMPLETE ✅
| ID | Name | Distance | Category | Audio |
|----|------|----------|----------|-------|
| masjid-nabawi | Masjid al-Nabawi | 0 km | mosque | ✅ |
| jannat-baqi | Jannat al-Baqi | 0.1 km | cemetery | ✅ |
| masjid-quba | Masjid Quba | 3.5 km | mosque | ✅ |
| mount-uhud | Mount Uhud | 5 km | mountain | ✅ |
| masjid-qiblatain | Masjid Qiblatain | 4 km | mosque | ✅ |
| masjid-ghamama | Masjid al-Ghamama | 0.5 km | mosque | ✅ |
| masjid-abu-bakr | Masjid Abu Bakr | 0.4 km | mosque | ✅ |
| seven-mosques | Seven Mosques | 3 km | mosque | ✅ |
| masjid-jumuah | Masjid al-Jumu'ah | 2.5 km | mosque | ✅ |
| wadi-jinn | Wadi-e-Jinn | 40 km | landmark | ✅ |
| bir-shifa | Bir-e-Shifa | 5 km | landmark | ✅ |
| masjid-miqat | Masjid Miqat | 9 km | mosque | ✅ |

### Makkah (15 Places)
| ID | Name | Distance | Category | Audio |
|----|------|----------|----------|-------|
| masjid-haram | Masjid al-Haram & Kaaba | 0 km | mosque | ❌ |
| safa-marwa | Safa & Marwa | 0 km | ritual-site | ❌ |
| zamzam-well | Zamzam Well | 0 km | landmark | ❌ |
| maqam-ibrahim | Maqam Ibrahim | 0 km | landmark | ❌ |
| cave-hira | Cave of Hira | 6 km | mountain | ❌ |
| cave-thawr | Cave of Thawr | 8 km | mountain | ❌ |
| mina | Mina | 8 km | ritual-site | ❌ |
| arafat | Arafat | 22 km | ritual-site | ❌ |
| muzdalifah | Muzdalifah | 12 km | ritual-site | ❌ |
| jannat-mualla | Jannat al-Mualla | 2 km | cemetery | ❌ |
| masjid-jinn | Masjid al-Jinn | 1 km | mosque | ❌ |
| birthplace | Prophet's Birthplace | 0.5 km | landmark | ❌ |
| jabal-abu-qubais | Jabal Abu Qubais | 0.3 km | mountain | ❌ |
| masjid-aisha | Masjid Aisha (Taneem) | 7.5 km | mosque | ❌ |
| jamarat | Jamarat | 5 km | ritual-site | ❌ |

---

## Key Features

### 1. City Selection (HomePage)
- Beautiful card-based selection for Madinah and Makkah
- Bismillah greeting header
- Trip info footer (dates, route)
- Animated entrance effects

### 2. Places List (MadinahPage, MakkahPage)
- **Sorting Options:** Distance, Historical Significance, Alphabetical
- **Progress Tracker:** Shows X/Y places visited with progress bar
- **Cards Display:** Image, name (EN/AR), summary, distance badge, category badge
- **Animation:** Staggered fade-in entrance for cards

### 3. Place Detail (Sheet/Modal)
- Opens as bottom sheet (mobile-friendly)
- **Accordions for:**
  - The Story (fullStory content)
  - Historical Significance (bullet points)
  - Fun Facts for Kids (engaging facts)
- Audio player with play/pause, progress, mute
- Google Maps link button
- "Mark as Visited" toggle button

### 4. Audio Player
- Custom HTML5 audio player
- Play/pause button with icon change
- Progress bar (clickable to seek)
- Time display (current / total)
- Mute toggle
- Fallback message if no audio available

### 5. Session Storage
- Tracks visited places per city
- Persists during browser session
- Keys: `ziyarat_visited_madinah`, `ziyarat_visited_makkah`, `ziyarat_last_city`

### 6. Dark Mode
- Toggle in header
- Persists to localStorage (`ziyarat-theme`)
- Islamic-themed colors for both modes

---

## Theme & Styling

### Light Mode
- Primary: `#047857` (deep emerald green)
- Secondary: `#D4AF37` (gold)
- Background: `#FEFCE8` (warm cream)
- Cards: White with shadow

### Dark Mode
- Primary: `#10B981` (lighter emerald)
- Secondary: `#F59E0B` (amber gold)
- Background: `#0F172A` (dark navy)
- Cards: `#1E293B` (slate)

### Custom Animations (in index.css)
- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up entrance
- `animate-slide-in-right` - Slide from right

---

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | City selection landing page |
| `/madinah` | MadinahPage | Madinah places list |
| `/madinah/:placeId` | MadinahPage | Madinah list with detail sheet open |
| `/makkah` | MakkahPage | Makkah places list |
| `/makkah/:placeId` | MakkahPage | Makkah list with detail sheet open |

---

## Audio Generation

### Status
- **Madinah:** 12/12 COMPLETE ✅
- **Makkah:** 0/15 (not yet generated)

### ElevenLabs Configuration
- Voice: Default voice (warm male)
- Language: English
- Format: MP3 (44.1kHz, 128kbps)
- Content: fullStory field from each place (2-3 minute narrations)

### To Generate Remaining Audio
Use ElevenLabs MCP tool:
```
mcp__ElevenLabs__text_to_speech
- text: place.fullStory
- output_directory: /Users/salmanaziz/sal-code/ziyarat/public/audio/madinah (or makkah)
```
Then rename output file to `{place.id}.mp3`

---

## Deployment

### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview production build
```

---

## Pending Tasks

### Audio Generation
1. ~~Rename 2 Madinah audio files~~ ✅ DONE
2. ~~Update madinah-places.ts with audioUrl for all 12 places~~ ✅ DONE
3. Generate 15 Makkah audio files using ElevenLabs
4. Update makkah-places.ts with audioUrl for all 15 places

### Images ✅ PARTIALLY DONE
- **8 places have real images** (WebP + JPG at 1280x720):
  - Madinah: masjid-nabawi, masjid-quba
  - Makkah: masjid-haram, safa-marwa, zamzam, cave-hira, mina, arafat
- **19 places use gradient placeholder** (no good royalty-free images found)
- Images sourced from Unsplash (free license)
- `PlaceCard.tsx` updated with `<picture>` element for WebP/JPG fallback
- See `public/images/CREDITS.md` for attributions
- To add more images:
  1. Download from Unsplash/Wikimedia Commons
  2. Process: `magick input.jpg -resize 1280x720^ -gravity center -extent 1280x720 -quality 85 output.jpg`
  3. Convert: `cwebp -q 80 output.jpg -o output.webp`
  4. Place in `public/images/{city}/`

### Testing
- Test on actual mobile devices
- Verify all audio files play correctly
- Test offline behavior

---

## Important Files Reference

| File | Purpose |
|------|---------|
| `src/data/madinah-places.ts` | Madinah places data (add audioUrl here) |
| `src/data/makkah-places.ts` | Makkah places data (add audioUrl here) |
| `src/components/AudioPlayer.tsx` | Audio player component |
| `src/components/PlaceDetail.tsx` | Detail sheet with audio integration |
| `src/index.css` | Theme colors and animations |
| `src/components/PlaceCard.tsx` | Card with image display + fallback |
| `public/audio/` | Audio file storage |
| `public/images/` | Place images (WebP + JPG) |
| `public/images/CREDITS.md` | Image attributions |

---

## Git Status
- Repository initialized
- Last commit: "chore: add shadcn as a dev dependency in package.json"
- Clean working tree (all changes committed)

---

## Quick Start for Future Development

1. **Understand the project:**
   ```bash
   # Read this file first
   cat context.md
   ```

2. **Start development:**
   ```bash
   npm install
   npm run dev
   ```

3. **Continue audio generation:**
   - Use ElevenLabs MCP to generate MP3 files
   - Save to public/audio/{city}/
   - Update data files with audioUrl

4. **Deploy:**
   ```bash
   npm run build
   # Deploy dist/ folder to Netlify
   ```

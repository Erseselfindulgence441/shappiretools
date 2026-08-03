# Shappire Tools

A free, open platform of tools for the community — media downloads, file conversion, developer utilities, and more. No login, no ads, no tracking.

**Live:** [shappire.tools](https://shappire.tools)

---

## What's inside

### Media Downloader
Download videos and audio from 20+ platforms — TikTok, Twitter/X, Instagram, Bluesky, SoundCloud, Vimeo, Twitch, Bilibili, Facebook, Snapchat, Rutube and more.

Also supports Spotify and YouTube Music as identification sources: paste a link, and the system automatically finds an audio source and delivers the final file with proper metadata and cover art.

### Image Converter
Convert between PNG, JPEG, WebP, AVIF, GIF, ICO, BMP, TIFF, SVG. Supports crop (interactive), resize, quality control, and custom filename.

### Media Converter
Convert, compress, cut, resize, change FPS/bitrate, extract audio, and convert to GIF using FFmpeg — all server-side.

### Developer Tools
- JSON Tools (format, minify, validate, convert to YAML)
- JWT Decoder
- Regex Tester
- UUID Generator
- Hash Generator (MD5, SHA-1, SHA-256, SHA-512)
- Base64 Encoder/Decoder
- URL Encoder/Decoder

### Design Tools
- Color Palette Generator
- Color Converter
- Favicon Generator
- QR Code Generator

### Utilities
- Password Generator
- Link Shortener
- Emoji Copier

---

## Architecture

```
Shappire Tools/
├── apps/
│   ├── api/          — Node.js backend (Express)
│   └── web/          — React frontend (Vite + TypeScript)
```

### Backend (`apps/api`)
- **Express** server on port 80
- **Cobalt engine** for media downloads (TikTok, Twitter, Instagram, etc.)
- **Music Resolver** — multi-provider fallback system (SoundCloud → YouTube via Piped → Bandcamp → Jamendo → Audiomack → Internet Archive → Deezer)
- **FFmpeg** for video/audio processing and conversion
- **Sharp** for image conversion
- **Helmet** + rate limiting for security
- Stats tracking with JSON storage

### Frontend (`apps/web`)
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + custom CSS theme
- **Framer Motion** for animations
- **i18n** support: 🇧🇷 PT · 🇺🇸 EN · 🇪🇸 ES · 🇷🇺 RU
- SPA routing (no React Router — custom pathname-based)

---

## Running locally

### Backend

```bash
cd apps/api
cp .env.example .env
# edit .env as needed
npm install
npm run dev
```

### Frontend

```bash
cd apps/web
cp .env.example .env
# set VITE_API_URL=http://localhost:3001
npm install
npm run dev
```

---

## Environment variables

### Backend (`apps/api/.env`)
| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3001` |
| `API_URL` | Public URL of this API | `http://localhost:3001` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `DURATION_LIMIT` | Max video duration (seconds) | `10800` |

### Frontend (`apps/web/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |

---

## Deployment

### Frontend

```bash
cd apps/web
npm run build
cd dist
npm install
npm start   # serves on port 80
```

### Backend

```bash
cd apps/api
npm install
npm start   # serves on port 80
```

---

## Notes on YouTube

YouTube requires server-side authentication (cookies, session tokens) to allow media access from non-browser environments. Due to the cost and complexity of maintaining this infrastructure for a free service, YouTube is not supported as a download source.

For YouTube downloads, use [Cobalt](https://cobalt.tools) or [yt-dlp](https://github.com/yt-dlp/yt-dlp) locally.

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, Vite, Framer Motion |
| Styling | Tailwind CSS + custom CSS |
| Backend | Node.js, Express, FFmpeg, Sharp |
| Media engine | Cobalt (open source) |
| Music resolver | SoundCloud, YouTube (Piped), Bandcamp, Jamendo, Audiomack |
| Security | Helmet, express-rate-limit |
| i18n | Custom (PT, EN, ES, RU) |

---

## Credits

Built with ❤ by [Vassiliev](https://www.instagram.com/vassilievz/) for the community.

Media download engine powered by [Cobalt](https://github.com/imputnet/cobalt) (AGPL-3.0).

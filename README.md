<div align="center">

<a href="https://shappire.tools">
  <img
    src="./apps/web/src/assets/images/logo.png"
    alt="Shappire Tools logo"
    width="120"
  />
</a>

# Shappire Tools

**A free and open-source platform of media, conversion, development, design, and everyday utilities.**

No accounts. No ads. No tracking.

<p>
  <a href="https://shappire.tools">
    <img
      src="https://img.shields.io/badge/Website-shappire.tools-111111?style=for-the-badge"
      alt="Shappire Tools website"
    />
  </a>
  <a href="https://github.com/vassilievz/shappiretools/blob/main/LICENSE">
    <img
      src="https://img.shields.io/github/license/vassilievz/shappiretools?style=for-the-badge"
      alt="License"
    />
  </a>
  <a href="https://github.com/vassilievz/shappiretools/stargazers">
    <img
      src="https://img.shields.io/github/stars/vassilievz/shappiretools?style=for-the-badge"
      alt="GitHub stars"
    />
  </a>
</p>

[Open Shappire Tools](https://shappire.tools)
·
[Telegram Channel](https://t.me/shappiretools)
·
[Discord Community](https://discord.gg/rWpepgrsHn)
·
[View Source](https://github.com/vassilievz/shappiretools)
·
[Report a Bug](https://github.com/vassilievz/shappiretools/issues/new)

</div>

## About

Shappire Tools is a modern, open-source web platform bringing useful online tools together in one place.

It includes media downloading, image and video conversion, developer utilities, design tools, and everyday resources all running directly in your browser or local server without requiring registration, browser extensions, or intrusive ads.

## Features

### Media Downloader
Directly download video or audio from more than 20 supported platforms:

- TikTok
- Twitter / X
- Instagram (Reels, Posts, IGTV)
- Bluesky
- SoundCloud
- Vimeo
- Twitch (Clips)
- Bilibili
- Facebook
- Snapchat
- Rutube
- Dailymotion
- Loom
- OK.ru
- VK
- Tumblr
- Newgrounds

#### Music Resolver (Smart Resolution)
Track links from Spotify and YouTube Music act as identification sources:
1. The backend inspects the track title, artist, and metadata (`/media/inspect`).
2. The system automatically searches for a matching audio source through a multi-provider fallback chain:
   SoundCloud -> YouTube (via Piped) -> Bandcamp -> Jamendo -> Audiomack -> Internet Archive -> Deezer
3. Delivers the final audio file with embedded metadata and cover artwork.

Note: Direct video downloads from YouTube are not supported due to server infrastructure constraints. See YouTube Support.

### Image Converter
Server-side image processing powered by Sharp:
- Supported Formats: PNG, JPEG, WebP, AVIF, GIF, ICO, BMP, TIFF, SVG, HEIC/HEIF.
- Features:
  - Interactive cropping.
  - Custom width and height resizing.
  - Quality and compression control.
  - Custom output filenames.

### Media Converter & Editor
Server-side video and audio processing powered by FFmpeg:
- Supported Formats: MP4, WebM, MKV, AVI, MOV, FLV, GIF, MP3, WAV, OGG, FLAC, AAC, Opus.
- Operations:
  - Video and audio format conversion.
  - Media compression.
  - Video trimming (start and end timestamps).
  - Audio extraction from video files.
  - Frame rate (FPS) and bitrate adjustments.
  - Video to animated GIF conversion.

### Developer Tools
- JSON Tools: Format, minify, validate, and convert bidirectionally with YAML.
- JWT Decoder: Decode JWT tokens (Header, Payload, and Signature).
- Regex Tester: Regular expression tester with flag support and real-time match highlighting.
- UUID Generator: Batch generation of UUID v4 strings.
- Hash Generator: Instant hashing for MD5, SHA-1, SHA-256, and SHA-512.
- Base64 Tool: Text and file Base64 encoding and decoding.
- URL Encoder/Decoder: Safely encode and decode URL parameters.

### Design & QR Tools
- Color Palette Generator: Generate harmonious color palettes with HEX/RGB/HSL exports.
- Color Converter: Convert seamlessly between HEX, RGB, HSL, HSV, and CMYK.
- Favicon Generator: Create favicons directly from images.
- QR Code Tools: Custom QR code generator and scanner via camera or file upload.
- Google Lens Search: Sanitizes an image, uploads it temporarily, and opens Google Lens for the visual search. This is not an official Google API integration; temporary files are removed after approximately 3 minutes.

### PDF & Document Tools
- PDF Tools: Merge multiple PDFs, split documents into pages, extract specific pages, and preview files.

### Discord Suite & Utilities
- Discord Suite: Rich Embed message builder for Discord, dynamic Markdown Timestamp generator, and text formatter.
- Link Shortener: Create custom short links (`/s/:slug`) with click telemetry.
- Password Generator: Generate secure, customizable passwords.
- Emoji Copier: Complete searchable Unicode emoji catalog for quick copying.

## Architecture

```text
shappiretools/
├── apps/
│   ├── api/        # Node.js & Express backend (Media Resolution, Conversion, Tunneling)
│   └── web/        # React 18, TypeScript & Vite frontend (Single Page Application)
├── .gitignore
├── LICENSE
└── README.md
```

### Backend (`apps/api`)
- Node.js + Express: RESTful API handling media extraction, conversion, and stream delivery.
- Embedded Media Engine: Integrated media extraction engine running natively inside Node.js.
- FFmpeg & Sharp: High-performance binary processing on the server.
- Media Tunneling (`/tunnel`): Secure proxy endpoint producing temporary URLs signed with HMAC-SHA256, encrypted with AES-256, and time-restricted for streaming without leaking upstream tokens or headers.
- Security & Rate Limiting: Hardened with helmet, global rate limiting (100 req/min), burst protection (10 req/5s), and hashed IP rate limiting.

### Frontend (`apps/web`)
- React 18 + TypeScript + Vite: Fast Single Page Application.
- Tailwind CSS + Custom CSS: Modern dark theme with micro-animations.
- Framer Motion: Smooth UI transitions.
- Internationalization (i18n): Native support for Portuguese, English, Spanish, and Russian.

## Community & Support

- Telegram Channel (Updates & News): [t.me/shappiretools](https://t.me/shappiretools)
- Discord Server (Support, Feedback & Chat): [discord.gg/rWpepgrsHn](https://discord.gg/rWpepgrsHn)

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- FFmpeg installed on system (or handled by package static binary)

### 1. Clone the Repository
```bash
git clone https://github.com/vassilievz/shappiretools.git
cd shappiretools
```

### 2. Setup and Run Backend (`apps/api`)
In your first terminal:
```bash
cd apps/api
cp .env.example .env
npm install
npm run dev
```
The API server will run at http://localhost:3001.

### 3. Setup and Run Frontend (`apps/web`)
In a second terminal:
```bash
cd apps/web
cp .env.example .env
npm install
npm run dev
```
The frontend will open at http://localhost:5173.

## Environment Variables

### Backend (`apps/api/.env`)
| Variable | Description | Default |
|---|---|---|
| PORT | API server listening port | 3001 |
| API_URL | Public API URL | http://localhost:3001 |
| FRONTEND_URL | Allowed CORS origin | http://localhost:5173 |
| DURATION_LIMIT | Maximum allowed media duration in seconds | 10800 (3 hours) |

### Frontend (`apps/web/.env`)
| Variable | Description | Default |
|---|---|---|
| VITE_API_URL | Backend API URL consumed by the web app | http://localhost:3001 (dev) |

## Production Build

### Frontend (`apps/web`)
```bash
cd apps/web
npm run build
```
Production assets will be generated in `apps/web/dist/` and can be served using static hosts (Nginx, Caddy, Cloudflare Pages, Vercel, Netlify, etc.).

### Backend (`apps/api`)
```bash
cd apps/api
npm start
```

## YouTube Support

Direct video downloads from YouTube are not offered on Shappire Tools.

Maintaining server infrastructure to bypass YouTube's continuous anti-bot restrictions, IP rotation demands, and session token requirements is out of scope for this free service.

YouTube Music links can still be used for track identification, enabling the system to resolve matching audio from alternative sources (such as SoundCloud, Piped, Bandcamp, etc.).

For direct YouTube downloads, we recommend:
- yt-dlp (CLI tool)
- Cobalt (cobalt.tools)

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) see the LICENSE file for details.

## Credits

Created by [Vassiliev](https://t.me/shappiretools) for the community.

Join our [Telegram Channel](https://t.me/shappiretools) for updates and our [Discord Server](https://discord.gg/rWpepgrsHn) for support and feedback.

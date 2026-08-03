<div align="center">

<a href="https://shappire.tools">
  <img
    src="./apps/web/src/assets/images/logo.png"
    alt="Shappire Tools logo"
    width="120"
  />
</a>

# Shappire Tools

**A free and open-source collection of media, conversion, development, design, and everyday utilities.**

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
[View Source](https://github.com/vassilievz/shappiretools)
·
[Report a Bug](https://github.com/vassilievz/shappiretools/issues/new)

</div>

---

## About

Shappire Tools is an open-source platform that brings useful online tools together in one place.

It includes media downloading, image and video conversion, developer utilities, design tools, and everyday resources — all available without requiring an account.

## Features

### Media Downloader

Download video or audio from more than 20 supported platforms, including:

- TikTok
- Twitter / X
- Instagram
- Bluesky
- SoundCloud
- Vimeo
- Twitch
- Bilibili
- Facebook
- Snapchat
- Rutube
- And more

Spotify and YouTube Music links can also be used as **identification sources**.

When one of these links is submitted, Shappire attempts to identify the track, locate a compatible audio source, and generate the final file with metadata and cover artwork.

> YouTube itself is not supported as a direct download source. See [YouTube support](#youtube-support).

### Image Converter

Convert images between:

- PNG
- JPEG
- WebP
- AVIF
- GIF
- ICO
- BMP
- TIFF
- SVG

Additional options include:

- Interactive cropping
- Image resizing
- Quality control
- Custom output filenames

### Media Converter

Server-side media processing powered by FFmpeg.

Supported operations include:

- Video and audio conversion
- Compression
- Trimming
- Resizing
- FPS adjustment
- Bitrate adjustment
- Audio extraction
- GIF generation

### Developer Tools

- JSON formatter, minifier, validator, and YAML converter
- JWT decoder
- Regex tester
- UUID generator
- Hash generator
  - MD5
  - SHA-1
  - SHA-256
  - SHA-512
- Base64 encoder and decoder
- URL encoder and decoder

### Design Tools

- Color palette generator
- Color converter
- Favicon generator
- QR code generator

### Utilities

- Password generator
- Link shortener
- Emoji copier

---

## Privacy

Shappire Tools is designed to operate without:

- User accounts
- Advertising
- Behavioral tracking

Some tools require files, media URLs, or other data to be sent to the backend for processing.

Self-hosters are responsible for configuring their own infrastructure, logs, retention policies, third-party services, and privacy practices.

---

## Project Structure

```text
shappiretools/
├── apps/
│   ├── api/        # Node.js and Express backend
│   └── web/        # React, Vite, and TypeScript frontend
├── .gitignore
├── LICENSE
└── README.md
```

## Architecture

### API — `apps/api`

The backend is responsible for media resolution, downloads, conversion, and server-side processing.

Main components:

- Node.js
- Express
- Cobalt-based media extraction
- FFmpeg for audio and video processing
- Sharp for image processing
- Helmet for HTTP security headers
- Express rate limiting
- JSON-based statistics storage

#### Music Resolver

The music resolver uses a multi-provider fallback strategy:

```text
SoundCloud
    ↓
YouTube through Piped
    ↓
Bandcamp
    ↓
Jamendo
    ↓
Audiomack
    ↓
Internet Archive
    ↓
Deezer
```

Provider availability may vary depending on region, upstream changes, rate limits, and instance configuration.

### Web — `apps/web`

The frontend is a single-page application built with:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Custom CSS
- Framer Motion

Supported interface languages:

- 🇧🇷 Portuguese
- 🇺🇸 English
- 🇪🇸 Spanish
- 🇷🇺 Russian

Routing is handled through a custom pathname-based implementation rather than React Router.

---

## Getting Started

### Requirements

Before running the project, install:

- Node.js
- npm
- FFmpeg

Some media providers may require additional environment variables or third-party credentials.

### Clone the Repository

```bash
git clone https://github.com/vassilievz/shappiretools.git
cd shappiretools
```

### Run the API

```bash
cd apps/api
cp .env.example .env
npm install
npm run dev
```

The local API uses port `3001` by default unless another value is configured through `PORT`.

### Run the Web Application

Open another terminal:

```bash
cd apps/web
cp .env.example .env
npm install
npm run dev
```

For local development, configure:

```env
VITE_API_URL=http://localhost:3001
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

---

## Environment Variables

Never commit real `.env` files or production credentials.

Use the provided `.env.example` files as templates.

### API — `apps/api/.env`

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port used by the API server | `3001` |
| `API_URL` | Public URL of the API | `http://localhost:3001` |
| `FRONTEND_URL` | Origin allowed through CORS | `http://localhost:5173` |
| `DURATION_LIMIT` | Maximum accepted media duration in seconds | `10800` |

Additional provider credentials may be required depending on which integrations are enabled.

Refer to:

```text
apps/api/.env.example
```

### Web — `apps/web/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Public URL used by the frontend to access the API |

Variables prefixed with `VITE_` are bundled into browser code and must never contain private credentials.

---

## Production Build

### Web Application

```bash
cd apps/web
npm install
npm run build
```

The production files will be generated inside:

```text
apps/web/dist/
```

Serve this directory using a static hosting provider or web server such as:

- Nginx
- Caddy
- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

Make sure SPA fallback routing is configured so unknown application paths return `index.html`.

### API

```bash
cd apps/api
npm install
npm start
```

In production, it is recommended to:

- Run the API behind a reverse proxy
- Enable HTTPS
- Configure rate limits
- Restrict CORS to the correct frontend domain
- Store secrets only in server-side environment variables
- Configure the public port through `PORT`
- Keep FFmpeg and Node.js updated

---

## YouTube Support

YouTube is not supported as a direct download source.

Accessing YouTube media reliably from server environments commonly requires authentication cookies, session maintenance, proxy infrastructure, and continuous adaptation to upstream restrictions.

Maintaining that infrastructure is outside the scope of this free service.

YouTube Music links may still be used for **track identification**, allowing the music resolver to search for a compatible source elsewhere.

For direct YouTube downloads, consider:

- [Cobalt](https://cobalt.tools)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite, Framer Motion |
| Styling | Tailwind CSS, custom CSS |
| Backend | Node.js, Express |
| Media processing | FFmpeg |
| Image processing | Sharp |
| Media extraction | Cobalt |
| Music resolution | SoundCloud, Piped, Bandcamp, Jamendo, Audiomack, Internet Archive, Deezer |
| Security | Helmet, express-rate-limit |
| Internationalization | Custom i18n implementation |
| Languages | Portuguese, English, Spanish, Russian |

---

## Contributing

Contributions, bug fixes, translations, documentation improvements, and suggestions are welcome.

1. Fork the [repository](https://github.com/vassilievz/shappiretools/fork).
2. Create a branch for your changes:

```bash
git checkout -b feature/my-change
```

3. Keep your changes focused and documented.
4. Do not commit environment files, credentials, generated builds, or runtime data.
5. Confirm that the API and frontend builds still pass.
6. Commit your changes:

```bash
git commit -m "Add my change"
```

7. Push your branch:

```bash
git push origin feature/my-change
```

8. Open a [pull request](https://github.com/vassilievz/shappiretools/compare).

Use the project’s [issue tracker](https://github.com/vassilievz/shappiretools/issues) to report bugs or suggest features.

---

## Security

Do not report security vulnerabilities through public GitHub issues.

Avoid including credentials, personal data, access tokens, private URLs, or working exploits in public reports.

Use GitHub’s private vulnerability reporting feature when available.

---

## Legal Notice

Shappire Tools is intended for lawful use.

Users are responsible for ensuring that their use of the software complies with applicable laws, platform terms, copyright rules, and permissions from content owners.

Shappire Tools is not affiliated with any of the platforms supported by its tools.

All trademarks, service names, and platform names belong to their respective owners.

---

## Credits

Created with ❤ by [Vassiliev](https://www.instagram.com/vassilievz/) for the community.

Media extraction functionality is powered in part by [Cobalt](https://github.com/imputnet/cobalt), licensed under the GNU Affero General Public License v3.0.

---

## License

Shappire Tools is licensed under the [GNU Affero General Public License v3.0 only](./LICENSE).

You may use, modify, and redistribute this project under the terms of the license.

Modified versions made available to users over a network must also make their corresponding source code available under the applicable AGPL terms.

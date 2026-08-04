import type { TranslationMap } from '../types'

const en: TranslationMap =  {
    'nav.settings': 'Settings', 'nav.about': 'About',
    'hero.note': 'This is shappire. She downloads your videos — thank her.',
    'hero.placeholder': 'Paste the link you want to save', 'hero.process': 'Process', 'hero.processing': 'Processing...',
    'hero.auto': 'auto', 'hero.audio': 'audio', 'hero.mute': 'mute', 'hero.ready': 'File ready', 'hero.download': 'Download', 'hero.newLink': 'New link',
    'footer.before': 'By continuing, you agree to the', 'footer.terms': 'terms', 'footer.middle': 'and', 'footer.ethics': 'usage ethics',
    'settings.kicker': 'PERSONALIZE', 'settings.title': 'Settings', 'settings.language': 'Language', 'settings.languageAuto.title': 'Automatic selection', 'settings.languageAuto.description': 'Use your browser language when a translation is available.', 'settings.languagePreferred.title': 'Preferred language', 'settings.languagePreferred.description': 'Used when automatic selection is turned off.',
    'settings.video': 'Video', 'settings.quality': 'Quality', 'settings.codec': 'Codec (YouTube)', 'settings.gifs': 'Convert animated GIFs',
    'settings.audio': 'Audio', 'settings.format': 'Format', 'settings.bitrate': 'Bitrate', 'settings.tiktok': 'Full TikTok audio',
    'settings.file': 'File', 'settings.filename': 'File name', 'settings.metadata': 'Remove metadata',
    'settings.max': 'Maximum', 'settings.compatible': 'H.264 (compatible)', 'settings.bestQuality': 'AV1 (best quality)', 'settings.balanced': 'VP9 (balanced)',
    'settings.best': 'Best', 'settings.basic': 'Basic', 'settings.pretty': 'Pretty', 'settings.classic': 'Classic', 'settings.detailed': 'Detailed',
    'about.kicker': 'ABOUT SHAPPIRE', 'about.title.1': 'Free tools', 'about.title.2': 'for everyone.',
    'about.lead': 'Shappire is a free tools platform — media downloads, file conversion, developer and designer utilities. No accounts, no ads, and full respect for your privacy.',
    'about.one.title': 'More than downloads', 'about.one.body': 'Download videos, convert images, generate hashes, manipulate JSON, create color palettes and more — all in one place.',
    'about.two.title': 'Your way', 'about.two.body': 'Configure quality, format, codec and file name. Every tool respects your preferences.',
    'about.three.title': 'No barriers', 'about.three.body': 'No login, no artificial limits, no tracking. Built to be useful, not to monetize your data.',
    'about.inspiration.title': 'An idea worth growing.', 'about.inspiration.one': 'Shappire was inspired by the ideas and care behind', 'about.inspiration.two': 'Like Cobalt, we believe useful tools should help people without demanding payment — from designers to someone who simply wants to save a song, a video, or a memory.', 'about.inspiration.three': 'We do not want to take credit away from Cobalt or its developers. We have deep respect and admiration for the project. Our intention is to grow this idea of reciprocity, help others, and eventually expand Shappire far beyond video downloads.',
    'about.community.title': 'Community before barriers.', 'about.community.one': 'We also admire independent initiatives such as the Brazilian creators of Hydra Launcher, Steam Tools, Stremio, and many other projects. Each serves a different niche, but they share one idea: helping the community.', 'about.community.two': 'When digital experiences become inaccessible due to prohibitive costs from large companies, technology can create more inclusive paths to learn, create, and enjoy culture.',
    'terms.label': 'TERMS OF USE', 'terms.title': 'Use responsibly.',
    'terms.intro': 'By using Shappire, you agree to use the tool in accordance with applicable law and the rights related to the content accessed.',
    'terms.one.title': 'Permitted use', 'terms.one.body': 'Only use Shappire to download content you own, are authorized to use, or may legally access.',
    'terms.two.title': 'Responsibility', 'terms.two.body': 'You are responsible for submitted links, obtained files, and how you use processed content.',
    'terms.three.title': 'Availability', 'terms.three.body': 'The tool may be updated, limited, or changed to preserve its operation and service security.',
    'ethics.label': 'USAGE ETHICS', 'ethics.title': 'The internet deserves care.',
    'ethics.intro': 'Shappire exists to make access to media simpler, without encouraging rights violations, platform abuse, or improper distribution.',
    'ethics.one.title': 'Respect creators', 'ethics.one.body': 'Do not use the tool to harm creators, remove credits, or redistribute work without permission.',
    'ethics.two.title': 'Avoid abuse', 'ethics.two.body': 'Do not use automations, excessive request volumes, or links intended to bypass platform protections.',
    'ethics.three.title': 'Protect people', 'ethics.three.body': 'Never process or share private, sensitive, or non-consensually obtained content.',
    'error.connection': 'Could not connect to the server. Check that the backend is running.', 'error.unsupported': 'This link is not supported.', 'error.invalid': 'Invalid URL. Check the link.', 'error.missing': 'Paste a link first.', 'error.request': 'Invalid request.', 'error.fetch': 'Could not access the content.', 'error.empty': 'No content found.', 'error.unavailable': 'Video unavailable.', 'error.live': 'Live videos cannot be downloaded.', 'error.long': 'Video is too long.', 'error.post': 'Post unavailable.', 'error.private': 'Post is private.', 'error.login': 'This video requires a YouTube login.', 'error.service': 'Unsupported service.', 'error.generic': 'Internal error. Try again.',
  }

Object.assign(en, {
  'nav.tools': 'Tools',
  'tools.image.name': 'Image Converter',
  'tools.image.description': 'Convert images between formats with optimized quality.',
  'image.kicker': 'TOOLS', 'image.title': 'Image Converter', 'image.lead': 'Convert images on the server without permanent storage.',
  'image.drop': 'Drop an image here', 'image.dropHint': 'PNG, JPG, WebP, GIF, BMP, or TIFF · up to 20 MB', 'image.select': 'Select image', 'image.remove': 'Remove',
  'image.output': 'Output format', 'image.quality': 'Quality', 'image.convert': 'Convert image', 'image.converting': 'Converting...',
  'image.original': 'Original', 'image.converted': 'Converted', 'image.download': 'Download image', 'image.reset': 'Convert another', 'image.ready': 'Image ready',
  'image.invalid': 'Select a supported image up to 20 MB.', 'image.previewUnavailable': 'A preview for this format is not available in this browser.',
})

Object.assign(en, {
  'image.info': 'File details', 'image.formats': 'Accepted formats', 'image.settings': 'Conversion settings',
  'image.keepAspect': 'Keep aspect ratio', 'image.resize': 'Resize image', 'image.width': 'Width', 'image.height': 'Height',
  'image.dimensions': 'Dimensions', 'image.type': 'Type', 'image.before': 'Before', 'image.after': 'After', 'image.savings': 'smaller', 'image.processing': 'Preparing your image...',
})

Object.assign(en, {
  'tools.emoji.name': 'Emoji Copier', 'tools.emoji.description': 'Find and copy keyboard emojis with one click.',
  'emoji.kicker': 'TOOLS', 'emoji.title': 'Copy Emojis', 'emoji.lead': 'Click any emoji to copy it and use it anywhere.', 'emoji.copied': 'Copied',
  'emoji.faces': 'Faces', 'emoji.hands': 'Gestures', 'emoji.nature': 'Nature', 'emoji.objects': 'Objects', 'emoji.symbols': 'Symbols',
})

Object.assign(en, {
  'emoji.search': 'Search emoji by name', 'emoji.total': 'emojis', 'emoji.loading': 'Loading full catalogue...', 'emoji.showMore': 'Show more', 'emoji.categories': 'Emoji categories',
  'emoji.categories.all': 'All', 'emoji.categories.smileys': 'Smileys & emotion', 'emoji.categories.people': 'People & body', 'emoji.categories.animals': 'Animals & nature', 'emoji.categories.food': 'Food & drink', 'emoji.categories.travel': 'Travel & places', 'emoji.categories.activities': 'Activities', 'emoji.categories.objects': 'Objects', 'emoji.categories.symbols': 'Symbols', 'emoji.categories.flags': 'Flags', 'emoji.categories.components': 'Components',
})

Object.assign(en, {
  'image.from': 'Convert from:', 'image.to': 'To:', 'image.searchFormat': 'Search format', 'image.sourceMismatch': 'The selected source format does not match the uploaded file.',
})

Object.assign(en, {
  'image.crop': 'Crop', 'image.cropHint': 'Drag on the image to select the crop area.',
  'image.filename': 'File name', 'image.filenamePlaceholder': 'file-name',
})

Object.assign(en, {
  'tools.media.name': 'Media Converter', 'tools.media.description': 'Convert videos and audio between formats, compress, cut and more.',
  'media.kicker': 'TOOLS', 'media.title': 'Media Converter', 'media.lead': 'Convert, compress, cut and transform videos and audio on the server.',
  'media.drop': 'Drop a video or audio here', 'media.dropHint': 'MP4, WebM, MKV, AVI, MOV, MP3, WAV, FLAC, OGG · up to 200 MB',
  'media.select': 'Select file', 'media.settings': 'Conversion settings', 'media.outputFormat': 'Output format',
  'media.convert': 'Convert media', 'media.converting': 'Converting...', 'media.download': 'Download', 'media.reset': 'Convert another',
  'media.filename': 'File name', 'media.invalid': 'Upload a supported video or audio file up to 200 MB.', 'media.failed': 'Media conversion failed.',
})

Object.assign(en, {
  'tools.directory.kicker': 'TOOLS', 'tools.directory.title': 'All tools', 'tools.directory.lead': 'Everything you need in one place.',
  'tools.json.name': 'JSON Tools', 'tools.json.description': 'Format, minify, validate or convert JSON to YAML.',
  'tools.jwt.name': 'JWT Decoder', 'tools.jwt.description': 'Decode JWT tokens to view header and payload.',
  'tools.regex.name': 'Regex Tester', 'tools.regex.description': 'Test regular expressions in real time.',
  'tools.uuid.name': 'UUID Generator', 'tools.uuid.description': 'Generate random v4 UUIDs.',
  'tools.hash.name': 'Hash Generator', 'tools.hash.description': 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes.',
  'tools.base64.name': 'Base64', 'tools.base64.description': 'Encode or decode text in Base64.',
  'tools.url.name': 'URL Encoder', 'tools.url.description': 'Encode or decode URLs.',
})

Object.assign(en, { 'image.dropHint': 'PNG, JPG, WebP, GIF, SVG, BMP, TIFF, ICO · up to 20 MB' })

Object.assign(en, {
  'footer.processed': 'processed files',
  'media.fileReady': 'FILE READY', 'media.remove': 'Remove', 'media.readyToConvert': 'Ready to convert', 'media.chooseAction': 'CHOOSE AN ACTION', 'media.chooseActionLead': 'Choose how you want to transform this file.',
  'media.mode.convert': 'Convert', 'media.mode.convert.description': 'Change the file format', 'media.mode.audio': 'Extract audio', 'media.mode.audio.description': 'Save only the sound', 'media.mode.compress': 'Compress', 'media.mode.compress.description': 'Reduce the file size', 'media.mode.resize': 'Resize', 'media.mode.resize.description': 'Adjust width and height', 'media.mode.cut': 'Trim clip', 'media.mode.cut.description': 'Choose a start and end', 'media.mode.fps': 'Change FPS', 'media.mode.fps.description': 'Control video smoothness', 'media.mode.bitrate': 'Change bitrate', 'media.mode.bitrate.description': 'Set the data rate', 'media.mode.gif': 'To GIF', 'media.mode.gif.description': 'Turn a clip into a GIF',
  'media.compression': 'Compression', 'media.compressionHint': '0 = lossless, 51 = maximum compression. Default: 28', 'media.dimensions': 'Dimensions', 'media.width': 'Width', 'media.height': 'Height', 'media.cutRange': 'Trim start and end', 'media.cutHint': 'Format: HH:MM:SS or seconds (e.g. 90)', 'media.videoBitrate': 'Video bitrate', 'media.audioBitrate': 'Audio bitrate',
})

Object.assign(en, {
  'hero.eyebrow': 'simple, fast, without noise', 'hero.description': 'Turn links into files ready to keep. Video, audio, images, and GIFs in an elegant experience.', 'hero.inputLabel': 'Paste your link', 'hero.photo': 'Photo', 'hero.video': 'Video',
})

Object.assign(en, { 'media.trim': 'Trim the clip', 'media.trimStart': 'Clip start', 'media.trimEnd': 'Clip end' })

Object.assign(en, { 'media.timelineLoading': 'Preparing timeline...' })
Object.assign(en, { 'media.trimInstruction': 'DRAG TO SET THE CLIP' })
Object.assign(en, { 'tools.directory.kicker': 'TOOLS', 'tools.directory.title': 'Everything in one place.', 'tools.directory.lead': 'Choose a tool and get started. Each one is made to solve a task without the noise.', 'tools.directory.all': 'View all tools', 'tools.directory.allDescription': 'Open the full catalogue' })
Object.assign(en, { 'tools.media.description': 'Convert, compress and resize video and audio.' })
Object.assign(en, { 'tools.password.name': 'Password Generator', 'tools.password.description': 'Create strong, unique passwords in seconds.', 'password.kicker': 'TOOLS', 'password.title': 'Password Generator', 'password.lead': 'Create strong, private credentials ready to use.', 'password.length': 'Length', 'password.upper': 'Uppercase letters', 'password.lower': 'Lowercase letters', 'password.numbers': 'Numbers', 'password.symbols': 'Symbols', 'password.avoidAmbiguous': 'Avoid similar characters', 'password.generate': 'Generate new password', 'password.copy': 'Copy password', 'password.weak': 'Weak', 'password.good': 'Good', 'password.strong': 'Strong', 'password.history': 'JUST GENERATED' })
Object.assign(en, { 'tools.shortener.name': 'Link Shortener', 'tools.shortener.description': 'Turn long URLs into short links that are easy to share.', 'shortener.kicker': 'TOOLS', 'shortener.title': 'Link Shortener', 'shortener.lead': 'Create short, direct links that are easy to share.', 'shortener.placeholder': 'Paste a long URL here', 'shortener.customPrefix': 'shappire/', 'shortener.customPlaceholder': 'custom code', 'shortener.create': 'Shorten link', 'shortener.creating': 'Shortening...', 'shortener.ready': 'LINK READY', 'shortener.copy': 'Copy', 'shortener.copied': 'Copied', 'shortener.history': 'RECENT ON THIS DEVICE', 'shortener.failed': 'Could not shorten this link.' })
Object.assign(en, { 'tools.pdf.name': 'PDF Tools', 'tools.pdf.description': 'View, organize, merge and export PDF documents.', 'pdf.kicker': 'TOOLS', 'pdf.title': 'PDF Tools', 'pdf.lead': 'Open, organize pages, merge files and export PDFs in your browser.', 'pdf.open': 'Open PDFs', 'pdf.openHint': 'Select one or more PDFs up to 40 MB.', 'pdf.add': 'Add PDF', 'pdf.search': 'Search this page', 'pdf.save': 'Export PDF', 'pdf.pages': 'PAGES', 'pdf.page': 'Page', 'pdf.merge': 'Merge files', 'pdf.found': 'Text found on this page.', 'pdf.notFound': 'Text not found on this page.', 'pdf.failed': 'Could not open this PDF.' })

Object.assign(en, { 'tools.category.media': 'MEDIA AND DOCUMENTS', 'tools.category.utilities': 'UTILITIES', 'tools.category.developer': 'DEVELOPMENT' })
Object.assign(en, { 'tools.qr.name': 'QR Code Generator', 'tools.qr.description': 'Create and read QR codes for links, WiFi and contacts.', 'qr.kicker': 'TOOLS', 'qr.title': 'QR Tools', 'qr.lead': 'Create, download and read QR codes in one place.', 'qr.text': 'Text', 'qr.link': 'Link', 'qr.wifi': 'WiFi', 'qr.contact': 'Contact', 'qr.textPlaceholder': 'Write your text', 'qr.linkPlaceholder': 'https://example.com', 'qr.password': 'Password', 'qr.name': 'Name', 'qr.phone': 'Phone', 'qr.copy': 'Copy content', 'qr.download': 'Download PNG', 'qr.preview': 'PREVIEW', 'qr.reader': 'QR CODE READER', 'qr.upload': 'Upload image', 'qr.notFound': 'No QR code found in this image.', 'qr.sharePreview': 'SHARE PREVIEW', 'qr.discord': 'Discord', 'qr.twitter': 'Twitter / X', 'qr.empty': 'Your content will appear here.' })
Object.assign(en, { 'tools.category.design': 'DESIGNERS AND EDITORS', 'tools.palette.name': 'Color Palette Generator', 'tools.palette.description': 'Extract a color palette directly from an image.', 'palette.kicker': 'DESIGNERS AND EDITORS', 'palette.title': 'Color Palette', 'palette.lead': 'Upload an image and find the colors that define its visual identity.', 'palette.upload': 'Upload image', 'palette.uploadHint': 'PNG, JPG, WebP and other image formats.', 'palette.image': 'UPLOADED IMAGE' })
Object.assign(en, { 'tools.color.name': 'Color Converter', 'tools.color.description': 'Convert colors between HEX, RGB, HSL and CMYK.', 'color.kicker': 'DESIGNERS AND EDITORS', 'color.title': 'Color Converter', 'color.lead': 'Convert digital colors and prepare values for print.', 'color.hex': 'HEX' })
Object.assign(en, { 'tools.category.discord': 'DISCORD TOOLS', 'discord.components.title': 'Components V2 Builder', 'discord.components.lead': 'Build interactive messages, preview every block and export a payload ready for your bot.', 'discord.embed.title': 'Discord Embed Builder', 'discord.embed.lead': 'Create complete embeds with preview, fields, media and exports for your project.' })
Object.assign(en, { 'faq.kicker': 'SUPPORT', 'faq.title': 'Frequently asked questions.', 'faq.lead': 'Direct answers to use Shappire without wasting time.', 'faq.helpTitle': 'How can we help?', 'faq.helpLead': 'Choose a question to see the answer.', 'faq.downloadLink': 'Go to downloads', 'faq.q1.question': 'How do I download?', 'faq.q1.answer': 'Paste a link into the main field, choose the mode you need — automatic, audio, or muted — and select Process.', 'faq.q2.question': 'Which platforms work?', 'faq.q2.answer': 'TikTok, Twitter/X, Instagram, Bluesky, Facebook, Pinterest, SoundCloud, Vimeo, Twitch, Dailymotion, Bilibili, Streamable, Snapchat, Tumblr, Rutube, Loom, VK, OK and Newgrounds.', 'faq.q3.question': 'Why is YouTube not supported?', 'faq.q3.answer': 'YouTube requires authentication to access videos from servers. This requires account cookies, session tokens and expensive infrastructure, which makes a free and reliable service unfeasible. For YouTube, use yt-dlp on your computer.', 'faq.q4.question': 'Do files keep their quality?', 'faq.q4.answer': 'Yes. The highest quality available from the source is preserved. You can also adjust video and audio preferences in settings.', 'faq.q5.question': 'Do I need an account?', 'faq.q5.answer': 'No. Shappire works without registration, login, or tracking.', 'faq.q6.question': 'Are files saved on the server?', 'faq.q6.answer': 'No. Files are processed in real time and the link expires automatically after 90 seconds.' })
Object.assign(en, { 'tools.favicon.name': 'Favicon Generator', 'tools.favicon.description': 'Turn an image into favicons ready for your website.', 'favicon.kicker': 'DESIGNERS AND EDITORS', 'favicon.title': 'Favicon Generator', 'favicon.lead': 'Upload an image and export the essential sizes for the web.', 'favicon.upload': 'Upload image', 'favicon.hint': 'PNG, JPG, WebP and other image formats.' })
Object.assign(en, {
  'coming.title': 'Under construction',
  'coming.description': 'Shappire is working on this tool. Come back soon to use {tool}.',
  'coming.badge': 'In development',
})

Object.assign(en, {
  'tools.googleLens.name': 'Google Lens Search', 'tools.googleLens.description': 'Upload an image and continue your visual search on Google Lens.',
  'googleLens.kicker': 'VISUAL SEARCH', 'googleLens.title': 'Google Lens Search.', 'googleLens.lead': 'Upload an image and continue your visual search on Google Lens.',
  'googleLens.dropTitle': 'Drop an image here', 'googleLens.dropLead': 'or select a file from your device', 'googleLens.formats': 'JPEG, PNG or WebP — maximum 10 MB', 'googleLens.choose': 'Choose image', 'googleLens.clear': 'Remove image', 'googleLens.search': 'Search with Google Lens', 'googleLens.loading': 'Preparing search...', 'googleLens.open': 'Open Google Lens', 'googleLens.privacy': 'Your image is sanitized, uploaded temporarily, and removed after approximately 15 minutes. Google may process it when you continue.',
  'googleLens.errors.image_required': 'Select an image to search.', 'googleLens.errors.unsupported_image': 'Upload a JPEG, PNG, or WebP image up to 10 MB.', 'googleLens.errors.invalid_image': 'The uploaded file is not a valid image.', 'googleLens.errors.image_too_large': 'The image exceeds the allowed limit.', 'googleLens.errors.storage_not_configured': 'Visual search is not available on this server.', 'googleLens.errors.temporary_upload_failed': 'The temporary image could not be prepared.', 'googleLens.errors.rate_limited': 'Visual search limit reached. Try again later.', 'googleLens.errors.internal_error': 'The search could not be prepared now.',
})

Object.assign(en, { 'googleLens.privacy': 'Your image is sanitized, uploaded temporarily, and removed after approximately 3 minutes. Google may process it when you continue.' })

Object.assign(en, {
  'home.persona.bubble': 'This is Shappire D. She wears super cute glasses and is the reason this project exists — thank her.',
  'nav.downloader': 'Downloader',
  'home.kicker': 'SHAPPIRE TOOLS',
  'home.title': 'Simple tools for the everyday internet.',
  'home.lead': 'Media downloads, file converters, developer tools, documents, and Discord suite all in one place.',
  'home.downloader': 'Media Downloader',
  'home.tools': 'Explore Tools',
  'home.stats.platforms': '+20 Platforms',
  'home.stats.local': 'Local & Server Processing',
  'home.stats.free': '100% Free',
  'home.pillars.zero.title': 'Zero Registration',
  'home.pillars.zero.desc': '100% free and private. No logins or trackers.',
  'home.pillars.fast.title': 'Ultra-Fast',
  'home.pillars.fast.desc': 'Local and server processing powered by Sharp and FFmpeg.',
  'home.pillars.quality.title': 'Maximum Quality',
  'home.pillars.quality.desc': 'Media and files preserve original maximum quality.',
  'home.tools.badge': 'TOOLS',
  'home.tools.sectionTitle': 'Everything you need in one place.',
  'home.tools.sectionLead': 'Explore the complete catalog of media utilities, converters, and dev tools.',
  'home.tools.converter.title': 'Image & Media Converter',
  'home.tools.converter.description': 'Convert formats (PNG, WebP, AVIF, MP4, MP3), crop, and adjust quality.',
  'home.tools.dev.title': 'Developer Tools',
  'home.tools.dev.description': 'JSON Formatter, JWT Decoder, Regex Tester, Hash and UUID Generators.',
  'home.tools.pdf.title': 'PDF & Documents',
  'home.tools.pdf.description': 'Merge multiple PDFs, split pages, and extract document parts.',
  'home.tools.discord.title': 'Discord Suite',
  'home.tools.discord.description': 'Build interactive Rich Embeds, timestamp generator, and formatters.',
  'home.media.title': 'Media Downloader',
  'home.media.description': 'Download videos, audio, and clips from over 20 supported platforms.',
  'home.utility.title': 'Utilities & Design',
  'home.utility.description': 'Link shortener, QR Code generator, color palettes, and strong passwords.',
  'home.platforms.title': 'SUPPORTED MEDIA PLATFORMS',
})

export default en

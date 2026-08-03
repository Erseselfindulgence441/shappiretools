import { useState } from 'react'
import { Film, Music, Type } from 'lucide-react'
import {
  getDownloadSettings,
  saveDownloadSettings,
  type DownloadSettings,
} from '../../features/settings'
import { languageOptions, useI18n } from '../../i18n'
import { Toggle } from '../ui'

export function Settings() {
  const [settings, setSettings] = useState(getDownloadSettings)
  const {
    preferredLanguage,
    autoLanguage,
    setLanguage,
    setAutoLanguage,
    t,
  } = useI18n()

  function update(key: keyof DownloadSettings, value: string | boolean) {
    const updated = { ...settings, [key]: value }
    saveDownloadSettings(updated)
    setSettings(updated)
  }

  return (
    <section className="container settings-section" id="configuracoes">
      <div className="section-heading">
        <span>{t('settings.kicker')}</span>
        <h2>{t('settings.title')}</h2>
      </div>

      <div className="language-setting" aria-label={t('settings.language')}>
        <div className="language-setting-row">
          <div>
            <strong>{t('settings.languageAuto.title')}</strong>
            <p>{t('settings.languageAuto.description')}</p>
          </div>
          <Toggle
            active={autoLanguage}
            label={t('settings.languageAuto.title')}
            onClick={() => setAutoLanguage(!autoLanguage)}
          />
        </div>
        <div
          className={`language-setting-row language-preferred${autoLanguage ? ' is-disabled' : ''}`}
        >
          <div>
            <strong>{t('settings.languagePreferred.title')}</strong>
            <p>{t('settings.languagePreferred.description')}</p>
          </div>
          <select
            aria-label={t('settings.languagePreferred.title')}
            value={preferredLanguage}
            disabled={autoLanguage}
            onChange={(event) =>
              setLanguage(event.target.value as typeof preferredLanguage)
            }
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <Film size={18} />
            <h3>{t('settings.video')}</h3>
          </div>
          <div className="setting-item">
            <label>{t('settings.quality')}</label>
            <select
              value={settings.videoQuality}
              onChange={(event) => update('videoQuality', event.target.value)}
            >
              <option value="max">{t('settings.max')}</option>
              <option value="2160">4K (2160p)</option>
              <option value="1440">1440p</option>
              <option value="1080">1080p</option>
              <option value="720">720p</option>
              <option value="480">480p</option>
              <option value="360">360p</option>
            </select>
          </div>
          <div className="setting-item">
            <label>{t('settings.codec')}</label>
            <select
              value={settings.youtubeVideoCodec}
              onChange={(event) =>
                update('youtubeVideoCodec', event.target.value)
              }
            >
              <option value="h264">{t('settings.compatible')}</option>
              <option value="av1">{t('settings.bestQuality')}</option>
              <option value="vp9">{t('settings.balanced')}</option>
            </select>
          </div>
          <div className="setting-item toggle">
            <label>{t('settings.gifs')}</label>
            <Toggle
              active={settings.convertGif}
              label={t('settings.gifs')}
              onClick={() => update('convertGif', !settings.convertGif)}
            />
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <Music size={18} />
            <h3>{t('settings.audio')}</h3>
          </div>
          <div className="setting-item">
            <label>{t('settings.format')}</label>
            <select
              value={settings.audioFormat}
              onChange={(event) => update('audioFormat', event.target.value)}
            >
              <option value="best">{t('settings.best')}</option>
              <option value="mp3">MP3</option>
              <option value="ogg">OGG</option>
              <option value="opus">Opus</option>
              <option value="wav">WAV</option>
            </select>
          </div>
          <div className="setting-item">
            <label>{t('settings.bitrate')}</label>
            <select
              value={settings.audioBitrate}
              onChange={(event) => update('audioBitrate', event.target.value)}
            >
              <option value="320">320 kbps</option>
              <option value="256">256 kbps</option>
              <option value="128">128 kbps</option>
              <option value="96">96 kbps</option>
              <option value="64">64 kbps</option>
            </select>
          </div>
          <div className="setting-item toggle">
            <label>{t('settings.tiktok')}</label>
            <Toggle
              active={settings.tiktokFullAudio}
              label={t('settings.tiktok')}
              onClick={() =>
                update('tiktokFullAudio', !settings.tiktokFullAudio)
              }
            />
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-header">
            <Type size={18} />
            <h3>{t('settings.file')}</h3>
          </div>
          <div className="setting-item">
            <label>{t('settings.filename')}</label>
            <select
              value={settings.filenameStyle}
              onChange={(event) => update('filenameStyle', event.target.value)}
            >
              <option value="basic">{t('settings.basic')}</option>
              <option value="pretty">{t('settings.pretty')}</option>
              <option value="classic">{t('settings.classic')}</option>
              <option value="nerdy">{t('settings.detailed')}</option>
            </select>
          </div>
          <div className="setting-item toggle">
            <label>{t('settings.metadata')}</label>
            <Toggle
              active={settings.disableMetadata}
              label={t('settings.metadata')}
              onClick={() =>
                update('disableMetadata', !settings.disableMetadata)
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

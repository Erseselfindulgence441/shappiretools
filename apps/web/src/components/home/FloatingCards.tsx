import { Play } from 'lucide-react'

export function FloatingCards() {
  return (
    <>
      <article className="floating-card video-card">
        <div className="video-preview">
          <Play size={15} fill="currentColor" />
        </div>
        <p>arquivo-de-viagem.mp4</p>
        <small>1080p · 24,8 MB</small>
      </article>
      <article className="floating-card audio-card">
        <div className="file-icon">♫</div>
        <p>Faixa pronta</p>
        <small>MP3 · alta qualidade</small>
      </article>
    </>
  )
}

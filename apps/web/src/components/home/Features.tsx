import { AudioLines, Image, Maximize2 } from 'lucide-react'

export function Features() {
  return (
    <section className="container features" id="recursos">
      <div className="section-heading">
        <span>Feito para fluir</span>
        <h2>
          Tudo o que importa,
          <br />
          em uma única pausa.
        </h2>
      </div>
      <div className="features-grid">
        <article className="glass-card feature-card formats">
          <div className="feature-top">
            <div className="feature-icon">
              <Maximize2 size={17} />
            </div>
            <span>Conversão inteligente</span>
          </div>
          <h3>Escolha o seu formato</h3>
          <p>Do vídeo em alta definição ao áudio leve para levar com você.</p>
          <div className="format-preview">
            <div className="preview-screen">
              <span>ORIGINAL</span>
              <b>01:42</b>
              <i>▶</i>
            </div>
            <div className="preview-copy">
              <span>Seu arquivo, preparado</span>
              <b>Pronto para escolher</b>
              <small>Qualidade preservada</small>
            </div>
          </div>
          <div className="format-studio">
            <div className="studio-file">
              <span>Link detectado</span>
              <b>midia-original</b>
              <i />
            </div>
            <div className="studio-arrow">→</div>
            <div className="format-list">
              <b>
                MP4 <small>vídeo</small>
              </b>
              <b>
                MP3 <small>áudio</small>
              </b>
              <b>
                JPG <small>imagem</small>
              </b>
              <b>
                GIF <small>loop</small>
              </b>
            </div>
          </div>
        </article>
        <article className="glass-card feature-card sound">
          <div className="feature-icon">
            <AudioLines size={17} />
          </div>
          <h3>Qualidade preservada</h3>
          <p>Arquivos nítidos, claros e exatamente como deveriam ser.</p>
          <div className="wave-panel">
            <div className="audio-bars">
              {[20, 58, 35, 85, 47, 70, 28, 53, 42, 76, 32, 61].map(
                (height, i) => (
                  <i key={i} style={{ height: `${height}%` }} />
                ),
              )}
            </div>
          </div>
        </article>
        <article className="glass-card feature-card clean">
          <div className="feature-icon">
            <Image size={17} />
          </div>
          <h3>Limpo por natureza</h3>
          <p>Sem telas confusas. Apenas o que você precisa, quando precisa.</p>
          <div className="image-stack">
            <i />
          </div>
        </article>
      </div>
    </section>
  )
}

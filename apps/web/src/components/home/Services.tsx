const questions = [
  [
    'Como faço o download?',
    'Cole o link no campo principal, escolha o modo desejado (auto, áudio ou sem áudio) e clique em Processar.',
  ],
  [
    'Quais plataformas funcionam?',
    'TikTok, Twitter/X, Instagram, Bluesky, Facebook, Pinterest, SoundCloud, Vimeo, Twitch, Dailymotion, Bilibili, Streamable, Snapchat, Tumblr, Rutube, Loom, VK, OK e Newgrounds.',
  ],
  [
    'Por que o YouTube não é suportado?',
    'O YouTube exige autenticação (login) para permitir o acesso a vídeos a partir de servidores. Isso requer cookies de conta, tokens de sessão e infraestrutura com IPs residenciais — custos altos que tornam o suporte inviável de manter de forma gratuita e confiável. Como alternativa, use o yt-dlp no seu computador.',
  ],
  [
    'Os arquivos mantêm a qualidade?',
    'Sim. A qualidade disponível no link é preservada. Você pode escolher a qualidade nas configurações.',
  ],
  [
    'Preciso criar uma conta?',
    'Não. A ferramenta funciona sem cadastro, sem login, sem rastreamento.',
  ],
  [
    'Os arquivos ficam salvos no servidor?',
    'Não. Nada é armazenado. O arquivo é processado em tempo real e enviado diretamente para você. Após 90 segundos, o link expira.',
  ],
] as const

export function Services() {
  return (
    <section className="container services faq" id="servicos">
      <div className="faq-intro">
        <div className="section-heading">
          <span>FAQ</span>
          <h2>
            Dúvidas,
            <br />
            resolvidas.
          </h2>
        </div>
        <div className="faq-visual" aria-hidden="true">
          <div className="visual-symbol">?</div>
          <div className="visual-lines">
            <i />
            <i />
            <i />
          </div>
          <span>Como podemos ajudar?</span>
        </div>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <details key={question}>
            <summary>
              <span>0{index + 1}</span>
              {question}
              <b>+</b>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

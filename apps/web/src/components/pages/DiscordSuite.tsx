import { Check, ChevronDown, ChevronUp, Code2, Copy, FileJson2, GripVertical, Image, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useI18n } from '../../i18n'
import personaOff from '../../assets/images/personaoff.png'

export type DiscordToolKind = 'components' | 'embed'

type ComponentKind = 'text' | 'button' | 'section' | 'separator' | 'media' | 'thumbnail'
type ComponentItem = {
  id: string
  kind: ComponentKind
  content: string
  label: string
  style: 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Link'
  url: string
}

type EmbedField = { id: string; name: string; value: string; inline: boolean }

const uid = () => crypto.randomUUID()

const componentLabels: Record<ComponentKind, string> = {
  text: 'Texto',
  button: 'Botão',
  section: 'Seção',
  separator: 'Separador',
  media: 'Galeria de mídia',
  thumbnail: 'Miniatura',
}

const emptyComponent = (kind: ComponentKind): ComponentItem => ({
  id: uid(),
  kind,
  content: kind === 'text' ? 'Escreva sua mensagem aqui.' : kind === 'section' ? 'Título da seção\nDescrição complementar.' : '',
  label: kind === 'button' ? 'Abrir ticket' : '',
  style: 'Primary',
  url: kind === 'media' || kind === 'thumbnail' ? 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=900&q=80' : '',
})

const componentTemplates: Record<string, ComponentItem[]> = {
  'Boas-vindas': [
    { ...emptyComponent('section'), content: 'Boas-vindas ao servidor!\nLeia as regras, escolha seus cargos e fique à vontade.' },
    { ...emptyComponent('separator') },
    { ...emptyComponent('button'), label: 'Ver regras', style: 'Secondary' },
  ],
  'Suporte': [
    { ...emptyComponent('text'), content: 'Precisa de ajuda? Abra um ticket e nossa equipe vai responder assim que possível.' },
    { ...emptyComponent('button'), label: 'Abrir ticket', style: 'Primary' },
  ],
  'Anúncio': [
    { ...emptyComponent('media') },
    { ...emptyComponent('section'), content: 'Atualização importante\nConfira as novidades preparadas para a comunidade.' },
    { ...emptyComponent('button'), label: 'Ler atualização', style: 'Link', url: 'https://discord.com' },
  ],
}

const copyText = async (value: string) => navigator.clipboard.writeText(value)

function CopyButton({ value, label = 'Copiar' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await copyText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return <button className="discord-copy-button" type="button" onClick={() => void copy()}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copiado' : label}</button>
}

function ComponentPreview({ item, selected, dragging, onSelect, onDragStart, onDragOver, onDrop, onDragEnd }: { item: ComponentItem; selected: boolean; dragging: boolean; onSelect: () => void; onDragStart: () => void; onDragOver: () => void; onDrop: () => void; onDragEnd: () => void }) {
  return <button className={`discord-canvas-item ${selected ? 'is-selected' : ''} ${dragging ? 'is-dragging' : ''} kind-${item.kind}`} type="button" draggable onClick={onSelect} onDragStart={onDragStart} onDragOver={(event) => { event.preventDefault(); onDragOver() }} onDrop={onDrop} onDragEnd={onDragEnd}>
    <GripVertical className="discord-drag-handle" size={13} />
    {item.kind === 'text' && <p>{item.content || 'Texto vazio'}</p>}
    {item.kind === 'section' && <p className="discord-section-text">{item.content || 'Seção vazia'}</p>}
    {item.kind === 'separator' && <span className="discord-preview-separator" />}
    {item.kind === 'button' && <span className={`discord-v2-button style-${item.style.toLowerCase()}`}>{item.label || 'Botão'}</span>}
    {item.kind === 'media' && <span className="discord-media-placeholder">{item.url ? <img src={item.url} alt="Preview da mídia" /> : <Image size={20} />}</span>}
    {item.kind === 'thumbnail' && <span className="discord-thumbnail-placeholder">{item.url ? <img src={item.url} alt="Preview da miniatura" /> : <Image size={18} />}</span>}
  </button>
}

function componentPayload(items: ComponentItem[]) {
  const child = items.map((item) => {
    if (item.kind === 'text') return { type: 10, content: item.content }
    if (item.kind === 'section') return { type: 9, components: [{ type: 10, content: item.content }] }
    if (item.kind === 'separator') return { type: 14, divider: true, spacing: 1 }
    if (item.kind === 'media') return { type: 12, items: item.url ? [{ media: { url: item.url } }] : [] }
    if (item.kind === 'thumbnail') return { type: 11, media: { url: item.url } }
    const styles = { Primary: 1, Secondary: 2, Success: 3, Danger: 4, Link: 5 }
    const button = { type: 2, style: styles[item.style], label: item.label, ...(item.style === 'Link' ? { url: item.url || 'https://discord.com' } : { custom_id: `shappire_${item.id.slice(0, 8)}` }) }
    return { type: 1, components: [button] }
  })

  return { flags: 32768, components: [{ type: 17, components: child }] }
}

export function ComponentsBuilder() {
  const { t } = useI18n()
  const [items, setItems] = useState<ComponentItem[]>(componentTemplates['Suporte'])
  const [selectedId, setSelectedId] = useState(items[0].id)
  const [tab, setTab] = useState<'json' | 'js'>('json')
  const [draggingId, setDraggingId] = useState('')
  const selected = items.find((item) => item.id === selectedId)
  const payload = useMemo(() => componentPayload(items), [items])
  const json = useMemo(() => JSON.stringify(payload, null, 2), [payload])
  const javascript = `await interaction.reply(${JSON.stringify(payload, null, 2)})`

  const updateSelected = (changes: Partial<ComponentItem>) => setItems((previous) => previous.map((item) => item.id === selectedId ? { ...item, ...changes } : item))
  const add = (kind: ComponentKind) => {
    const item = emptyComponent(kind)
    setItems((previous) => [...previous, item])
    setSelectedId(item.id)
  }
  const move = (direction: -1 | 1) => {
    const index = items.findIndex((item) => item.id === selectedId)
    const nextIndex = index + direction
    if (index < 0 || nextIndex < 0 || nextIndex >= items.length) return
    setItems((previous) => {
      const updated = [...previous]
      ;[updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]]
      return updated
    })
  }
  const remove = () => {
    const index = items.findIndex((item) => item.id === selectedId)
    const remaining = items.filter((item) => item.id !== selectedId)
    setItems(remaining)
    setSelectedId(remaining[Math.max(0, index - 1)]?.id ?? '')
  }
  const reorder = (sourceId: string, targetId: string) => {
    if (!sourceId || sourceId === targetId) return
    setItems((previous) => {
      const from = previous.findIndex((item) => item.id === sourceId)
      const to = previous.findIndex((item) => item.id === targetId)
      if (from < 0 || to < 0) return previous
      const next = [...previous]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  return <>
    <div className="discord-tool-intro">
      <div><span>COMPONENTS V2</span><h1>{t('discord.components.title')}</h1><p>{t('discord.components.lead')}</p></div>
      <div className="discord-template-row"><small>Templates</small>{Object.keys(componentTemplates).map((name) => <button type="button" key={name} onClick={() => { const next = componentTemplates[name].map((item) => ({ ...item, id: uid() })); setItems(next); setSelectedId(next[0].id) }}>{name}</button>)}</div>
    </div>
    <div className="discord-components-layout">
      <aside className="discord-component-library">
        <span className="discord-panel-kicker">Adicionar bloco</span>
        {(Object.keys(componentLabels) as ComponentKind[]).map((kind) => <button type="button" key={kind} onClick={() => add(kind)}><Plus size={14} />{componentLabels[kind]}</button>)}
        <p>Monte a mensagem visualmente. Selecione um bloco para editar suas propriedades.</p>
      </aside>

      <section className="discord-builder-canvas">
        <header><span>Preview da mensagem</span><small>Discord Components V2</small></header>
        <div className="discord-message-preview">
          <div className="discord-preview-channel"><span>#</span><strong>preview</strong><small>Visualização no Discord</small></div>
          <div className="discord-message-author"><span>SH</span><strong>Shappire Tools</strong><em>BOT</em><small>hoje às 14:20</small></div>
          <div className="discord-message-body">
            {items.length ? items.map((item) => <ComponentPreview key={item.id} item={item} selected={item.id === selectedId} dragging={item.id === draggingId} onSelect={() => setSelectedId(item.id)} onDragStart={() => { setDraggingId(item.id); setSelectedId(item.id) }} onDragOver={() => undefined} onDrop={() => { reorder(draggingId, item.id); setDraggingId('') }} onDragEnd={() => setDraggingId('')} />) : <button className="discord-empty-canvas" type="button" onClick={() => add('text')}>Adicione um bloco para começar</button>}
          </div>
        </div>
      </section>

      <aside className="discord-property-panel">
        <div className="discord-panel-heading"><span className="discord-panel-kicker">Propriedades</span>{selected && <strong>{componentLabels[selected.kind]}</strong>}</div>
        {selected ? <div className="discord-properties">
          {(selected.kind === 'text' || selected.kind === 'section') && <label>Conteúdo<textarea value={selected.content} onChange={(event) => updateSelected({ content: event.target.value })} placeholder="Digite seu texto" /></label>}
          {selected.kind === 'button' && <>
            <label>Rótulo<input value={selected.label} maxLength={80} onChange={(event) => updateSelected({ label: event.target.value })} /></label>
            <label>Estilo<select value={selected.style} onChange={(event) => updateSelected({ style: event.target.value as ComponentItem['style'] })}>{['Primary', 'Secondary', 'Success', 'Danger', 'Link'].map((style) => <option key={style}>{style}</option>)}</select></label>
            {selected.style === 'Link' && <label>URL<input value={selected.url} onChange={(event) => updateSelected({ url: event.target.value })} placeholder="https://" /></label>}
          </>}
          {(selected.kind === 'media' || selected.kind === 'thumbnail') && <label>URL da imagem<input value={selected.url} onChange={(event) => updateSelected({ url: event.target.value })} placeholder="https://imagem.com/foto.png" /></label>}
          {selected.kind === 'separator' && <p className="discord-property-note">Um divisor discreto entre os blocos da mensagem.</p>}
          <div className="discord-item-actions"><button type="button" aria-label="Mover para cima" onClick={() => move(-1)}><ChevronUp size={15} /></button><button type="button" aria-label="Mover para baixo" onClick={() => move(1)}><ChevronDown size={15} /></button><button type="button" aria-label="Remover bloco" onClick={remove}><Trash2 size={15} /></button></div>
        </div> : <p className="discord-property-note">Selecione um bloco no preview.</p>}
      </aside>
    </div>
    <section className="discord-export-panel">
      <header><div><span className="discord-panel-kicker">Exportar</span><strong>Pronto para seu bot</strong></div><div className="discord-code-tabs"><button className={tab === 'json' ? 'is-active' : ''} type="button" onClick={() => setTab('json')}><FileJson2 size={13} />JSON</button><button className={tab === 'js' ? 'is-active' : ''} type="button" onClick={() => setTab('js')}><Code2 size={13} />discord.js</button></div></header>
      <pre>{tab === 'json' ? json : javascript}</pre>
      <CopyButton value={tab === 'json' ? json : javascript} label={tab === 'json' ? 'Copiar JSON' : 'Copiar código'} />
    </section>
  </>
}

function cleanEmbed(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).filter(([, current]) => current !== '' && current !== undefined && (!Array.isArray(current) || current.length)))
}

export function EmbedBuilder() {
  const { t } = useI18n()
  const [title, setTitle] = useState('Atualização importante')
  const [description, setDescription] = useState('Escreva uma mensagem clara para sua comunidade. Use o preview para ajustar cada detalhe antes de copiar o payload.')
  const [color, setColor] = useState('#5865F2')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('Shappire Tools')
  const [authorIcon, setAuthorIcon] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [image, setImage] = useState('')
  const [footer, setFooter] = useState('Mensagem enviada por Shappire')
  const [footerIcon, setFooterIcon] = useState('')
  const [timestamp, setTimestamp] = useState(true)
  const [fields, setFields] = useState<EmbedField[]>([{ id: uid(), name: 'Novidades', value: 'Preview em tempo real, campos organizados e exportação pronta.', inline: false }])
  const [exportType, setExportType] = useState<'json' | 'js' | 'py'>('json')

  const embed = useMemo(() => cleanEmbed({
    title,
    url,
    description,
    color: Number.parseInt(color.slice(1), 16),
    author: author ? cleanEmbed({ name: author, icon_url: authorIcon }) : undefined,
    thumbnail: thumbnail ? { url: thumbnail } : undefined,
    image: image ? { url: image } : undefined,
    footer: footer ? cleanEmbed({ text: footer, icon_url: footerIcon }) : undefined,
    timestamp: timestamp ? new Date().toISOString() : undefined,
    fields: fields.filter((field) => field.name || field.value).map(({ id: _id, ...field }) => field),
  }), [title, url, description, color, author, authorIcon, thumbnail, image, footer, footerIcon, timestamp, fields])
  const json = JSON.stringify({ embeds: [embed] }, null, 2)
  const js = `const embed = ${JSON.stringify(embed, null, 2)}\n\nawait channel.send({ embeds: [embed] })`
  const py = `embed = discord.Embed.from_dict(${JSON.stringify(embed, null, 2)})\nawait channel.send(embed=embed)`
  const currentCode = exportType === 'json' ? json : exportType === 'js' ? js : py
  const setTemplate = (template: 'announcement' | 'rules' | 'ticket' | 'update') => {
    if (template === 'announcement') { setTitle('Anúncio'); setDescription('Temos uma novidade para compartilhar com toda a comunidade.'); setColor('#5865F2'); setFooter('Anúncio oficial') }
    if (template === 'rules') { setTitle('Regras do servidor'); setDescription('Mantenha um ambiente respeitoso, siga as orientações da equipe e aproveite a comunidade.'); setColor('#F0B232'); setFooter('Leia antes de participar') }
    if (template === 'ticket') { setTitle('Suporte'); setDescription('Explique o que aconteceu. Nossa equipe vai analisar seu caso assim que possível.'); setColor('#57F287'); setFooter('Central de suporte') }
    if (template === 'update') { setTitle('Notas da atualização'); setDescription('Confira tudo o que mudou nesta versão.'); setColor('#EB459E'); setFooter('Shappire Tools') }
  }
  const editField = (id: string, changes: Partial<EmbedField>) => setFields((previous) => previous.map((field) => field.id === id ? { ...field, ...changes } : field))

  return <>
    <div className="discord-tool-intro embed-intro"><div><span>DISCORD EMBEDS</span><h1>{t('discord.embed.title')}</h1><p>{t('discord.embed.lead')}</p></div><div className="discord-template-row"><small>Modelos</small>{[['announcement', 'Anúncio'], ['rules', 'Regras'], ['ticket', 'Suporte'], ['update', 'Atualização']].map(([key, label]) => <button key={key} type="button" onClick={() => setTemplate(key as 'announcement' | 'rules' | 'ticket' | 'update')}>{label}</button>)}</div></div>
    <div className="discord-embed-layout">
      <section className="discord-embed-editor">
        <header><span className="discord-panel-kicker">Conteúdo</span><button type="button" className="discord-reset" onClick={() => setTemplate('announcement')}><RotateCcw size={13} />Redefinir</button></header>
        <div className="discord-editor-fields">
          <label>Título<input value={title} maxLength={256} onChange={(event) => setTitle(event.target.value)} /></label>
          <label>URL do título<input value={url} placeholder="https://" onChange={(event) => setUrl(event.target.value)} /></label>
          <label className="is-wide">Descrição<textarea value={description} maxLength={4096} onChange={(event) => setDescription(event.target.value)} /></label>
          <label>Cor<span className="discord-color-input"><input type="color" value={color} onChange={(event) => setColor(event.target.value)} /><input value={color.toUpperCase()} onChange={(event) => /^#[0-9a-f]{6}$/i.test(event.target.value) && setColor(event.target.value)} /></span></label>
          <label>Autor<input value={author} onChange={(event) => setAuthor(event.target.value)} /></label>
          <label>Ícone do autor<input value={authorIcon} placeholder="https://" onChange={(event) => setAuthorIcon(event.target.value)} /></label>
          <label>Miniatura<input value={thumbnail} placeholder="https://" onChange={(event) => setThumbnail(event.target.value)} /></label>
          <label>Imagem principal<input value={image} placeholder="https://" onChange={(event) => setImage(event.target.value)} /></label>
          <label>Rodapé<input value={footer} onChange={(event) => setFooter(event.target.value)} /></label>
          <label>Ícone do rodapé<input value={footerIcon} placeholder="https://" onChange={(event) => setFooterIcon(event.target.value)} /></label>
        </div>
        <label className="discord-toggle"><input type="checkbox" checked={timestamp} onChange={(event) => setTimestamp(event.target.checked)} /><span />Incluir data e hora</label>
        <section className="discord-fields-editor"><header><div><span className="discord-panel-kicker">Campos</span><small>Organize informações lado a lado quando necessário.</small></div><button type="button" onClick={() => setFields((previous) => [...previous, { id: uid(), name: 'Novo campo', value: 'Valor', inline: false }])}><Plus size={14} />Campo</button></header>{fields.map((field) => <div className="discord-field-row" key={field.id}><input aria-label="Nome do campo" value={field.name} onChange={(event) => editField(field.id, { name: event.target.value })} placeholder="Nome" /><input aria-label="Valor do campo" value={field.value} onChange={(event) => editField(field.id, { value: event.target.value })} placeholder="Valor" /><label className="discord-inline-toggle"><input type="checkbox" checked={field.inline} onChange={(event) => editField(field.id, { inline: event.target.checked })} />Em linha</label><button type="button" aria-label="Remover campo" onClick={() => setFields((previous) => previous.filter((entry) => entry.id !== field.id))}><Trash2 size={14} /></button></div>)}</section>
      </section>

      <section className="discord-embed-preview-wrap"><header><span className="discord-panel-kicker">Preview</span><small>Como sua comunidade verá</small></header><div className="discord-embed-preview"><div className="discord-preview-channel"><span>#</span><strong>preview</strong><small>Canal de texto</small></div><div className="discord-embed-message"><span className="discord-embed-avatar">SH</span><div className="discord-embed-message-body"><div className="discord-native-author"><strong>Shappire Tools</strong><em>BOT</em><small>hoje às 14:20</small></div><div className="discord-embed-card" style={{ borderLeftColor: color }}>
        {author && <div className="discord-embed-author">{authorIcon && <img src={authorIcon} alt="" />}<strong>{author}</strong></div>}
        <div className="discord-embed-content">{thumbnail && <img className="discord-embed-thumb" src={thumbnail} alt="" />}{title && (url ? <a href={url} target="_blank" rel="noreferrer">{title}</a> : <h2>{title}</h2>)}{description && <p>{description}</p>}<div className="discord-embed-fields">{fields.map((field) => (field.name || field.value) && <div className={field.inline ? 'is-inline' : ''} key={field.id}><strong>{field.name || 'Campo'}</strong><span>{field.value || 'Valor'}</span></div>)}</div></div>
        {image && <img className="discord-embed-image" src={image} alt="" />}
        {(footer || timestamp) && <div className="discord-embed-footer">{footerIcon && <img src={footerIcon} alt="" />}<span>{footer}{footer && timestamp ? ' • ' : ''}{timestamp ? 'Hoje às 14:20' : ''}</span></div>}
      </div></div></div></div></section>
    </div>
    <section className="discord-export-panel"><header><div><span className="discord-panel-kicker">Exportar</span><strong>Payload pronto para enviar</strong></div><div className="discord-code-tabs"><button className={exportType === 'json' ? 'is-active' : ''} type="button" onClick={() => setExportType('json')}><FileJson2 size={13} />JSON</button><button className={exportType === 'js' ? 'is-active' : ''} type="button" onClick={() => setExportType('js')}><Code2 size={13} />discord.js</button><button className={exportType === 'py' ? 'is-active' : ''} type="button" onClick={() => setExportType('py')}><Code2 size={13} />Python</button></div></header><pre>{currentCode}</pre><CopyButton value={currentCode} label={exportType === 'json' ? 'Copiar JSON' : 'Copiar código'} /></section>
  </>
}

export function DiscordSuite({ kind }: { kind: DiscordToolKind }) {
  const { t } = useI18n()
  const title = t(`discord.${kind}.title`)
  return <section className="container tool-section discord-coming-soon">
    <div className="tool-heading"><span>DISCORD TOOLS</span><h1>{title}</h1></div>
    <div className="coming-soon-content">
      <img className="coming-soon-persona" src={personaOff} alt="" aria-hidden="true" />
      <h2>{t('coming.title')}</h2>
      <p>{t('coming.description').replace('{tool}', title)}</p>
      <span className="coming-soon-badge">{t('coming.badge')}</span>
    </div>
  </section>
}

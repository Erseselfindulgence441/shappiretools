import { Download, ImageUp } from 'lucide-react'
import { useRef, useState } from 'react'
import { useI18n } from '../../i18n'

export function FaviconGenerator() {
  const { t } = useI18n(); const input=useRef<HTMLInputElement>(null); const [image,setImage]=useState('')
  function load(file?:File){if(!file?.type.startsWith('image/'))return;const url=URL.createObjectURL(file);setImage(url)}
  function exportIcon(size:number){const source=new Image();source.onload=()=>{const canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;const ctx=canvas.getContext('2d');if(!ctx)return;ctx.drawImage(source,0,0,size,size);const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=`favicon-${size}x${size}.png`;a.click()};source.src=image}
  return <section className="container favicon-section"><div className="favicon-heading"><span>{t('favicon.kicker')}</span><h1>{t('favicon.title')}</h1><p>{t('favicon.lead')}</p></div>{!image?<button className="favicon-upload" type="button" onClick={()=>input.current?.click()}><ImageUp size={26}/><strong>{t('favicon.upload')}</strong><small>{t('favicon.hint')}</small></button>:<div className="favicon-workspace"><div className="favicon-preview"><span>16 × 16</span><img src={image}/><span>32 × 32</span><img src={image}/><span>64 × 64</span><img src={image}/></div><div className="favicon-actions">{[16,32,48,64,180,512].map(size=><button type="button" key={size} onClick={()=>exportIcon(size)}><span>{size} × {size}</span><Download size={14}/></button>)}</div></div>}<input ref={input} hidden type="file" accept="image/*" onChange={e=>load(e.target.files?.[0])}/></section>
}

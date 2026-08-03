import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../../i18n'

type Rgb = { r: number; g: number; b: number }
const clamp = (value: number, max = 255) => Math.max(0, Math.min(max, Math.round(value)))
const hex = (value: number) => value.toString(16).padStart(2, '0').toUpperCase()
function fromHex(value: string): Rgb | null { const clean = value.replace('#', ''); if (!/^[0-9a-f]{6}$/i.test(clean)) return null; return { r: parseInt(clean.slice(0, 2), 16), g: parseInt(clean.slice(2, 4), 16), b: parseInt(clean.slice(4, 6), 16) } }
function toHsl({ r, g, b }: Rgb) { const R=r/255,G=g/255,B=b/255,max=Math.max(R,G,B),min=Math.min(R,G,B),d=max-min,l=(max+min)/2; let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=max===R?60*(((G-B)/d)%6):max===G?60*((B-R)/d+2):60*((R-G)/d+4)} return `${Math.round((h+360)%360)}°, ${Math.round(s*100)}%, ${Math.round(l*100)}%` }
function toCmyk({ r, g, b }: Rgb) { const R=r/255,G=g/255,B=b/255,k=1-Math.max(R,G,B); if(k===1)return '0%, 0%, 0%, 100%'; return `${Math.round((1-R-k)/(1-k)*100)}%, ${Math.round((1-G-k)/(1-k)*100)}%, ${Math.round((1-B-k)/(1-k)*100)}%, ${Math.round(k*100)}%` }

export function ColorConverter() {
  const { t } = useI18n(); const [rgb,setRgb]=useState<Rgb>({r:114,g:191,b:255}); const [copied,setCopied]=useState('')
  const values={HEX:`#${hex(rgb.r)}${hex(rgb.g)}${hex(rgb.b)}`,RGB:`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,HSL:`hsl(${toHsl(rgb)})`,CMYK:`cmyk(${toCmyk(rgb)})`}
  async function copy(key:string){await navigator.clipboard.writeText(values[key as keyof typeof values]);setCopied(key);window.setTimeout(()=>setCopied(''),900)}
  return <section className="container color-converter-section"><div className="color-converter-heading"><span>{t('color.kicker')}</span><h1>{t('color.title')}</h1><p>{t('color.lead')}</p></div><div className="color-converter-board"><div className="color-main"><input type="color" value={values.HEX} onChange={(e)=>setRgb(fromHex(e.target.value) || rgb)} /><div><span>{t('color.hex')}</span><input value={values.HEX} onChange={(e)=>{const next=fromHex(e.target.value);if(next)setRgb(next)}} /></div></div><div className="color-rgb">{(['r','g','b'] as Array<keyof Rgb>).map((key)=><label key={key}>{key.toUpperCase()}<input type="range" min="0" max="255" value={rgb[key]} onChange={(e)=>setRgb({...rgb,[key]:clamp(Number(e.target.value))})}/><b>{rgb[key]}</b></label>)}</div><div className="color-values">{Object.entries(values).map(([key,value])=><button type="button" key={key} onClick={()=>void copy(key)}><span>{key}</span><strong>{value}</strong>{copied===key?<Check size={15}/>:<Copy size={14}/>}</button>)}</div></div></section>
}

import { useState } from 'react'
import { Check, Copy, ShieldCheck } from 'lucide-react'

type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-512'

async function computeHash(algorithm: Algorithm, text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// MD5 puro (não disponível em SubtleCrypto)
function md5(input: string): string {
  function safeAdd(x: number, y: number) { const lsw = (x & 0xffff) + (y & 0xffff); return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff) }
  function bitRotateLeft(num: number, cnt: number) { return (num << cnt) | (num >>> (32 - cnt)) }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b) }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn((b & c) | (~b & d), a, b, x, s, t) }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn((b & d) | (c & ~d), a, b, x, s, t) }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn(b ^ c ^ d, a, b, x, s, t) }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn(c ^ (b | ~d), a, b, x, s, t) }

  const bytes: number[] = []
  for (let i = 0; i < input.length; i++) { const code = input.charCodeAt(i); if (code < 128) bytes.push(code); else if (code < 2048) { bytes.push(192 | (code >> 6)); bytes.push(128 | (code & 63)) } else { bytes.push(224 | (code >> 12)); bytes.push(128 | ((code >> 6) & 63)); bytes.push(128 | (code & 63)) } }
  const length = bytes.length * 8
  bytes.push(0x80)
  while (bytes.length % 64 !== 56) bytes.push(0)
  bytes.push(length & 0xff, (length >> 8) & 0xff, (length >> 16) & 0xff, (length >> 24) & 0xff, 0, 0, 0, 0)

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878
  for (let i = 0; i < bytes.length; i += 64) {
    const w: number[] = []
    for (let j = 0; j < 64; j += 4) w.push(bytes[i + j] | (bytes[i + j + 1] << 8) | (bytes[i + j + 2] << 16) | (bytes[i + j + 3] << 24))
    let aa = a, bb = b, cc = c, dd = d
    a=md5ff(a,b,c,d,w[0],7,-680876936);d=md5ff(d,a,b,c,w[1],12,-389564586);c=md5ff(c,d,a,b,w[2],17,606105819);b=md5ff(b,c,d,a,w[3],22,-1044525330);a=md5ff(a,b,c,d,w[4],7,-176418897);d=md5ff(d,a,b,c,w[5],12,1200080426);c=md5ff(c,d,a,b,w[6],17,-1473231341);b=md5ff(b,c,d,a,w[7],22,-45705983);a=md5ff(a,b,c,d,w[8],7,1770035416);d=md5ff(d,a,b,c,w[9],12,-1958414417);c=md5ff(c,d,a,b,w[10],17,-42063);b=md5ff(b,c,d,a,w[11],22,-1990404162);a=md5ff(a,b,c,d,w[12],7,1804603682);d=md5ff(d,a,b,c,w[13],12,-40341101);c=md5ff(c,d,a,b,w[14],17,-1502002290);b=md5ff(b,c,d,a,w[15],22,1236535329)
    a=md5gg(a,b,c,d,w[1],5,-165796510);d=md5gg(d,a,b,c,w[6],9,-1069501632);c=md5gg(c,d,a,b,w[11],14,643717713);b=md5gg(b,c,d,a,w[0],20,-373897302);a=md5gg(a,b,c,d,w[5],5,-701558691);d=md5gg(d,a,b,c,w[10],9,38016083);c=md5gg(c,d,a,b,w[15],14,-660478335);b=md5gg(b,c,d,a,w[4],20,-405537848);a=md5gg(a,b,c,d,w[9],5,568446438);d=md5gg(d,a,b,c,w[14],9,-1019803690);c=md5gg(c,d,a,b,w[3],14,-187363961);b=md5gg(b,c,d,a,w[8],20,1163531501);a=md5gg(a,b,c,d,w[13],5,-1444681467);d=md5gg(d,a,b,c,w[2],9,-51403784);c=md5gg(c,d,a,b,w[7],14,1735328473);b=md5gg(b,c,d,a,w[12],20,-1926607734)
    a=md5hh(a,b,c,d,w[5],4,-378558);d=md5hh(d,a,b,c,w[8],11,-2022574463);c=md5hh(c,d,a,b,w[11],16,1839030562);b=md5hh(b,c,d,a,w[14],23,-35309556);a=md5hh(a,b,c,d,w[1],4,-1530992060);d=md5hh(d,a,b,c,w[4],11,1272893353);c=md5hh(c,d,a,b,w[7],16,-155497632);b=md5hh(b,c,d,a,w[10],23,-1094730640);a=md5hh(a,b,c,d,w[13],4,681279174);d=md5hh(d,a,b,c,w[0],11,-358537222);c=md5hh(c,d,a,b,w[3],16,-722521979);b=md5hh(b,c,d,a,w[6],23,76029189);a=md5hh(a,b,c,d,w[9],4,-640364487);d=md5hh(d,a,b,c,w[12],11,-421815835);c=md5hh(c,d,a,b,w[15],16,530742520);b=md5hh(b,c,d,a,w[2],23,-995338651)
    a=md5ii(a,b,c,d,w[0],6,-198630844);d=md5ii(d,a,b,c,w[7],10,1126891415);c=md5ii(c,d,a,b,w[14],15,-1416354905);b=md5ii(b,c,d,a,w[5],21,-57434055);a=md5ii(a,b,c,d,w[12],6,1700485571);d=md5ii(d,a,b,c,w[3],10,-1894986606);c=md5ii(c,d,a,b,w[10],15,-1051523);b=md5ii(b,c,d,a,w[1],21,-2054922799);a=md5ii(a,b,c,d,w[8],6,1873313359);d=md5ii(d,a,b,c,w[15],10,-30611744);c=md5ii(c,d,a,b,w[6],15,-1560198380);b=md5ii(b,c,d,a,w[13],21,1309151649);a=md5ii(a,b,c,d,w[4],6,-145523070);d=md5ii(d,a,b,c,w[11],10,-1120210379);c=md5ii(c,d,a,b,w[2],15,718787259);b=md5ii(b,c,d,a,w[9],21,-343485551)
    a = safeAdd(a, aa); b = safeAdd(b, bb); c = safeAdd(c, cc); d = safeAdd(d, dd)
  }
  return [a, b, c, d].map(n => Array.from({ length: 4 }, (_, i) => ((n >> (i * 8)) & 0xff).toString(16).padStart(2, '0')).join('')).join('')
}

export function HashGenerator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState('')

  async function generate() {
    if (!input) return
    const [sha1, sha256, sha512] = await Promise.all([
      computeHash('SHA-1', input),
      computeHash('SHA-256', input),
      computeHash('SHA-512', input),
    ])
    setResults({ MD5: md5(input), 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-512': sha512 })
  }

  function copy(key: string, value: string) {
    navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <section className="container tool-section">
      <div className="tool-heading">
        <span>FERRAMENTAS</span>
        <h1>Hash Generator</h1>
        <p>Gere hashes MD5, SHA-1, SHA-256 e SHA-512.</p>
      </div>

      <div className="tool-single-panel">
        <label>Texto</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Digite o texto para gerar os hashes..." />
      </div>

      <button className="tool-action-button" type="button" onClick={generate}>
        <ShieldCheck size={15} /> Gerar hashes
      </button>

      {Object.keys(results).length > 0 && (
        <div className="tool-hash-results">
          {Object.entries(results).map(([algo, hash]) => (
            <div key={algo} className="tool-hash-row">
              <label>{algo}</label>
              <code>{hash}</code>
              <button type="button" onClick={() => copy(algo, hash)}>
                {copied === algo ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

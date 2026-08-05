import { nanoid } from 'nanoid'
import { env } from '../../config/index.js'
import { completeDonation, createDonation, getDonation, listAcknowledgements } from './store.js'

const GOAT_API_URL = 'https://api.goatpay.com.br/v1'

function cleanName(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 40)
}

function cleanAvatarUrl(value) {
  const raw = String(value || '').trim()
  if (!raw) return null
  if (raw.length > 2048) return null
  try {
    const url = new URL(raw)
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null
  } catch {
    return null
  }
}

function publicRecord(record) {
  return {
    id: record.id,
    amount: record.amount,
    status: record.status,
    expiresAt: record.expiresAt,
    public: record.public,
  }
}

async function goatRequest(path, options = {}) {
  if (!env.goatPayKey) throw new Error('GOAT_PAY_NOT_CONFIGURED')

  const response = await fetch(`${GOAT_API_URL}${path}`, {
    ...options,
    headers: {
      'X-API-Key': env.goatPayKey,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const body = await response.json().catch(() => null)
  if (!response.ok || !body?.success) throw new Error(body?.message || 'GOAT_PAY_REQUEST_FAILED')
  return body.data
}

export async function createDonationPix(req, res) {
  const amount = Number(req.body?.amount)
  const publicAcknowledgement = Boolean(req.body?.publicAcknowledgement)
  const name = cleanName(req.body?.name)
  const rawAvatar = String(req.body?.avatarUrl || '').trim()
  const avatarUrl = cleanAvatarUrl(rawAvatar)

  if (!Number.isFinite(amount) || amount < 1 || amount > 10000) {
    return res.status(400).json({ error: 'Escolha um valor entre R$ 1,00 e R$ 10.000,00.' })
  }
  if (publicAcknowledgement && !name) {
    return res.status(400).json({ error: 'Informe um nick para aparecer nos agradecimentos.' })
  }
  if (rawAvatar && !avatarUrl) {
    return res.status(400).json({ error: 'Use um link de imagem válido.' })
  }
  if (!env.goatPayKey) {
    return res.status(503).json({ error: 'Doações PIX estão temporariamente indisponíveis.' })
  }

  const id = nanoid(18)
  try {
    const payment = await goatRequest('/payment-pix/create', {
      method: 'POST',
      body: JSON.stringify({
        amount: Math.round(amount * 100) / 100,
        description: 'Doação para Shappire Tools',
        externalReference: `shappire-donation-${id}`,
        coverFee: false,
        expirationSeconds: 1800,
      }),
    })

    const record = {
      id,
      paymentId: payment.id,
      amount: Number(payment.amount || amount),
      status: payment.status || 'PENDING',
      public: publicAcknowledgement,
      name: publicAcknowledgement ? name : null,
      avatarUrl: publicAcknowledgement ? avatarUrl : null,
      expiresAt: payment.expiresAt || null,
      createdAt: new Date().toISOString(),
    }
    await createDonation(record)

    return res.status(201).json({
      donation: publicRecord(record),
      pix: {
        copyPaste: payment.copyPaste,
        qrCodeImage: payment.qrCodeImage || payment.qrCodeBase64 || payment.qrcodeUrl || null,
      },
    })
  } catch (error) {
    console.error('[donations] GoatPay create failed:', error.message)
    return res.status(502).json({ error: 'Não foi possível criar o PIX agora. Tente novamente.' })
  }
}

export async function getDonationStatus(req, res) {
  const donation = getDonation(req.params.id)
  if (!donation) return res.status(404).json({ error: 'Doação não encontrada.' })

  if (donation.status === 'COMPLETED') return res.json({ donation: publicRecord(donation) })

  try {
    const payment = await goatRequest(`/payment-pix/get/${encodeURIComponent(donation.paymentId)}`)
    if (payment.status === 'COMPLETED') await completeDonation(donation.id)

    return res.json({
      donation: publicRecord({
        ...donation,
        status: payment.status || donation.status,
      }),
    })
  } catch (error) {
    console.error('[donations] GoatPay status failed:', error.message)
    return res.status(502).json({ error: 'Não foi possível confirmar o pagamento agora.' })
  }
}

export function getAcknowledgements(_req, res) {
  return res.json({ acknowledgements: listAcknowledgements() })
}

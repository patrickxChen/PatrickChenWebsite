const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 60_000)
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5)

const inMemoryRateLimit = new Map()

function getClientKey(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim()
  }

  if (Array.isArray(forwardedFor) && forwardedFor[0]) {
    return forwardedFor[0]
  }

  return 'unknown'
}

function isRateLimited(key) {
  const now = Date.now()
  const current = inMemoryRateLimit.get(key)

  if (!current || now - current.start > RATE_LIMIT_WINDOW_MS) {
    inMemoryRateLimit.set(key, { start: now, count: 1 })
    return false
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true
  }

  current.count += 1
  inMemoryRateLimit.set(key, current)
  return false
}

function validatePayload(payload) {
  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  const message = typeof payload.message === 'string' ? payload.message.trim() : ''

  if (!name || name.length > 100) {
    return { ok: false, message: 'Invalid name.' }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return { ok: false, message: 'Invalid email.' }
  }

  if (!message || message.length > 2000) {
    return { ok: false, message: 'Invalid message.' }
  }

  return {
    ok: true,
    values: { name, email, message },
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed.' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}

  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    res.status(400).json({ ok: false, message: 'Submission rejected.' })
    return
  }

  const clientKey = getClientKey(req)
  if (isRateLimited(clientKey)) {
    res.status(429).json({ ok: false, message: 'Too many requests. Please try again shortly.' })
    return
  }

  const validated = validatePayload(body)
  if (!validated.ok) {
    res.status(400).json({ ok: false, message: validated.message })
    return
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    res.status(500).json({ ok: false, message: 'Server is missing Supabase credentials.' })
    return
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      name: validated.values.name,
      email: validated.values.email,
      message: validated.values.message,
      source: 'portfolio-web',
      status: 'new',
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    res.status(500).json({ ok: false, message: `Submission failed. ${errorText}` })
    return
  }

  res.status(200).json({ ok: true, message: 'Message sent successfully. Thanks for reaching out!' })
}

import type { ContactSubmissionPayload, ContactSubmissionResult } from '../types/contact'

export async function submitContactForm(
  payload: ContactSubmissionPayload,
): Promise<ContactSubmissionResult> {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => {
    controller.abort()
  }, 15000)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    let data: Partial<ContactSubmissionResult> = {}
    try {
      data = (await response.json()) as Partial<ContactSubmissionResult>
    } catch {
      data = {}
    }

    if (!response.ok) {
      return {
        ok: false,
        message: data.message ?? 'Something went wrong while sending your message.',
      }
    }

    return {
      ok: true,
      message: data.message ?? 'Message sent successfully.',
    }
  } catch {
    return {
      ok: false,
      message: 'Request timed out or failed. Please try again, or email me directly at patrickccc47@gmail.com.',
    }
  } finally {
    window.clearTimeout(timeoutId)
  }
}

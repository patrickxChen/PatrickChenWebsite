import type { ContactSubmissionPayload, ContactSubmissionResult } from '../types/contact'

export async function submitContactForm(
  payload: ContactSubmissionPayload,
): Promise<ContactSubmissionResult> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as Partial<ContactSubmissionResult>

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
}

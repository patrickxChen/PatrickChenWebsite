export type ContactFormValues = {
  name: string
  email: string
  message: string
  website: string
}

export type ContactSubmissionPayload = Omit<ContactFormValues, 'website'>

export type ContactSubmissionResult = {
  ok: boolean
  message: string
}

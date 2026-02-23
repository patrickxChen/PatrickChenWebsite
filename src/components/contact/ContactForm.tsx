import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { submitContactForm } from '../../services/contactService'
import type { ContactFormValues } from '../../types/contact'
import { ContactStatus } from './ContactStatus'

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
  website: '',
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

function validate(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {}
  const trimmedName = values.name.trim()
  const trimmedEmail = values.email.trim()
  const trimmedMessage = values.message.trim()

  if (!trimmedName) {
    errors.name = 'Name is required.'
  }

  if (!trimmedEmail) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!trimmedMessage) {
    errors.message = 'Message is required.'
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message must be 2000 characters or less.'
  }

  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ variant: 'success' | 'error'; message: string } | null>(null)

  const messageLength = useMemo(() => values.message.length, [values.message])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setStatus(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    const result = await submitContactForm({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    })

    if (result.ok) {
      setStatus({ variant: 'success', message: result.message })
      setValues(initialValues)
      setErrors({})
    } else {
      setStatus({ variant: 'error', message: result.message })
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="futuristic-panel space-y-4 rounded-xl border border-white/10 p-6 md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-text/90">Name</span>
          <input
            type="text"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            className="contact-input"
            maxLength={100}
            autoComplete="name"
          />
          {errors.name ? <span className="text-xs text-red-200">{errors.name}</span> : null}
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-text/90">Email</span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            className="contact-input"
            maxLength={120}
            autoComplete="email"
          />
          {errors.email ? <span className="text-xs text-red-200">{errors.email}</span> : null}
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="font-medium text-text/90">Message</span>
        <textarea
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
          className="contact-input min-h-[150px] resize-y"
          maxLength={2000}
        />
        <div className="flex items-center justify-between">
          {errors.message ? <span className="text-xs text-red-200">{errors.message}</span> : <span />}
          <span className="text-xs text-text/55">{messageLength}/2000</span>
        </div>
      </label>

      <label className="hidden" aria-hidden="true">
        Website
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((prev) => ({ ...prev, website: event.target.value }))}
          name="website"
        />
      </label>

      {status ? <ContactStatus variant={status.variant} message={status.message} /> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center rounded-md border border-accent/45 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-bg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

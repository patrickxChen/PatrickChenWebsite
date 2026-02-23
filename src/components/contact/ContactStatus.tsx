type ContactStatusProps = {
  variant: 'success' | 'error'
  message: string
}

export function ContactStatus({ variant, message }: ContactStatusProps) {
  return (
    <p
      role="status"
      className={`rounded-md border px-3 py-2 text-sm ${
        variant === 'success'
          ? 'border-accent/45 bg-accent/10 text-accent'
          : 'border-red-400/45 bg-red-500/10 text-red-200'
      }`}
    >
      {message}
    </p>
  )
}

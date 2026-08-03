type ToggleProps = {
  active: boolean
  label: string
  onClick: () => void
}

export function Toggle({ active, label, onClick }: ToggleProps) {
  return (
    <button
      className={`toggle-btn ${active ? 'on' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="toggle-knob" />
    </button>
  )
}

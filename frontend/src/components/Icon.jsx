export default function Icon({ name, className = '', ...rest }) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      aria-hidden="true"
      {...rest}
    >
      {name}
    </span>
  )
}

import { useEffect, useRef, useState } from 'react'

function SelectCustom({ id, name, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const selected = options.find((option) => option.value === value) ?? options[0]

  function handleSelect(optionValue) {
    onChange(optionValue)
    setOpen(false)
  }

  return (
    <div className="select-custom" ref={wrapperRef}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="select-custom__trigger"
        onClick={(event) => {
          event.stopPropagation()
          setOpen((isOpen) => !isOpen)
        }}
      >
        {selected.label}
      </button>

      <ul
        className={
          open
            ? 'select-custom__options select-custom__options--open'
            : 'select-custom__options'
        }
      >
        {options.map((option) => (
          <li
            key={option.value}
            data-value={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectCustom

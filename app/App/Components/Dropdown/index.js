import React, { useState, useEffect } from 'react'
import uuid from 'uuid'

const findIndex = (options, value) => {
  const index = options.findIndex((option) => option.value === value)
  return index >= 0 ? index : null
}

const Dropdown = ({ options, syncValue, initialValue, style, className, onChange }) => {
  // Get index for passed value(s)
  const syncIndex = findIndex(options, syncValue)
  const initialIndex = findIndex(options, initialValue)

  // Hooks
  const [index, setIndex] = useState(syncIndex || initialIndex || 0)
  const [expanded, setExpanded] = useState(false)
  const [id] = useState(uuid())

  // On mount -> register listener for document clicks
  useEffect(() => {
    document.addEventListener('click', (e) => {
      // If class list of clicked element doesn't include component id -> contract dropdown
      const classList = [...e.target.classList]
      if (!classList.includes(id)) { setExpanded(false) }
    })
  }, [])

  // Handle new sync value
  if (syncIndex !== index) {
    setIndex(syncIndex)
  }

  // Handle item selected
  const handleSelect = (newIndex) => {
    // Trigger only on new item selected
    if (newIndex !== index) {
      // Return new value
      onChange(options[newIndex].value)
      // Update state
      setIndex(newIndex)
    }
  }

  // Style calculations
  const height = (options.length * 26) + 'px'
  const marginTop = (-26 * index) + 'px'

  className = className || ''

  // JSX
  return (
    <div className={`dropdownWrap ${id}`}>
      <div
        className={expanded ? `dropdown dropdownExpanded ${className} ${id}` : `dropdown ${className} ${id}`}
        style={expanded ? { ...style, height } : { ...style }}
        onMouseDown={(e) => { setExpanded(!expanded) }}
      >
        <div className={`dropdownItems ${id}`} style={expanded ? {} : { marginTop }}>
          { options.map((option, index) => {
            return <div key={option.text + index} className={`dropdownItem ${id}`} onMouseDown={() => handleSelect(index)}>{ option.text }</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Dropdown

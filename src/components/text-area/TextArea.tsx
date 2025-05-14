import React from 'react'
import HighlightWithinTextarea from 'react-highlight-within-textarea'
import './TextArea.scss'

interface HighlightedTextareaProps {
  value: string
  onChange: (value: string) => void
}

const highlightPatterns = [
  { highlight: /\b(AND|OR|NOT)\b/gi, className: 'highlight-logic' },
  { highlight: /\b([A-Z]{2,})/g, className: 'highlight-key' },
  { highlight: /["“”'‘’](?:[^"“”'‘’\\]|\\.)*["“”'‘’]/g, className: 'highlight-value' },
]

export const HighlightedTextarea: React.FC<HighlightedTextareaProps> = ({ value, onChange }) => {
  return (
    <div className="highlighted-textarea-wrapper" style={{ position: 'relative' }}>
      {value === '' && (
        <div
        className='placeholder-custom'
          style={{
            position: 'absolute',
          }}
        >
          Enter logical search expression
        </div>
      )}
      <HighlightWithinTextarea
        value={value}
        highlight={highlightPatterns}
        onChange={onChange}
        placeholder=""
      />
    </div>
  )
}

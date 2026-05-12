import { useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export function InputArea({ activeMode }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const getPlaceholder = () => {
    switch (activeMode) {
      case 'Q&A': return 'Ask about network specifications, protocols, or documentation...';
      case 'Root Cause Analysis': return 'Describe the outage or symptoms for RCA...';
      case 'Anomaly Detection': return 'Enter log snippet or KPI data to detect anomalies...';
      default: return 'Type your message...';
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      // Clamp to max 5 lines (~120px at 24px line height)
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Submission handler would go here
    }
  };

  return (
    <div className="px-4 pb-4 pt-3 bg-page">
      {/* Textarea wrapper */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          rows={1}
          className="
            w-full
            bg-surface-alt
            border border-surface
            text-text-primary
            rounded-2xl
            pl-4 pr-14 py-3.5
            focus:outline-none focus:border-accent
            placeholder:text-text-muted
            transition-colors duration-150
            text-[15px] leading-relaxed
          "
          style={{ minHeight: '52px', maxHeight: '120px' }}
        />

        {/* Send button — indigo circle inside right of textarea */}
        <button
          disabled={!text.trim()}
          className="
            absolute right-3 bottom-3
            w-8 h-8
            flex items-center justify-center
            bg-accent hover:bg-accent-hover
            disabled:opacity-30 disabled:cursor-not-allowed
            text-white rounded-full
            transition-colors duration-150
          "
          aria-label="Send message"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[11px] text-text-muted mt-2">
        TeleRAGent can make mistakes. Verify critical network decisions.
      </p>
    </div>
  );
}

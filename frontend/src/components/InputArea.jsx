import { useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export function InputArea({ activeMode, onSend, isDisabled }) {
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

  const handleSubmit = () => {
    const trimmedText = text.trim();
    if (!trimmedText || isDisabled) {
      return;
    }

    onSend(trimmedText);
    setText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-[#f5f5f7] px-4 pb-4 pt-3 transition-colors duration-200 dark:bg-page">
      {/* Textarea wrapper */}
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          rows={1}
          className="
            w-full
            bg-white
            border border-[#d2d2d7]
            text-[#1d1d1f]
            rounded-2xl
            pl-4 pr-14 py-3.5
            focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]
            placeholder:text-[#86868b]
            transition-[border-color,box-shadow] duration-150
            text-[15px] leading-relaxed
            dark:bg-[#0e1520]
            dark:border-[#1e2d40]
            dark:text-text-primary
            dark:placeholder:text-text-muted
          "
          style={{ minHeight: '52px', maxHeight: '120px' }}
        />

        {/* Send button — indigo circle inside right of textarea */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isDisabled}
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
      <p className="mt-2 text-center text-[11px] text-[#86868b] dark:text-text-muted">
        TeleRAGent can make mistakes. Verify critical network decisions.
      </p>
    </div>
  );
}

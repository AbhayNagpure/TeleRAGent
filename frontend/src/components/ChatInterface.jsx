import { useEffect, useRef } from 'react';

export function ChatInterface({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="px-4 py-8 space-y-12 w-full text-[15px] sm:text-base">
      {messages.length === 0 ? (
        <div className="text-center text-text-muted mt-20">
          <p>Precision network intelligence.</p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="msg-enter">
            {message.role === 'user' ? (
              // User message: right-aligned, indigo color, no bubble
              <div className="flex justify-end">
                <div className="text-accent max-w-[85%] leading-relaxed text-right">
                  {message.text}
                </div>
              </div>
            ) : (
              // AI message: plain text, indigo border-l, no bubble
              <div className="flex justify-start">
                <div className="max-w-[95%]">
                  <div className="border-l-2 border-accent pl-4 text-text-primary leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </div>
                  
                  {/* Source chips */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pl-4">
                      {message.sources.map((source) => (
                         <span
                          key={source.id}
                          className="text-[11px] px-2.5 py-0.5 bg-surface text-accent rounded-full whitespace-nowrap"
                        >
                          {source.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <div ref={scrollRef} className="h-4" />
    </div>
  );
}

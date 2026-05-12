import { useEffect, useRef } from 'react';

export function ChatInterface({ messages, isTyping }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="px-4 py-6 space-y-4 w-full text-[15px] sm:text-base">
      {messages.length === 0 ? (
        <div className="mt-20 text-center text-[#86868b] dark:text-text-muted">
          <p>Precision network intelligence.</p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="msg-enter">
            {message.role === 'error' ? (
              <div className="flex justify-start">
                <div className="px-4 py-2 text-sm text-red-400/90 dark:text-red-300/80">
                  {message.text}
                </div>
              </div>
            ) : message.role === 'user' ? (
              // User message
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-lg border border-[#c7d2fe] bg-[#eef2ff] px-4 py-3 text-right leading-relaxed text-[#3730a3] shadow-sm dark:border-[#2a3a52] dark:bg-[#13192a] dark:text-[#c7d2fe] dark:shadow-none">
                  {message.text}
                </div>
              </div>
            ) : (
              // AI message
              <div className="flex justify-start">
                <div className="max-w-[95%]">
                  <div className="rounded-lg bg-white px-4 py-3 leading-relaxed text-[#374151] shadow-sm whitespace-pre-wrap dark:bg-[#0b1120] dark:text-[#cbd5e1] dark:shadow-none">
                    {message.text}
                  </div>
                  
                  {/* Source chips */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pl-4">
                      {message.sources.map((source) => (
                         <span
                          key={source.ref || source.id || source.label}
                          title={source.ref}
                          className="rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-3 py-1 text-[11px] text-[#4f46e5] whitespace-nowrap dark:border-[#2d4a6a] dark:bg-[#1e2d40] dark:text-[#818cf8]"
                        >
                          {source.label || source.text}
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
      {isTyping && (
        <div className="msg-enter flex justify-start">
          <div className="rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-[#0b1120] dark:shadow-none">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#86868b] dark:bg-text-muted" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#86868b] [animation-delay:120ms] dark:bg-text-muted" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#86868b] [animation-delay:240ms] dark:bg-text-muted" />
            </div>
          </div>
        </div>
      )}
      <div ref={scrollRef} className="h-4" />
    </div>
  );
}

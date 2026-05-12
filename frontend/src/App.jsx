import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { ChatInterface } from './components/ChatInterface';
import { InputArea } from './components/InputArea';
import { SettingsDrawer } from './components/SettingsDrawer';

// Dummy messages for demonstration
const initialMessages = [
  {
    id: '1',
    role: 'ai',
    text: 'Hello! I am TeleRAGent, your network operations assistant. How can I help you today?',
  },
  {
    id: '2',
    role: 'user',
    text: 'What are the throughput requirements for 5G URLLC according to the latest release?',
  },
  {
    id: '3',
    role: 'ai',
    text: 'According to 3GPP TS 22.261 (Rel. 16), URLLC (Ultra-Reliable Low Latency Communication) requires a reliability of 99.999% and user plane latency of 0.5 ms for uplink and downlink. Throughput depends on the specific use case, but for factory automation it can require up to 10 Mbps per device with strict latency bounds.',
    sources: [
      { id: 's1', text: '3GPP Rel.16 §5.3.2' },
      { id: 's2', text: 'TeleQnA #142' }
    ]
  }
];

export default function App() {
  const [activeMode, setActiveMode] = useState('Q&A');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages] = useState(initialMessages);

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-page text-text-primary font-sans">
      <TopBar 
        activeMode={activeMode} 
        setActiveMode={setActiveMode} 
        toggleSettings={() => setIsSettingsOpen(true)} 
      />
      
      {/* Scrollable chat area */}
      <main className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-2xl mx-auto w-full min-h-full flex flex-col justify-end">
          <ChatInterface messages={messages} />
        </div>
      </main>

      {/* Input area fixed at bottom centered with chat column */}
      <div className="w-full shrink-0">
        <div className="max-w-2xl mx-auto w-full">
          <InputArea activeMode={activeMode} />
        </div>
      </div>

      <SettingsDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { TopBar } from './components/TopBar';
import { ChatInterface } from './components/ChatInterface';
import { InputArea } from './components/InputArea';
import { SettingsDrawer } from './components/SettingsDrawer';

const API_BASE_URL = 'http://localhost:8000';
const DEFAULT_SETTINGS = { topK: 5, temperature: 0.2 };
const MODE_TO_API = {
  'Q&A': 'qna',
  'Root Cause Analysis': 'rca',
  'Anomaly Detection': 'anomaly',
};

const initialMessages = [
  {
    id: '1',
    role: 'ai',
    text: 'Hello! I am TeleRAGent, your network operations assistant. How can I help you today?',
  },
];

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function App() {
  const [activeMode, setActiveMode] = useState('Q&A');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isTyping, setIsTyping] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (!response.ok) {
          throw new Error('Backend health check failed');
        }
        setBackendStatus('online');
      } catch {
        setBackendStatus('offline');
      }
    };

    checkHealth();
  }, []);

  const handleSendMessage = async (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isTyping) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: createId(), role: 'user', text: trimmedMessage },
    ]);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedMessage,
          mode: MODE_TO_API[activeMode],
          top_k: settings.topK,
          temperature: settings.temperature,
        }),
      });

      if (!response.ok) {
        throw new Error('Query failed');
      }

      const data = await response.json();
      setBackendStatus('online');
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'ai',
          text: data.answer,
          sources: data.sources,
          mode: data.mode,
        },
      ]);
    } catch {
      setBackendStatus('offline');
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'error',
          text: 'Something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/clear`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Clear chat failed');
      }
      setBackendStatus('online');
      setMessages(initialMessages);
    } catch {
      setBackendStatus('offline');
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'error',
          text: 'Something went wrong. Please try again.',
        },
      ]);
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-page text-text-primary' : 'bg-[#f5f5f7] text-[#1d1d1f]'} flex h-[100dvh] w-full flex-col font-sans transition-colors duration-200`}>
      <TopBar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        toggleSettings={() => setIsSettingsOpen(true)}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode((current) => !current)}
        backendStatus={backendStatus}
      />

      {/* Scrollable chat area */}
      <main className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-3xl mx-auto w-full min-h-full flex flex-col justify-end">
          <ChatInterface messages={messages} isTyping={isTyping} />
        </div>
      </main>

      {/* Input area fixed at bottom centered with chat column */}
      <div className="w-full shrink-0">
        <div className="max-w-3xl mx-auto w-full">
          <InputArea activeMode={activeMode} onSend={handleSendMessage} isDisabled={isTyping} />
        </div>
      </div>

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
        onClearChat={handleClearChat}
      />
    </div>
  );
}

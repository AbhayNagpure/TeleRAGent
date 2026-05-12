import { Settings } from 'lucide-react';
import clsx from 'clsx';

const MODES = ['Q&A', 'Root Cause Analysis', 'Anomaly Detection'];

export function TopBar({ activeMode, setActiveMode, toggleSettings }) {
  return (
    <header className="w-full border-b border-surface bg-page/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-2xl mx-auto w-full px-4 flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4 sm:gap-0">
        
        {/* Logo and Gear (Mobile) */}
        <div className="flex items-center justify-between sm:w-auto w-full">
          <h1 className="text-xl font-bold text-white tracking-wide">
            Tele<span className="text-accent">RAG</span>ent
          </h1>
          <button
            onClick={toggleSettings}
            className="sm:hidden p-1.5 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Open Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Modes */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {MODES.map((mode, idx) => (
            <div key={mode} className="flex items-center whitespace-nowrap">
              <button
                onClick={() => setActiveMode(mode)}
                className={clsx(
                  "text-[15px] sm:text-base transition-colors pb-1 border-b-2",
                  activeMode === mode
                    ? "text-accent border-accent font-medium"
                    : "text-text-muted border-transparent hover:text-text-primary"
                )}
              >
                {mode}
              </button>
              {idx < MODES.length - 1 && (
                <span className="text-text-muted/30 mx-3 hidden sm:inline-block">•</span>
              )}
            </div>
          ))}
        </div>

        {/* Gear Desktop */}
        <button
          onClick={toggleSettings}
          className="hidden sm:block p-1.5 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Open Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

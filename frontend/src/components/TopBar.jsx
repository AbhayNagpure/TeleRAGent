import { Moon, Settings, Sun } from 'lucide-react';
import clsx from 'clsx';

const MODES = ['Q&A', 'Root Cause Analysis', 'Anomaly Detection'];

export function TopBar({ activeMode, setActiveMode, toggleSettings, isDarkMode, toggleTheme, backendStatus }) {
  const isBackendOnline = backendStatus === 'online';
  const statusLabel =
    backendStatus === 'checking'
      ? 'Checking backend'
      : isBackendOnline
        ? 'Backend online'
        : 'Backend offline';

  return (
    <header className="sticky top-0 z-10 w-full border-b border-[#d9dce3] bg-[#f5f5f7]/90 backdrop-blur transition-colors duration-200 dark:border-surface dark:bg-page/90">
      <div className="mx-auto flex w-full max-w-3xl flex-col justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex w-full items-center justify-between sm:w-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-wide text-[#1d1d1f] dark:text-white">
              Tele<span className="text-accent">RAG</span>ent
            </h1>
            <span
              className={clsx(
                'h-2 w-2 rounded-full',
                backendStatus === 'checking'
                  ? 'bg-[#86868b]'
                  : isBackendOnline
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
              )}
              title={statusLabel}
              aria-label={statusLabel}
            />
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-1.5 text-[#6e6e73] transition-colors hover:text-[#1d1d1f] dark:text-text-muted dark:hover:text-text-primary"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleSettings}
              className="p-1.5 text-[#6e6e73] transition-colors hover:text-[#1d1d1f] dark:text-text-muted dark:hover:text-text-primary"
              aria-label="Open Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="-mx-4 flex items-center gap-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0">
          {MODES.map((mode, idx) => (
            <div key={mode} className="flex items-center whitespace-nowrap">
              <button
                onClick={() => setActiveMode(mode)}
                className={clsx(
                  'inline-flex border-b-2 pb-1 text-sm transition-colors sm:text-[15px]',
                  activeMode === mode
                    ? 'border-accent text-accent font-medium'
                    : 'border-transparent text-[#6e6e73] hover:text-[#1d1d1f] dark:text-text-muted dark:hover:text-text-primary'
                )}
              >
                {mode}
              </button>
              {idx < MODES.length - 1 && (
                <span className="mx-3 hidden text-[#9b9ba1]/60 sm:inline-block dark:text-text-muted/30">
                  |
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-[#6e6e73] transition-colors hover:text-[#1d1d1f] dark:text-text-muted dark:hover:text-text-primary"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={toggleSettings}
            className="p-1.5 text-[#6e6e73] transition-colors hover:text-[#1d1d1f] dark:text-text-muted dark:hover:text-text-primary"
            aria-label="Open Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

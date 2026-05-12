import { X, Trash2, SlidersHorizontal, Cpu } from 'lucide-react';
import clsx from 'clsx';

export function SettingsDrawer({ isOpen, onClose, settings, setSettings, onClearChat }) {
  const updateTopK = (event) => {
    setSettings((current) => ({ ...current, topK: Number(event.target.value) }));
  };

  const updateTemperature = (event) => {
    setSettings((current) => ({ ...current, temperature: Number(event.target.value) }));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={clsx(
          'fixed right-0 top-0 z-50 flex h-[100dvh] w-80 flex-col border-l border-[#d9dce3] bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-surface dark:bg-surface-alt',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5ea] px-6 py-5 dark:border-surface">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[#1d1d1f] dark:text-text-primary">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-[#86868b] transition-colors hover:text-[#1d1d1f] dark:text-text-muted dark:hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-9">

          {/* Top-K Retrieval */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-[#1d1d1f] dark:text-text-primary">Top-K Retrieval</label>
              <span className="rounded bg-[#eef2ff] px-2 py-0.5 font-mono text-xs text-accent dark:bg-surface">{settings.topK}</span>
            </div>
            <input type="range" min="1" max="10" value={settings.topK} onChange={updateTopK} className="w-full" />
            <p className="text-xs text-[#86868b] dark:text-text-muted">Number of context chunks to retrieve.</p>
          </div>

          {/* Show Sources */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-[#1d1d1f] dark:text-text-primary">Show Sources</p>
              <p className="text-xs text-[#86868b] dark:text-text-muted">Display references below answers.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="
                w-9 h-5 rounded-full bg-[#d2d2d7] dark:bg-surface
                peer-checked:bg-accent
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:rounded-full after:h-4 after:w-4
                after:transition-all
                peer-checked:after:translate-x-4
              " />
            </label>
          </div>

          {/* Temperature */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-[#1d1d1f] dark:text-text-primary">Temperature</label>
              <span className="rounded bg-[#eef2ff] px-2 py-0.5 font-mono text-xs text-accent dark:bg-surface">{settings.temperature.toFixed(1)}</span>
            </div>
            <input type="range" min="0" max="1" step="0.1" value={settings.temperature} onChange={updateTemperature} className="w-full" />
            <p className="text-xs text-[#86868b] dark:text-text-muted">Higher values produce more creative outputs.</p>
          </div>

          {/* Clear history */}
          <div className="mt-auto border-t border-[#e5e5ea] pt-4 dark:border-surface">
            <button
              onClick={onClearChat}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat History
            </button>
          </div>
        </div>

        {/* Footer — active model */}
        <div className="flex items-center gap-3 border-t border-[#e5e5ea] px-6 py-4 dark:border-surface">
          <div className="rounded-md bg-[#f5f5f7] p-1.5 dark:bg-surface">
            <Cpu className="w-4 h-4 text-[#86868b] dark:text-text-muted" />
          </div>
          <div>
            <p className="text-[11px] text-[#86868b] dark:text-text-muted">Active Model</p>
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-text-primary">Mistral-7B + LoRA</p>
          </div>
        </div>
      </div>
    </>
  );
}

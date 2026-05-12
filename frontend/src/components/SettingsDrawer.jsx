import { X, Trash2, SlidersHorizontal, Cpu } from 'lucide-react';
import clsx from 'clsx';

export function SettingsDrawer({ isOpen, onClose }) {
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
          'fixed right-0 top-0 h-[100dvh] w-80 bg-surface-alt border-l border-surface shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface">
          <h2 className="text-sm font-semibold text-text-primary tracking-wide flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-9">

          {/* Top-K Retrieval */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-text-primary">Top-K Retrieval</label>
              <span className="text-xs font-mono text-accent bg-surface px-2 py-0.5 rounded">5</span>
            </div>
            <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
            <p className="text-xs text-text-muted">Number of context chunks to retrieve.</p>
          </div>

          {/* Show Sources */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-text-primary">Show Sources</p>
              <p className="text-xs text-text-muted">Display references below answers.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="
                w-9 h-5 rounded-full bg-surface
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
              <label className="text-sm text-text-primary">Temperature</label>
              <span className="text-xs font-mono text-accent bg-surface px-2 py-0.5 rounded">0.2</span>
            </div>
            <input type="range" min="0" max="1" step="0.1" defaultValue="0.2" className="w-full" />
            <p className="text-xs text-text-muted">Higher values produce more creative outputs.</p>
          </div>

          {/* Clear history */}
          <div className="pt-4 border-t border-surface mt-auto">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-4 h-4" />
              Clear Chat History
            </button>
          </div>
        </div>

        {/* Footer — active model */}
        <div className="px-6 py-4 border-t border-surface flex items-center gap-3">
          <div className="p-1.5 bg-surface rounded-md">
            <Cpu className="w-4 h-4 text-text-muted" />
          </div>
          <div>
            <p className="text-[11px] text-text-muted">Active Model</p>
            <p className="text-sm font-medium text-text-primary">Mistral-7B + LoRA</p>
          </div>
        </div>
      </div>
    </>
  );
}

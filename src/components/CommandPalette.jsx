import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Copy, FileText, Moon, Search, Sun, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio.js';

export function CommandPalette({
  open,
  onClose,
  theme,
  onToggleTheme,
  onOpenResume,
  onNavigate,
}) {
  const [query, setQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const copyValue = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const actions = useMemo(
    () => [
      {
        id: 'nav-about',
        label: 'Jump to About & Profile',
        hint: 'Section',
        icon: ArrowRight,
        onSelect: () => {
          onNavigate('about');
          onClose();
        },
      },
      {
        id: 'nav-projects',
        label: 'Jump to Selected Projects',
        hint: '4 Interactive Builds',
        icon: ArrowRight,
        onSelect: () => {
          onNavigate('projects');
          onClose();
        },
      },
      {
        id: 'nav-experience',
        label: 'Jump to Experience & Education',
        hint: 'Timeline',
        icon: ArrowRight,
        onSelect: () => {
          onNavigate('experience');
          onClose();
        },
      },
      {
        id: 'nav-capabilities',
        label: 'Jump to Technical Capabilities',
        hint: 'Stack',
        icon: ArrowRight,
        onSelect: () => {
          onNavigate('capabilities');
          onClose();
        },
      },
      {
        id: 'nav-contact',
        label: 'Jump to Contact & Inquiry',
        hint: 'Message',
        icon: ArrowRight,
        onSelect: () => {
          onNavigate('contact');
          onClose();
        },
      },
      {
        id: 'open-resume',
        label: 'Open & Download Resume PDF',
        hint: 'CV',
        icon: FileText,
        onSelect: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: 'copy-email',
        label:
          copiedKey === 'email'
            ? `Copied ${PROFILE.email}`
            : `Copy Email (${PROFILE.email})`,
        hint: 'Clipboard',
        icon: copiedKey === 'email' ? Check : Copy,
        onSelect: () => copyValue('email', PROFILE.email),
      },
      {
        id: 'copy-phone',
        label:
          copiedKey === 'phone'
            ? `Copied ${PROFILE.phone}`
            : `Copy Phone (${PROFILE.phone})`,
        hint: 'Clipboard',
        icon: copiedKey === 'phone' ? Check : Copy,
        onSelect: () => copyValue('phone', PROFILE.phone),
      },
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        hint: 'Appearance',
        icon: theme === 'dark' ? Sun : Moon,
        onSelect: () => {
          onToggleTheme();
          onClose();
        },
      },
    ],
    [copiedKey, theme, onClose, onNavigate, onOpenResume, onToggleTheme]
  );

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-zinc-950/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Quick navigation command menu"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, resume, or actions..."
                className="w-full bg-transparent text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick menu"
                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.onSelect}
                      className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <Icon className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span className="text-xs font-mono text-zinc-400 shrink-0">
                        {item.hint}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

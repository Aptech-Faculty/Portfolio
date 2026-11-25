import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText, X } from 'lucide-react';
import { EDUCATION, EXPERIENCES, PROFILE, SKILL_GROUPS } from '../data/portfolio.js';

export function ResumeModal({ open, onClose }) {
  const [viewMode, setViewMode] = useState('pdf');

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-[88vh] flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                <h2
                  id="resume-modal-title"
                  className="text-sm font-display font-semibold text-zinc-950 dark:text-zinc-50 truncate"
                >
                  Muhammad Usaid — Curriculum Vitae
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setViewMode('pdf')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      viewMode === 'pdf'
                        ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                    }`}
                  >
                    Original PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('structured')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      viewMode === 'structured'
                        ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                    }`}
                  >
                    Readable Summary
                  </button>
                </div>

                <a
                  href={PROFILE.resumeUrl}
                  download="Muhammad_Usaid_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
              {viewMode === 'pdf' ? (
                <iframe
                  src={PROFILE.resumeUrl}
                  title="Muhammad Usaid Resume PDF"
                  className="w-full h-full min-h-[520px] border-0"
                />
              ) : (
                <div className="max-w-3xl mx-auto p-6 sm:p-10 space-y-8 text-zinc-900 dark:text-zinc-100">
                  <div className="flex items-center gap-5 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <img
                      src={PROFILE.photoUrl}
                      alt={PROFILE.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover object-top border border-zinc-200 dark:border-zinc-800 shrink-0"
                    />
                    <div>
                      <h3 className="text-2xl font-display font-bold tracking-tight">
                        {PROFILE.name}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                        {PROFILE.role}
                      </p>
                      <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1.5">
                        {PROFILE.email} · {PROFILE.phone} · {PROFILE.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">About</h4>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {PROFILE.aboutParagraphs[0]} {PROFILE.aboutParagraphs[1]}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Work Experience</h4>
                    <div className="space-y-5">
                      {EXPERIENCES.map((exp) => (
                        <div key={exp.id} className="space-y-1.5">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="text-sm font-semibold">
                              {exp.role} — {exp.organization}
                            </span>
                            <span className="text-xs font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                              {exp.period}
                            </span>
                          </div>
                          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                            {exp.bullets.map((b) => (
                              <li key={b}>— {b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Education</h4>
                    <div className="space-y-3">
                      {EDUCATION.map((edu) => (
                        <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold">{edu.role}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {edu.organization}
                            </div>
                          </div>
                          <span className="text-xs font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                            {edu.period}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Technical Skills</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {SKILL_GROUPS.map((group) => (
                        <div key={group.id}>
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {group.title}
                          </div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                            {group.items.join(' · ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

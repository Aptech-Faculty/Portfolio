import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { ProjectPreview } from './ProjectPreview.jsx';

export function ProjectModal({
  project,
  onClose,
  onInquire,
  onSelectProject,
  projects = [],
}) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const currentIdx = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject =
    currentIdx > 0 ? projects[currentIdx - 1] : projects[projects.length - 1] || null;
  const nextProject =
    currentIdx >= 0 && currentIdx < projects.length - 1
      ? projects[currentIdx + 1]
      : projects[0] || null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
                <span>Project {project.index}</span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {projects.length > 1 && onSelectProject && (
                  <div className="hidden sm:flex items-center gap-1 mr-2">
                    <button
                      type="button"
                      onClick={() => prevProject && onSelectProject(prevProject)}
                      aria-label="Previous project"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Prev</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => nextProject && onSelectProject(nextProject)}
                      aria-label="Next project"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="p-6 sm:p-8 space-y-8"
              >
                <div>
                  <h2
                    id="project-modal-title"
                    className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {project.role}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {project.summary}
                  </p>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                  <ProjectPreview type={project.previewType} interactive />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Challenge
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.problem}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      System Architecture
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.architecture}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Key Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5"
                      >
                        <span className="font-mono text-blue-600 dark:text-blue-400 text-xs mt-1">
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {project.stack.join(' · ')}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onInquire(project.title);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Discuss Similar Build</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState } from 'react';
import {
  Bookmark,
  Check,
  CloudSun,
  Droplets,
  Plus,
  Search,
  Trash2,
  Wind,
} from 'lucide-react';

export function ProjectPreview({ type, interactive = true }) {
  // Marketplace state
  const [marketCategory, setMarketCategory] = useState('All');
  const [savedIds, setSavedIds] = useState(['m1']);

  // Blog state
  const [activePostIdx, setActivePostIdx] = useState(0);
  const [likedPosts, setLikedPosts] = useState([0]);

  // Weather state
  const [selectedCity, setSelectedCity] = useState('Karachi');

  // Todo state
  const [tasks, setTasks] = useState([
    { id: 't1', label: 'Finalize MongoDB indexing for listings', done: true, due: '09:30' },
    { id: 't2', label: 'Review Aptech MERN cohort REST builds', done: false, due: '14:00' },
    { id: 't3', label: 'Ship responsive mobile drawer polish', done: false, due: '17:30' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [todoFilter, setTodoFilter] = useState('All');

  const stop = (e) => e.stopPropagation();

  if (type === 'marketplace') {
    const listings = [
      { id: 'm1', title: 'MacBook Pro M2 16"', price: 'PKR 345,000', area: 'Gulshan, KHI', cat: 'Tech' },
      { id: 'm2', title: 'Sony WH-1000XM5', price: 'PKR 78,500', area: 'Clifton, KHI', cat: 'Tech' },
      { id: 'm3', title: 'Herman Miller Sayl', price: 'PKR 112,000', area: 'DHA Phase 6', cat: 'Workspace' },
      { id: 'm4', title: 'Keychron Q1 Pro', price: 'PKR 42,000', area: 'Nazimabad', cat: 'Workspace' },
    ];

    const visible =
      marketCategory === 'All'
        ? listings
        : listings.filter((item) => item.cat === marketCategory);

    const toggleSave = (e, id) => {
      stop(e);
      setSavedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };

    return (
      <div
        onClick={stop}
        className="w-full h-full bg-zinc-50 dark:bg-zinc-950/90 p-4 flex flex-col justify-between gap-3 select-none"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-900 dark:text-zinc-100">
            <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="font-display font-semibold tracking-tight">Bazaar Feed</span>
          </div>
          {interactive && (
            <div className="flex items-center gap-1">
              {['All', 'Tech', 'Workspace'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    setMarketCategory(cat);
                  }}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    marketCategory === cat
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {visible.map((item) => {
            const isSaved = savedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-lg p-2.5 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                    {item.cat}
                  </span>
                  {interactive && (
                    <button
                      type="button"
                      onClick={(e) => toggleSave(e, item.id)}
                      aria-label={isSaved ? 'Remove bookmark' : 'Save listing'}
                      className={`p-0.5 rounded transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                      }`}
                    >
                      <Bookmark
                        className="w-3 h-3"
                        fill={isSaved ? 'currentColor' : 'none'}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
                <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {item.title}
                </div>
                <div className="mt-1.5 flex items-baseline justify-between gap-1">
                  <span className="text-[11px] font-mono font-medium tabular-nums text-zinc-800 dark:text-zinc-200">
                    {item.price}
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                    {item.area}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'blog') {
    const articles = [
      {
        title: 'Designing Predictable Express Middleware for MERN Apps',
        meta: 'Architecture · 6 min read',
        excerpt:
          'Centralized async error wrappers and schema validation keep REST endpoints resilient as collections scale.',
      },
      {
        title: 'Structuring AI API Responses Without Blocking the UI',
        meta: 'AI Engineering · 5 min read',
        excerpt:
          'Optimistic state transitions paired with server-proxied AI calls deliver sub-second perceived latency.',
      },
    ];
    const active = articles[activePostIdx];
    const isLiked = likedPosts.includes(activePostIdx);

    return (
      <div
        onClick={stop}
        className="w-full h-full bg-zinc-50 dark:bg-zinc-950/90 p-4 flex flex-col justify-between gap-3 select-none"
      >
        <div className="flex items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
          <span className="font-display text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Editorial Reader
          </span>
          {interactive && (
            <div className="flex items-center gap-1">
              {articles.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    setActivePostIdx(idx);
                  }}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors cursor-pointer ${
                    activePostIdx === idx
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  Post 0{idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-lg p-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              {active.meta}
            </span>
            {interactive && (
              <button
                type="button"
                onClick={(e) => {
                  stop(e);
                  setLikedPosts((prev) =>
                    prev.includes(activePostIdx)
                      ? prev.filter((i) => i !== activePostIdx)
                      : [...prev, activePostIdx]
                  );
                }}
                className={`text-[11px] font-mono transition-colors cursor-pointer ${
                  isLiked
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                {isLiked ? 'Saved' : 'Save'}
              </button>
            )}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
            {active.title}
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {active.excerpt}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'weather') {
    const weatherMap = {
      Karachi: { temp: '31°C', condition: 'Coastal Breeze', humidity: '58%', wind: '19 km/h' },
      Lahore: { temp: '24°C', condition: 'Partly Cloudy', humidity: '42%', wind: '11 km/h' },
      Islamabad: { temp: '20°C', condition: 'Crisp Sky', humidity: '38%', wind: '14 km/h' },
      Dubai: { temp: '34°C', condition: 'Clear Sun', humidity: '46%', wind: '16 km/h' },
    };
    const current = weatherMap[selectedCity];

    return (
      <div
        onClick={stop}
        className="w-full h-full bg-zinc-50 dark:bg-zinc-950/90 p-4 flex flex-col justify-between gap-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            <CloudSun className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>Forecast Live</span>
          </div>
          {interactive && (
            <div className="flex items-center gap-1">
              {Object.keys(weatherMap).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    setSelectedCity(city);
                  }}
                  className={`px-2 py-0.5 text-[11px] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCity === city
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-lg p-3.5 flex items-center justify-between">
          <div>
            <div className="text-2xl font-display font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
              {current.temp}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {selectedCity} · {current.condition}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-right font-mono tabular-nums text-[11px]">
            <span className="text-zinc-500 dark:text-zinc-400 flex items-center justify-end gap-1">
              <Droplets className="w-3 h-3" aria-hidden="true" />
              Humidity
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">{current.humidity}</span>
            <span className="text-zinc-500 dark:text-zinc-400 flex items-center justify-end gap-1">
              <Wind className="w-3 h-3" aria-hidden="true" />
              Wind
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">{current.wind}</span>
          </div>
        </div>
      </div>
    );
  }

  // Todo live interactive widget
  const visibleTasks = tasks.filter((t) => {
    if (todoFilter === 'Active') return !t.done;
    if (todoFilter === 'Done') return t.done;
    return true;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: `t-${Date.now()}`, label: trimmed, done: false, due: 'Today' },
      ...prev,
    ]);
    setNewTask('');
  };

  const toggleTask = (e, id) => {
    stop(e);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTask = (e, id) => {
    stop(e);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div
      onClick={stop}
      className="w-full h-full bg-zinc-50 dark:bg-zinc-950/90 p-4 flex flex-col justify-between gap-2.5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <span className="font-display text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          Sprint Queue ·{' '}
          <span className="font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
            {doneCount}/{tasks.length}
          </span>
        </span>
        {interactive && (
          <div className="flex items-center gap-1">
            {['All', 'Active', 'Done'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={(e) => {
                  stop(e);
                  setTodoFilter(f);
                }}
                className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                  todoFilter === f
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {interactive && (
        <form onSubmit={handleAddTask} className="flex items-center gap-1.5">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Try adding a task..."
            className="flex-1 min-w-0 px-2.5 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <button
            type="submit"
            aria-label="Add task"
            className="px-2.5 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </form>
      )}

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800 max-h-36 overflow-y-auto">
        {visibleTasks.length === 0 ? (
          <div className="px-3 py-4 text-center text-[11px] text-zinc-400">
            No tasks in this view.
          </div>
        ) : (
          visibleTasks.map((task) => (
            <div
              key={task.id}
              className="px-3 py-2 flex items-center justify-between gap-2"
            >
              <button
                type="button"
                onClick={(e) => toggleTask(e, task.id)}
                className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer flex-1"
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                    task.done
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  {task.done && <Check className="w-2.5 h-2.5" aria-hidden="true" />}
                </span>
                <span
                  className={`text-xs truncate ${
                    task.done
                      ? 'line-through text-zinc-400 dark:text-zinc-500'
                      : 'text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  {task.label}
                </span>
              </button>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono tabular-nums text-zinc-400">
                  {task.due}
                </span>
                {interactive && (
                  <button
                    type="button"
                    onClick={(e) => removeTask(e, task.id)}
                    aria-label="Delete task"
                    className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

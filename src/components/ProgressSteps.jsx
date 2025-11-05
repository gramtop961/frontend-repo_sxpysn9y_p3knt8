import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

const steps = [
  { key: 'feasibility', label: 'Feasibility check' },
  { key: 'fetching', label: 'Fetching live data' },
  { key: 'planning', label: 'Planning itinerary' },
  { key: 'finalizing', label: 'Finalizing results' },
];

export default function ProgressSteps({ current, statusMap = {} }) {
  return (
    <ol className="grid md:grid-cols-4 gap-3">
      {steps.map((s, idx) => {
        const active = current === s.key;
        const done = statusMap[s.key] === 'done';
        const pending = !done && !active;
        return (
          <li key={s.key} className={`rounded-lg border p-3 flex items-center gap-3 ${done ? 'border-green-200 bg-green-50' : active ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
            <div className="shrink-0">
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : active ? (
                <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-300" />
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${done ? 'text-green-800' : active ? 'text-indigo-800' : 'text-gray-700'}`}>{idx + 1}. {s.label}</p>
              <p className="text-xs text-gray-500">{pending ? 'Pending' : active ? 'In progress' : 'Complete'}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

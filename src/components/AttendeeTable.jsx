import React from 'react';
import { Check, X, Trash2 } from 'lucide-react';

function AttendeeTable({ students, attendanceMap, onToggle, onRemove }) {
  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {students.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">No students yet. Add a student to get started.</td>
            </tr>
          )}
          {students.map((s) => {
            const present = attendanceMap?.[s.id] ?? false;
            return (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{s.name}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {s.email || <span className="text-gray-400">—</span>}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => onToggle(s.id, true)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${present ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
                    >
                      <Check className="h-3 w-3" /> Present
                    </button>
                    <button
                      onClick={() => onToggle(s.id, false)}
                      className={`ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${!present ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}
                    >
                      <X className="h-3 w-3" /> Absent
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onRemove(s.id)}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-2.5 py-1.5 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AttendeeTable;

import React from 'react';
import { Calendar, Download, Search, Check, X } from 'lucide-react';

function AttendanceControls({ selectedDate, onDateChange, onMarkAll, query, onQueryChange, onExport }) {
  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-col md:flex-row items-center gap-3">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Calendar className="h-5 w-5 text-gray-500" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:flex-1">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <button
          onClick={() => onMarkAll(true)}
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <Check className="h-4 w-4" /> Mark all present
        </button>
        <button
          onClick={() => onMarkAll(false)}
          className="inline-flex items-center gap-2 rounded-md bg-rose-600 text-white px-3 py-2 text-sm font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <X className="h-4 w-4" /> Mark all absent
        </button>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>
    </div>
  );
}

export default AttendanceControls;

import React from 'react';
import { Users } from 'lucide-react';

function Header({ dateLabel, total, present, absent }) {
  return (
    <header className="w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Student Attendee Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track attendance quickly and export records. {dateLabel && (<span className="font-medium text-gray-700 dark:text-gray-300">{dateLabel}</span>)}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold">{total}</p>
        </div>
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/40 p-3 bg-emerald-50 dark:bg-emerald-950/40">
          <p className="text-xs text-emerald-700 dark:text-emerald-300">Present</p>
          <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{present}</p>
        </div>
        <div className="rounded-lg border border-rose-200 dark:border-rose-900/40 p-3 bg-rose-50 dark:bg-rose-950/40">
          <p className="text-xs text-rose-700 dark:text-rose-300">Absent</p>
          <p className="text-lg font-semibold text-rose-700 dark:text-rose-300">{absent}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;

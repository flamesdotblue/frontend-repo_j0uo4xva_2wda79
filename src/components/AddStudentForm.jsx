import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sid, setSid] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !sid.trim()) return;
    onAdd({ id: sid.trim(), name: name.trim(), email: email.trim() });
    setName('');
    setEmail('');
    setSid('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
      <input
        type="text"
        placeholder="Student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Student ID"
        value={sid}
        onChange={(e) => setSid(e.target.value)}
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-3 py-2 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <Plus className="h-4 w-4" /> Add student
      </button>
    </form>
  );
}

export default AddStudentForm;

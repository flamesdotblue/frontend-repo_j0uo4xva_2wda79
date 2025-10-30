import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import AttendanceControls from './components/AttendanceControls';
import AddStudentForm from './components/AddStudentForm';
import AttendeeTable from './components/AttendeeTable';

function formatDateInputValue(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function humanDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function App() {
  const [students, setStudents] = useState([
    { id: 'S001', name: 'Alex Johnson', email: 'alex.johnson@example.com' },
    { id: 'S002', name: 'Priya Sharma', email: 'priya.sharma@example.com' },
    { id: 'S003', name: 'Diego Martínez', email: 'diego.martinez@example.com' },
  ]);

  // attendanceByDate: { [date]: { [studentId]: boolean } }
  const [attendanceByDate, setAttendanceByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(formatDateInputValue(new Date()));
  const [query, setQuery] = useState('');

  const currentMap = attendanceByDate[selectedDate] || {};

  const filteredStudents = useMemo(() => {
    if (!query.trim()) return students;
    const q = query.toLowerCase();
    return students.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q)
    );
  }, [students, query]);

  const presentCount = useMemo(() => {
    return students.reduce((acc, s) => acc + (currentMap[s.id] ? 1 : 0), 0);
  }, [students, currentMap]);

  const addStudent = (student) => {
    // Prevent duplicate IDs
    setStudents((prev) => {
      if (prev.some((s) => s.id === student.id)) return prev;
      return [...prev, student];
    });
  };

  const removeStudent = (sid) => {
    setStudents((prev) => prev.filter((s) => s.id !== sid));
    setAttendanceByDate((prev) => {
      const next = { ...prev };
      if (next[selectedDate]) {
        const map = { ...next[selectedDate] };
        delete map[sid];
        next[selectedDate] = map;
      }
      return next;
    });
  };

  const toggleAttendance = (sid, isPresent) => {
    setAttendanceByDate((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {}),
        [sid]: isPresent,
      },
    }));
  };

  const markAll = (isPresent) => {
    setAttendanceByDate((prev) => ({
      ...prev,
      [selectedDate]: Object.fromEntries(students.map((s) => [s.id, isPresent])),
    }));
  };

  const exportCsv = () => {
    const headers = ['Date', 'Student ID', 'Name', 'Email', 'Status'];
    const rows = students.map((s) => [
      selectedDate,
      s.id,
      s.name,
      s.email || '',
      currentMap[s.id] ? 'Present' : 'Absent',
    ]);
    const csv = [headers, ...rows].map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <Header
          dateLabel={humanDate(selectedDate)}
          total={students.length}
          present={presentCount}
          absent={Math.max(0, students.length - presentCount)}
        />

        <AttendanceControls
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onMarkAll={markAll}
          query={query}
          onQueryChange={setQuery}
          onExport={exportCsv}
        />

        <AddStudentForm onAdd={addStudent} />

        <AttendeeTable
          students={filteredStudents}
          attendanceMap={currentMap}
          onToggle={toggleAttendance}
          onRemove={removeStudent}
        />
      </div>
    </div>
  );
}

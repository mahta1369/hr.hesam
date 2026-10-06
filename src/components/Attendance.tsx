import React, { useState } from 'react';
import { AttendanceRecord, Employee } from '../App';

interface AttendanceProps {
  records: AttendanceRecord[];
  employees: Employee[];
}

const Attendance: React.FC<AttendanceProps> = ({ records, employees }) => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRecords = records.filter(r => {
    const matchesDate = r.date === selectedDate;
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present': return { label: 'حاضر', class: 'bg-green-100 text-green-700' };
      case 'absent': return { label: 'غایب', class: 'bg-red-100 text-red-700' };
      case 'late': return { label: 'تأخیر', class: 'bg-yellow-100 text-yellow-700' };
      case 'half-day': return { label: 'نیمه‌وقت', class: 'bg-blue-100 text-blue-700' };
      default: return { label: 'نامشخص', class: 'bg-gray-100 text-gray-700' };
    }
  };

  const totalPresent = records.filter(r => r.date === selectedDate && r.status === 'present').length;
  const totalAbsent = records.filter(r => r.date === selectedDate && r.status === 'absent').length;
  const totalLate = records.filter(r => r.date === selectedDate && r.status === 'late').length;
  const totalHalfDay = records.filter(r => r.date === selectedDate && r.status === 'half-day').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">حضور و غیاب</h1>
          <p className="text-gray-500 mt-1">مدیریت و پیگیری حضور کارکنان</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{totalPresent}</p>
          <p className="text-sm text-green-700 mt-1">حاضر</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
          <p className="text-sm text-red-700 mt-1">غایب</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{totalLate}</p>
          <p className="text-sm text-yellow-700 mt-1">تأخیر</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{totalHalfDay}</p>
          <p className="text-sm text-blue-700 mt-1">نیمه‌وقت</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-xs text-gray-500 mb-1">تاریخ</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">وضعیت</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="all">همه</option>
            <option value="present">حاضر</option>
            <option value="absent">غایب</option>
            <option value="late">تأخیر</option>
            <option value="half-day">نیمه‌وقت</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">کارمند</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">تاریخ</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">ساعت ورود</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">ساعت خروج</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">ساعت کاری</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => {
                const statusBadge = getStatusBadge(record.status);
                const workHours = record.checkIn && record.checkOut
                  ? `${parseInt(record.checkOut) - parseInt(record.checkIn)} ساعت`
                  : '-';
                return (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                          👤
                        </div>
                        <span className="font-medium text-gray-800">{record.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.checkIn || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.checkOut || '-'}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{workHours}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.class}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-4xl mb-3">📅</p>
            <p>رکوردی برای تاریخ انتخاب شده یافت نشد</p>
          </div>
        )}
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">خلاصه هفتگی</h3>
        <div className="grid grid-cols-7 gap-2">
          {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map((day, idx) => (
            <div key={day} className="text-center">
              <p className="text-xs text-gray-500 mb-2">{day}</p>
              <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-lg ${
                idx === 6 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}>
                {idx === 6 ? '🔴' : '🟢'}
              </div>
              <p className="text-xs text-gray-500 mt-1">{idx === 6 ? 'تعطیل' : `${employees.length - (idx === 2 ? 1 : 0)}/${employees.length}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;

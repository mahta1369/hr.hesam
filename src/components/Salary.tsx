import React, { useState } from 'react';
import { SalaryRecord, Employee } from '../App';

interface SalaryProps {
  records: SalaryRecord[];
  employees: Employee[];
}

const Salary: React.FC<SalaryProps> = ({ records, employees }) => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(r => {
    const matchesMonth = r.month === selectedMonth;
    const matchesSearch = r.employeeName.includes(searchTerm);
    return matchesMonth && matchesSearch;
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  const totalBaseSalary = filteredRecords.reduce((sum, r) => sum + r.baseSalary, 0);
  const totalOvertime = filteredRecords.reduce((sum, r) => sum + r.overtime, 0);
  const totalBonus = filteredRecords.reduce((sum, r) => sum + r.bonus, 0);
  const totalDeductions = filteredRecords.reduce((sum, r) => sum + r.deductions, 0);
  const totalTax = filteredRecords.reduce((sum, r) => sum + r.tax, 0);
  const totalNet = filteredRecords.reduce((sum, r) => sum + r.netSalary, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">حقوق و دستمزد</h1>
          <p className="text-gray-500 mt-1">مدیریت و محاسبه حقوق کارکنان</p>
        </div>
        <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md">
          <span>📄</span>
          <span>صدور فیش حقوقی</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">حقوق پایه</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{formatNumber(totalBaseSalary)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">اضافه‌کاری</p>
          <p className="text-lg font-bold text-blue-600 mt-1">{formatNumber(totalOvertime)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">پاداش</p>
          <p className="text-lg font-bold text-green-600 mt-1">{formatNumber(totalBonus)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">کسورات</p>
          <p className="text-lg font-bold text-red-600 mt-1">{formatNumber(totalDeductions)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">مالیات</p>
          <p className="text-lg font-bold text-orange-600 mt-1">{formatNumber(totalTax)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">خالص پرداختی</p>
          <p className="text-lg font-bold text-purple-600 mt-1">{formatNumber(totalNet)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-xs text-gray-500 mb-1">ماه</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs text-gray-500 mb-1">جستجو</label>
          <input
            type="text"
            placeholder="🔍 نام کارمند..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">کارمند</th>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">حقوق پایه</th>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">اضافه‌کاری</th>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">پاداش</th>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">کسورات</th>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">مالیات</th>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">خالص</th>
                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">
                        👤
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{record.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatNumber(record.baseSalary)}</td>
                  <td className="px-4 py-4 text-sm text-blue-600">+{formatNumber(record.overtime)}</td>
                  <td className="px-4 py-4 text-sm text-green-600">+{formatNumber(record.bonus)}</td>
                  <td className="px-4 py-4 text-sm text-red-600">-{formatNumber(record.deductions)}</td>
                  <td className="px-4 py-4 text-sm text-orange-600">-{formatNumber(record.tax)}</td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-800">{formatNumber(record.netSalary)}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      record.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.status === 'paid' ? 'پرداخت شده' : 'در انتظار'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Chart Simulation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">مقایسه حقوق کارکنان</h3>
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <div key={record.id} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-28 truncate">{record.employeeName}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className="bg-gradient-to-l from-purple-500 to-blue-500 h-full rounded-full flex items-center justify-end px-2"
                  style={{ width: `${(record.netSalary / Math.max(...filteredRecords.map(r => r.netSalary))) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{formatNumber(record.netSalary)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Salary;

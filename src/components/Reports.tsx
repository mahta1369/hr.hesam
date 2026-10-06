import React from 'react';
import { Employee, AttendanceRecord, LeaveRequest, SalaryRecord } from '../App';

interface ReportsProps {
  employees: Employee[];
  salaryRecords: SalaryRecord[];
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
}

const Reports: React.FC<ReportsProps> = ({ employees, salaryRecords, attendanceRecords, leaveRequests }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  // Department stats
  const departments = [...new Set(employees.map(e => e.department))];
  const deptStats = departments.map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept);
    const deptSalaries = salaryRecords.filter(s => deptEmployees.some(e => e.id === s.employeeId));
    return {
      name: dept,
      count: deptEmployees.length,
      avgSalary: deptSalaries.length > 0 ? Math.round(deptSalaries.reduce((sum, s) => sum + s.netSalary, 0) / deptSalaries.length) : 0,
      totalSalary: deptSalaries.reduce((sum, s) => sum + s.netSalary, 0),
    };
  });

  // Attendance stats
  const attendanceRate = Math.round((attendanceRecords.filter(a => a.status === 'present').length / attendanceRecords.length) * 100);

  // Leave stats
  const totalLeaveDays = leaveRequests.reduce((sum, l) => sum + l.days, 0);
  const approvedLeaves = leaveRequests.filter(l => l.status === 'approved');
  const approvedLeaveDays = approvedLeaves.reduce((sum, l) => sum + l.days, 0);

  // Salary stats
  const totalPayroll = salaryRecords.reduce((sum, s) => sum + s.netSalary, 0);
  const avgSalary = salaryRecords.length > 0 ? Math.round(totalPayroll / salaryRecords.length) : 0;
  const maxSalary = Math.max(...salaryRecords.map(s => s.netSalary));
  const minSalary = Math.min(...salaryRecords.map(s => s.netSalary));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">گزارشات</h1>
          <p className="text-gray-500 mt-1">تحلیل و گزارش‌گیری از عملکرد منابع انسانی</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md">
          <span>📥</span>
          <span>خروجی PDF</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <p className="text-sm opacity-80">نرخ حضور</p>
          <p className="text-3xl font-bold mt-2">{attendanceRate}%</p>
          <div className="mt-3 bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2" style={{ width: `${attendanceRate}%` }}></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <p className="text-sm opacity-80">میانگین حقوق</p>
          <p className="text-2xl font-bold mt-2">{formatNumber(avgSalary)}</p>
          <p className="text-xs opacity-70 mt-1">ریال</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <p className="text-sm opacity-80">کل مرخصی‌ها</p>
          <p className="text-3xl font-bold mt-2">{totalLeaveDays}</p>
          <p className="text-xs opacity-70 mt-1">روز</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <p className="text-sm opacity-80">کل حقوق ماهانه</p>
          <p className="text-2xl font-bold mt-2">{formatNumber(totalPayroll)}</p>
          <p className="text-xs opacity-70 mt-1">ریال</p>
        </div>
      </div>

      {/* Department Report */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">گزارش دپارتمان‌ها</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">دپارتمان</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">تعداد کارکنان</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">میانگین حقوق</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">جمع حقوق</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">سهم از کل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deptStats.map((dept) => (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{dept.name}</td>
                  <td className="px-6 py-4 text-gray-600">{dept.count} نفر</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(dept.avgSalary)} ریال</td>
                  <td className="px-6 py-4 text-gray-600">{formatNumber(dept.totalSalary)} ریال</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(dept.totalSalary / totalPayroll) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-10">{Math.round((dept.totalSalary / totalPayroll) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">توزیع حقوق</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">بیشترین حقوق</span>
              <span className="font-bold text-green-600">{formatNumber(maxSalary)} ریال</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">کمترین حقوق</span>
              <span className="font-bold text-red-600">{formatNumber(minSalary)} ریال</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">میانگین حقوق</span>
              <span className="font-bold text-blue-600">{formatNumber(avgSalary)} ریال</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">اختلاف</span>
              <span className="font-bold text-purple-600">{formatNumber(maxSalary - minSalary)} ریال</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">وضعیت مرخصی‌ها</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">کل درخواست‌ها</span>
              <span className="font-bold text-gray-800">{leaveRequests.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-green-700">تأیید شده</span>
              <span className="font-bold text-green-600">{approvedLeaves.length} ({approvedLeaveDays} روز)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm text-yellow-700">در انتظار</span>
              <span className="font-bold text-yellow-600">{leaveRequests.filter(l => l.status === 'pending').length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-red-700">رد شده</span>
              <span className="font-bold text-red-600">{leaveRequests.filter(l => l.status === 'rejected').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Performance Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">خلاصه عملکرد کارکنان</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">کارمند</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">دپارتمان</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">وضعیت حضور</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">حقوق</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">مرخصی استفاده شده</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => {
                const empAttendance = attendanceRecords.find(a => a.employeeId === emp.id);
                const empLeaves = leaveRequests.filter(l => l.employeeId === emp.id && l.status === 'approved');
                const empLeaveDays = empLeaves.reduce((sum, l) => sum + l.days, 0);
                const empSalary = salaryRecords.find(s => s.employeeId === emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{emp.avatar}</span>
                        <span className="font-medium text-gray-800 text-sm">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.department}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        empAttendance?.status === 'present' ? 'bg-green-100 text-green-700' :
                        empAttendance?.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                        empAttendance?.status === 'absent' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {empAttendance?.status === 'present' ? 'حاضر' :
                         empAttendance?.status === 'late' ? 'تأخیر' :
                         empAttendance?.status === 'absent' ? 'غایب' :
                         empAttendance?.status === 'half-day' ? 'نیمه‌وقت' : 'نامشخص'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{empSalary ? formatNumber(empSalary.netSalary) : '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{empLeaveDays > 0 ? `${empLeaveDays} روز` : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;

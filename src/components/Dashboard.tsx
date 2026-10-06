import React from 'react';
import { Employee, AttendanceRecord, LeaveRequest, SalaryRecord } from '../App';

interface DashboardProps {
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  salaryRecords: SalaryRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ employees, attendanceRecords, leaveRequests, salaryRecords }) => {
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const presentToday = attendanceRecords.filter(a => a.status === 'present').length;
  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length;
  const totalSalary = salaryRecords.reduce((sum, s) => sum + s.netSalary, 0);

  const departments = [...new Set(employees.map(e => e.department))];
  const deptStats = departments.map(dept => ({
    name: dept,
    count: employees.filter(e => e.department === dept).length,
  }));

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">داشبورد مدیریت</h1>
          <p className="text-gray-500 mt-1">خلاصه وضعیت منابع انسانی سازمان</p>
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-500">تاریخ امروز</p>
          <p className="text-lg font-bold text-gray-700">۱۴۰۳/۰۱/۱۵</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">کل کارکنان</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{employees.length}</p>
              <p className="text-xs text-green-600 mt-1">↑ {activeEmployees} فعال</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">حاضر امروز</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{presentToday}</p>
              <p className="text-xs text-gray-500 mt-1">از {employees.length} نفر</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">مرخصی در انتظار</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{pendingLeaves}</p>
              <p className="text-xs text-orange-600 mt-1">نیاز به بررسی</p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              📋
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">حقوق ماهانه</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{formatNumber(totalSalary)}</p>
              <p className="text-xs text-gray-500 mt-1">ریال</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">توزیع کارکنان بر اساس دپارتمان</h3>
          <div className="space-y-4">
            {deptStats.map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{dept.name}</span>
                  <span className="font-bold text-gray-800">{dept.count} نفر</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-l from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(dept.count / employees.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">وضعیت حضور امروز</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{attendanceRecords.filter(a => a.status === 'present').length}</p>
              <p className="text-sm text-green-700 mt-1">حاضر</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{attendanceRecords.filter(a => a.status === 'absent').length}</p>
              <p className="text-sm text-red-700 mt-1">غایب</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">{attendanceRecords.filter(a => a.status === 'late').length}</p>
              <p className="text-sm text-yellow-700 mt-1">تأخیر</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{attendanceRecords.filter(a => a.status === 'half-day').length}</p>
              <p className="text-sm text-blue-700 mt-1">نیمه‌وقت</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leave Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">آخرین درخواست‌های مرخصی</h3>
          <div className="space-y-3">
            {leaveRequests.slice(0, 4).map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">
                    👤
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{req.employeeName}</p>
                    <p className="text-xs text-gray-500">{req.days} روز - {req.reason}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  req.status === 'approved' ? 'bg-green-100 text-green-700' :
                  req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {req.status === 'approved' ? 'تأیید شده' : req.status === 'pending' ? 'در انتظار' : 'رد شده'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">خلاصه حقوق ماه جاری</h3>
          <div className="space-y-3">
            {salaryRecords.slice(0, 5).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">
                    👤
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{record.employeeName}</p>
                    <p className="text-xs text-gray-500">حقوق ماه {record.month}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">{formatNumber(record.netSalary)}</p>
                  <p className="text-xs text-gray-500">ریال</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Attendance from './components/Attendance';
import Salary from './components/Salary';
import Leave from './components/Leave';
import Reports from './components/Reports';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  avatar: string;
}

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface SalaryRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  month: string;
  baseSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  tax: number;
  netSalary: number;
  status: 'paid' | 'pending';
}

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'علی احمدی', position: 'مدیر فنی', department: 'فناوری اطلاعات', email: 'ali@company.com', phone: '09121234567', hireDate: '2020-03-15', salary: 25000000, status: 'active', avatar: '👨‍💼' },
    { id: 2, name: 'مریم حسینی', position: 'طراح UI/UX', department: 'فناوری اطلاعات', email: 'maryam@company.com', phone: '09131234567', hireDate: '2021-06-20', salary: 18000000, status: 'active', avatar: '👩‍💻' },
    { id: 3, name: 'رضا کریمی', position: 'حسابدار ارشد', department: 'مالی', email: 'reza@company.com', phone: '09141234567', hireDate: '2019-01-10', salary: 22000000, status: 'active', avatar: '👨‍💼' },
    { id: 4, name: 'زهرا محمدی', position: 'مدیر منابع انسانی', department: 'منابع انسانی', email: 'zahra@company.com', phone: '09151234567', hireDate: '2018-09-05', salary: 24000000, status: 'active', avatar: '👩‍💼' },
    { id: 5, name: 'حسن رضایی', position: 'توسعه‌دهنده', department: 'فناوری اطلاعات', email: 'hasan@company.com', phone: '09161234567', hireDate: '2022-02-14', salary: 16000000, status: 'on-leave', avatar: '👨‍💻' },
    { id: 6, name: 'فاطمه نوری', position: 'کارشناس بازاریابی', department: 'بازاریابی', email: 'fatemeh@company.com', phone: '09171234567', hireDate: '2021-11-01', salary: 15000000, status: 'active', avatar: '👩‍💼' },
    { id: 7, name: 'محمد جعفری', position: 'پشتیبانی فنی', department: 'فناوری اطلاعات', email: 'mohammad@company.com', phone: '09181234567', hireDate: '2023-04-20', salary: 14000000, status: 'active', avatar: '👨‍💻' },
    { id: 8, name: 'سارا امینی', position: 'مدیر فروش', department: 'فروش', email: 'sara@company.com', phone: '09191234567', hireDate: '2020-07-12', salary: 20000000, status: 'active', avatar: '👩‍💼' },
  ]);

  const [attendanceRecords] = useState<AttendanceRecord[]>([
    { id: 1, employeeId: 1, employeeName: 'علی احمدی', date: '2024-01-15', checkIn: '08:00', checkOut: '17:00', status: 'present' },
    { id: 2, employeeId: 2, employeeName: 'مریم حسینی', date: '2024-01-15', checkIn: '08:15', checkOut: '17:30', status: 'present' },
    { id: 3, employeeId: 3, employeeName: 'رضا کریمی', date: '2024-01-15', checkIn: '08:45', checkOut: '17:00', status: 'late' },
    { id: 4, employeeId: 4, employeeName: 'زهرا محمدی', date: '2024-01-15', checkIn: '07:55', checkOut: '16:30', status: 'present' },
    { id: 5, employeeId: 5, employeeName: 'حسن رضایی', date: '2024-01-15', checkIn: '', checkOut: '', status: 'absent' },
    { id: 6, employeeId: 6, employeeName: 'فاطمه نوری', date: '2024-01-15', checkIn: '08:00', checkOut: '13:00', status: 'half-day' },
    { id: 7, employeeId: 7, employeeName: 'محمد جعفری', date: '2024-01-15', checkIn: '08:10', checkOut: '17:10', status: 'present' },
    { id: 8, employeeId: 8, employeeName: 'سارا امینی', date: '2024-01-15', checkIn: '08:05', checkOut: '17:00', status: 'present' },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 1, employeeId: 5, employeeName: 'حسن رضایی', type: 'sick', startDate: '2024-01-14', endDate: '2024-01-18', days: 5, status: 'approved', reason: 'بیماری' },
    { id: 2, employeeId: 2, employeeName: 'مریم حسینی', type: 'annual', startDate: '2024-02-01', endDate: '2024-02-05', days: 5, status: 'pending', reason: 'سفر خانوادگی' },
    { id: 3, employeeId: 6, employeeName: 'فاطمه نوری', type: 'personal', startDate: '2024-01-20', endDate: '2024-01-20', days: 1, status: 'pending', reason: 'امور شخصی' },
    { id: 4, employeeId: 1, employeeName: 'علی احمدی', type: 'annual', startDate: '2024-03-15', endDate: '2024-03-20', days: 5, status: 'approved', reason: 'تعطیلات نوروز' },
  ]);

  const [salaryRecords] = useState<SalaryRecord[]>([
    { id: 1, employeeId: 1, employeeName: 'علی احمدی', month: '2024-01', baseSalary: 25000000, overtime: 3000000, bonus: 2000000, deductions: 500000, tax: 2500000, netSalary: 27000000, status: 'paid' },
    { id: 2, employeeId: 2, employeeName: 'مریم حسینی', month: '2024-01', baseSalary: 18000000, overtime: 1500000, bonus: 1000000, deductions: 300000, tax: 1800000, netSalary: 18400000, status: 'paid' },
    { id: 3, employeeId: 3, employeeName: 'رضا کریمی', month: '2024-01', baseSalary: 22000000, overtime: 2000000, bonus: 1500000, deductions: 400000, tax: 2200000, netSalary: 22900000, status: 'paid' },
    { id: 4, employeeId: 4, employeeName: 'زهرا محمدی', month: '2024-01', baseSalary: 24000000, overtime: 2500000, bonus: 2000000, deductions: 600000, tax: 2400000, netSalary: 25500000, status: 'paid' },
    { id: 5, employeeId: 5, employeeName: 'حسن رضایی', month: '2024-01', baseSalary: 16000000, overtime: 0, bonus: 0, deductions: 200000, tax: 1600000, netSalary: 14200000, status: 'pending' },
    { id: 6, employeeId: 6, employeeName: 'فاطمه نوری', month: '2024-01', baseSalary: 15000000, overtime: 1000000, bonus: 500000, deductions: 300000, tax: 1500000, netSalary: 14700000, status: 'paid' },
    { id: 7, employeeId: 7, employeeName: 'محمد جعفری', month: '2024-01', baseSalary: 14000000, overtime: 1500000, bonus: 0, deductions: 200000, tax: 1400000, netSalary: 13900000, status: 'paid' },
    { id: 8, employeeId: 8, employeeName: 'سارا امینی', month: '2024-01', baseSalary: 20000000, overtime: 2000000, bonus: 3000000, deductions: 500000, tax: 2000000, netSalary: 24500000, status: 'paid' },
  ]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard employees={employees} attendanceRecords={attendanceRecords} leaveRequests={leaveRequests} salaryRecords={salaryRecords} />;
      case 'employees':
        return <Employees employees={employees} setEmployees={setEmployees} />;
      case 'attendance':
        return <Attendance records={attendanceRecords} employees={employees} />;
      case 'salary':
        return <Salary records={salaryRecords} employees={employees} />;
      case 'leave':
        return <Leave requests={leaveRequests} setRequests={setLeaveRequests} employees={employees} />;
      case 'reports':
        return <Reports employees={employees} salaryRecords={salaryRecords} attendanceRecords={attendanceRecords} leaveRequests={leaveRequests} />;
      default:
        return <Dashboard employees={employees} attendanceRecords={attendanceRecords} leaveRequests={leaveRequests} salaryRecords={salaryRecords} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;

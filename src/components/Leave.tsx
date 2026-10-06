import React, { useState } from 'react';
import { LeaveRequest, Employee } from '../App';

interface LeaveProps {
  requests: LeaveRequest[];
  setRequests: (requests: LeaveRequest[]) => void;
  employees: Employee[];
}

const Leave: React.FC<LeaveProps> = ({ requests, setRequests, employees }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState<Partial<LeaveRequest>>({
    employeeId: 0,
    type: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const filteredRequests = requests.filter(r => {
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesType = filterType === 'all' || r.type === filterType;
    return matchesStatus && matchesType;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'annual': return 'سالانه';
      case 'sick': return 'استعلاجی';
      case 'personal': return 'شخصی';
      case 'maternity': return 'زایمان';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'annual': return '🌴';
      case 'sick': return '🏥';
      case 'personal': return '🏠';
      case 'maternity': return '👶';
      default: return '📋';
    }
  };

  const handleApprove = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = employees.find(emp => emp.id === newRequest.employeeId);
    const days = Math.ceil(
      (new Date(newRequest.endDate || '').getTime() - new Date(newRequest.startDate || '').getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    const request: LeaveRequest = {
      id: Math.max(0, ...requests.map(r => r.id)) + 1,
      employeeId: newRequest.employeeId || 0,
      employeeName: employee?.name || '',
      type: newRequest.type as LeaveRequest['type'],
      startDate: newRequest.startDate || '',
      endDate: newRequest.endDate || '',
      days: days,
      status: 'pending',
      reason: newRequest.reason || '',
    };
    setRequests([...requests, request]);
    setShowModal(false);
    setNewRequest({ employeeId: 0, type: 'annual', startDate: '', endDate: '', reason: '' });
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">مدیریت مرخصی‌ها</h1>
          <p className="text-gray-500 mt-1">درخواست‌ها و مدیریت مرخصی کارکنان</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <span>➕</span>
          <span>درخواست مرخصی جدید</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          <p className="text-sm text-yellow-700 mt-1">در انتظار بررسی</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
          <p className="text-sm text-green-700 mt-1">تأیید شده</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          <p className="text-sm text-red-700 mt-1">رد شده</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">وضعیت</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="all">همه</option>
            <option value="pending">در انتظار</option>
            <option value="approved">تأیید شده</option>
            <option value="rejected">رد شده</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">نوع مرخصی</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="all">همه</option>
            <option value="annual">سالانه</option>
            <option value="sick">استعلاجی</option>
            <option value="personal">شخصی</option>
            <option value="maternity">زایمان</option>
          </select>
        </div>
      </div>

      {/* Leave Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                  {getTypeIcon(req.type)}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{req.employeeName}</p>
                  <p className="text-xs text-gray-500">{getTypeLabel(req.type)}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                req.status === 'approved' ? 'bg-green-100 text-green-700' :
                req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {req.status === 'approved' ? 'تأیید شده' : req.status === 'pending' ? 'در انتظار' : 'رد شده'}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">از تاریخ:</span>
                <span className="font-medium text-gray-700">{req.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">تا تاریخ:</span>
                <span className="font-medium text-gray-700">{req.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">مدت:</span>
                <span className="font-medium text-gray-700">{req.days} روز</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">دلیل:</span>
                <span className="font-medium text-gray-700">{req.reason}</span>
              </div>
            </div>
            {req.status === 'pending' && (
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  ✅ تأیید
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  ❌ رد
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500 shadow-sm border border-gray-100">
          <p className="text-4xl mb-3">📋</p>
          <p>درخواست مرخصی یافت نشد</p>
        </div>
      )}

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">درخواست مرخصی جدید</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">کارمند</label>
                <select
                  value={newRequest.employeeId || ''}
                  onChange={(e) => setNewRequest({ ...newRequest, employeeId: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  required
                >
                  <option value="">انتخاب کارمند...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع مرخصی</label>
                <select
                  value={newRequest.type || 'annual'}
                  onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value as LeaveRequest['type'] })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="annual">سالانه</option>
                  <option value="sick">استعلاجی</option>
                  <option value="personal">شخصی</option>
                  <option value="maternity">زایمان</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">از تاریخ</label>
                  <input
                    type="date"
                    value={newRequest.startDate || ''}
                    onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تا تاریخ</label>
                  <input
                    type="date"
                    value={newRequest.endDate || ''}
                    onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">دلیل مرخصی</label>
                <textarea
                  value={newRequest.reason || ''}
                  onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  ثبت درخواست
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;

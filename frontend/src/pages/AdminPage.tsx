import React, { useState, useEffect } from 'react';
import { Users, Settings, Activity, AlertCircle, TrendingUp, Zap, X } from 'lucide-react';
import Layout from '../components/common/Layout';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface SystemStat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const defaultUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@energywater.com', role: 'Admin', status: 'active', createdAt: '2025-10-01' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'active', createdAt: '2025-10-01' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Operator', status: 'active', createdAt: '2025-10-01' },
  { id: 4, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', createdAt: '2024-01-05' },
];

export const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('adminUsers');
    return saved ? JSON.parse(saved) : defaultUsers;
  });
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Sayfa ilk yüklendiğinde localStorage'ı varsayılan verilerle güncelle
  useEffect(() => {
    const saved = localStorage.getItem('adminUsers');
    if (!saved) {
      setUsers(defaultUsers);
      localStorage.setItem('adminUsers', JSON.stringify(defaultUsers));
    }
  }, []);

  // localStorage'a kaydet
  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
  };

  // Kullanıcıyı düzenle
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // Kullanıcıyı sil
  const handleDelete = (userId: number) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      saveUsers(updatedUsers);
    }
  };

  // Değişiklikleri kaydet
  const handleSaveUser = () => {
    if (editingUser) {
      const updatedUsers = users.map(u => u.id === editingUser.id ? editingUser : u);
      saveUsers(updatedUsers);
      setShowModal(false);
      setEditingUser(null);
    }
  };

  const stats: SystemStat[] = [
    {
      label: 'Toplam Kullanıcı',
      value: users.length.toString(),
      change: '+2 bu ay',
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: 'Aktif Sezyon',
      value: users.filter(u => u.status === 'active').length.toString(),
      change: '+1 son saatte',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      label: 'Sistem Statusu',
      value: 'Normal',
      change: '99.9% uptime',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      label: 'API Çağrıları',
      value: '2.4K',
      change: '+400 bu saatte',
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Paneli</h1>
          <p className="text-gray-400">Sistem yönetimi ve kullanıcı kontrolü</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-300 text-sm font-medium">{stat.label}</h3>
                <div className="text-blue-400">{stat.icon}</div>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-xs text-green-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Kullanıcı Yönetimi Bölümü */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-900 p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Kullanıcı Yönetimi</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Adı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rol</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Katılım Tarihi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 text-sm text-white font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {user.status === 'active' ? 'Aktif' : 'İnaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{user.createdAt}</td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-blue-400 hover:text-blue-300 mr-4 transition-colors"
                      >
                        Düzenle
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sistem Uyarıları */}
        <div className="mt-8 bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-200 mb-2">Sistem Uyarısı</h3>
              <p className="text-yellow-100 text-sm">
                Veritabanı yedekleme şu anda çalışıyor. Veritabanı üzerinde ağır işlemler yapmaktan kaçının.
              </p>
            </div>
          </div>
        </div>

        {/* Kullanıcı Düzenleme Modal */}
        {showModal && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Kullanıcıyı Düzenle</h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Adı</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rol</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Operator">Operator</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Durum</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">İnaktif</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveUser}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingUser(null);
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

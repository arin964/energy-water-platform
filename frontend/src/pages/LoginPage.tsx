import React, { useState } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@energywater.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Basit demo için - gerçek uygulamada backend'e istek yapılır
      if (email === 'admin@energywater.com' && password === 'admin123') {
        // Kullanıcı bilgilerini localStorage'a kaydet
        localStorage.setItem('user', JSON.stringify({
          email,
          name: 'Admin',
          role: 'admin',
          loginTime: new Date().toISOString(),
        }));
        // Ana sayfaya yönlendir
        window.location.href = '/';
      } else {
        setError('Email veya şifre yanlış');
      }
    } catch (err) {
      setError('Giriş sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <LogIn size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Enerji-Su Platform</h1>
          <p className="text-gray-400">AI Destekli Optimizasyon</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Giriş Yap</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Adresi
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="admin@energywater.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-600 bg-gray-700"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Beni hatırla
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
            <p className="text-blue-400 text-sm font-medium mb-2">Demo Bilgileri:</p>
            <p className="text-blue-300 text-xs">Email: admin@energywater.com</p>
            <p className="text-blue-300 text-xs">Şifre: admin123</p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Enerji-Su Yönetim Platformu - Tüm Hakları Saklıdır
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

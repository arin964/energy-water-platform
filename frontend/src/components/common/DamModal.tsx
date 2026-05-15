import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface DamFormData {
  name: string;
  location: string;
  capacity: number;
  currentLevel: number;
  inflow: number;
  outflow: number;
  latitude: number;
  longitude: number;
}

interface DamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DamFormData) => void;
  initialData?: DamFormData & { id?: number };
  isLoading?: boolean;
  title?: string;
}

const DamModal: React.FC<DamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  title = 'Yeni Baraj Ekle',
}) => {
  const [formData, setFormData] = useState<DamFormData>({
    name: '',
    location: '',
    capacity: 0,
    currentLevel: 0,
    inflow: 0,
    outflow: 0,
    latitude: 0,
    longitude: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        location: initialData.location,
        capacity: initialData.capacity,
        currentLevel: initialData.currentLevel,
        inflow: initialData.inflow,
        outflow: initialData.outflow,
        latitude: initialData.latitude,
        longitude: initialData.longitude,
      });
    } else {
      setFormData({
        name: '',
        location: '',
        capacity: 0,
        currentLevel: 0,
        inflow: 0,
        outflow: 0,
        latitude: 0,
        longitude: 0,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'location' ? value : parseFloat(value) || 0,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Baraj adı gerekli';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Konum gerekli';
    }
    if (formData.capacity <= 0) {
      newErrors.capacity = 'Kapasite 0 dan büyük olmalı';
    }
    if (formData.currentLevel < 0) {
      newErrors.currentLevel = 'Mevcut seviye negatif olamaz';
    }
    if (formData.currentLevel > formData.capacity) {
      newErrors.currentLevel = 'Mevcut seviye kapasiteyi aşamaz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Baraj Adı *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } text-white placeholder-gray-400 focus:outline-none focus:border-blue-500`}
                placeholder="örn: Keban Barajı"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Konum *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                  errors.location ? 'border-red-500' : 'border-gray-600'
                } text-white placeholder-gray-400 focus:outline-none focus:border-blue-500`}
                placeholder="örn: Elazığ"
              />
              {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kapasite (m³) *
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                  errors.capacity ? 'border-red-500' : 'border-gray-600'
                } text-white placeholder-gray-400 focus:outline-none focus:border-blue-500`}
                placeholder="50000"
              />
              {errors.capacity && <p className="text-red-400 text-sm mt-1">{errors.capacity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mevcut Seviye (m³)
              </label>
              <input
                type="number"
                name="currentLevel"
                value={formData.currentLevel}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                  errors.currentLevel ? 'border-red-500' : 'border-gray-600'
                } text-white placeholder-gray-400 focus:outline-none focus:border-blue-500`}
                placeholder="39000"
              />
              {errors.currentLevel && <p className="text-red-400 text-sm mt-1">{errors.currentLevel}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Giriş Akışı (m³/s)
              </label>
              <input
                type="number"
                name="inflow"
                value={formData.inflow}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="100"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Çıkış Akışı (m³/s)
              </label>
              <input
                type="number"
                name="outflow"
                value={formData.outflow}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="80"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enlem
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="39.5"
                step="0.0001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Boylam
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="39.5"
                step="0.0001"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DamModal;

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Job, JobType } from '../types';
import { CITIES } from '../constants';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (job: Job) => void;
}

const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose, onPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: CITIES[1], // Default to Toshkent
    salary: '',
    type: JobType.FULL_TIME,
    description: '',
    tags: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Date.now().toString(),
      title: formData.title,
      company: formData.company,
      location: formData.location,
      salary: formData.salary,
      type: formData.type,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      postedAt: new Date(),
      logoUrl: `https://picsum.photos/64/64?random=${Math.random()}`
    };
    onPost(newJob);
    onClose();
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: CITIES[1],
      salary: '',
      type: JobType.FULL_TIME,
      description: '',
      tags: ''
    });
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 dark:bg-gray-900 transition-opacity backdrop-blur-sm" onClick={onClose}></div>

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-200 dark:border-gray-800">
          
          <div className="bg-white dark:bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold leading-6 text-gray-900 dark:text-white" id="modal-title">
                Yangi ish e'lon qilish
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ish nomi</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                  placeholder="Masalan: Senior Designer"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kompaniya</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                    placeholder="Kompaniya nomi"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maosh</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                    placeholder="$1000 - $2000"
                    value={formData.salary}
                    onChange={e => setFormData({...formData, salary: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hudud</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all appearance-none"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  >
                    {CITIES.filter(c => c !== "Barcha hududlar").map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bandlik turi</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all appearance-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as JobType})}
                  >
                    {Object.values(JobType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teglar (vergul bilan)</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                    placeholder="React, Design, Marketing"
                    value={formData.tags}
                    onChange={e => setFormData({...formData, tags: e.target.value})}
                  />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Batafsil ma'lumot</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                 <button
                  type="button"
                  onClick={onClose}
                  className="w-full justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="w-full justify-center rounded-lg bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:opacity-90 transition-opacity"
                >
                  Joylash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobModal;
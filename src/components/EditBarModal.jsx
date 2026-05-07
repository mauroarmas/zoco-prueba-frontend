import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EditBarModal = ({ bar, categories = [], isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: '',
  });

  useEffect(() => {
    if (bar) {
      setFormData({
        name: bar.name || '',
        location: bar.location || '',
        category: bar.category || '',
      });
    }
  }, [bar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(bar.id, formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="glass-card w-full max-w-md p-6 relative bg-surface/90"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-md text-textMuted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">Editar Información</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Nombre</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Ubicación</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Categoría</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full appearance-none bg-black/30 border border-white/10 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#1a1b26] text-white">Seleccionar categoría...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-[#1a1b26] text-white">{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-textMuted">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-textMuted hover:text-white hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-purple-500 text-black hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

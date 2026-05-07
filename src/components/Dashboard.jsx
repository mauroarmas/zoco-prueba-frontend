import React, { useEffect, useState } from 'react';
import { barService } from '../services/api';
import { BarCard } from './BarCard';
import { EditBarModal } from './EditBarModal';
import { RefreshCw, Search, Activity, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);

  const fetchBars = async () => {
    try {
      setLoading(true);
      const data = await barService.getAllBars();
      setBars(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bars:', err);
      setError('No se pudieron cargar los datos del servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBars();
  }, []);

  const handleEditClick = (bar) => {
    setSelectedBar(bar);
    setIsModalOpen(true);
  };

  const handleSaveBar = async (id, updatedData) => {
    try {
      const updatedBar = await barService.updateBar(id, updatedData);
      setBars(bars.map(b => b.id === id ? { ...b, ...updatedBar } : b));
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error updating bar:', err);
      alert('Error al actualizar el bar');
    }
  };

  const handleDeleteBar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas desactivar este elemento?')) {
      try {
        await barService.deleteBar(id);
        // Optimistically update UI or fetch again
        setBars(bars.map(b => b.id === id ? { ...b, deletedAt: new Date().toISOString() } : b));
      } catch (err) {
        console.error('Error deleting bar:', err);
        alert('Error al desactivar el bar');
      }
    }
  };

  const handleTriggerScraping = async () => {
    const input = window.prompt('Ingresa el número de página para hacer el scraping (ej: 9):');
    if (input === null) return;
    
    const pageNumber = parseInt(input, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      alert('Por favor, ingresa un número entero válido mayor a 0.');
      return;
    }

    try {
      setLoading(true);
      await barService.triggerScraping(pageNumber);
      alert(`Se ha solicitado el scraping para la página ${pageNumber}.`);
      fetchBars();
    } catch (err) {
      console.error('Error triggering scraping:', err);
      alert('Hubo un error al solicitar el scraping.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(bars.map(bar => bar.category).filter(Boolean))].sort();

  const filteredBars = bars.filter(bar => {
    const matchesSearch = 
      bar.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bar.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bar.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory ? bar.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary animate-pulse" />
            <span className="text-gradient">ZOCO</span> Bares
          </h1>
          <p className="text-textMuted">Gestión de locales gastronómicos en Tucumán.</p>
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Buscar locales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-md"
            />
          </div>
          
          <div className="relative min-w-[160px] flex-1 md:flex-none">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-surface/50 border border-white/10 rounded-full pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-md cursor-pointer"
            >
              <option value="" className="bg-[#1a1b26] text-white">Todas las categorías</option>
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

          <button 
            onClick={fetchBars}
            className="p-2.5 rounded-full bg-surface/50 border border-white/10 text-primary hover:bg-primary/10 transition-colors backdrop-blur-md"
            title="Recargar datos"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleTriggerScraping}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-purple-500 text-black hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,240,255,0.3)] whitespace-nowrap"
          >
            Realizar Scrapping
          </button>
        </div>
      </div>

      {/* Content Area */}
      {error && (
        <div className="glass-card bg-red-500/10 border-red-500/20 p-4 mb-8 text-red-400 rounded-lg flex items-center justify-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredBars.length === 0 ? (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center">
          <Activity className="w-12 h-12 text-textMuted/50 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No se encontraron resultados</h3>
          <p className="text-textMuted">Intenta con otra búsqueda o espera a que el bot recolecte más datos.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredBars.map(bar => (
            <BarCard 
              key={bar.id} 
              bar={bar} 
              onEdit={handleEditClick}
              onDelete={handleDeleteBar}
            />
          ))}
        </motion.div>
      )}

      {/* Modal */}
      <EditBarModal 
        isOpen={isModalOpen}
        bar={selectedBar}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBar}
      />
    </div>
  );
};

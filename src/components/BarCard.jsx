import React from 'react';
import { Edit2, Trash2, MapPin, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const BarCard = ({ bar, onEdit, onDelete }) => {
  const isActive = bar.deletedAt === null || bar.deletedAt === undefined;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`glass-card p-6 relative group overflow-hidden ${!isActive ? 'opacity-60 grayscale' : ''}`}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-purple-500 rounded-l-2xl"></div>
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            {bar.name}
            {isActive ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
          </h3>
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {bar.category || 'Sin Categoría'}
          </span>
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          <button 
            onClick={() => onEdit(bar)}
            className="p-2 rounded-lg bg-surfaceHighlight hover:bg-primary/20 text-textMuted hover:text-primary transition-colors"
            title="Editar Bar"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {isActive && (
            <button 
              onClick={() => onDelete(bar.id)}
              className="p-2 rounded-lg bg-surfaceHighlight hover:bg-red-500/20 text-textMuted hover:text-red-400 transition-colors"
              title="Desactivar Bar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {bar.description && (
        <p className="text-sm text-textMuted mb-4 line-clamp-2" title={bar.description}>
          {bar.description}
        </p>
      )}

      <div className="space-y-2 text-sm text-textMuted mb-4">
        {bar.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span className="truncate">{bar.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary/70" />
          <span>Obtenido: {new Date(bar.scrapedAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-textMuted">
        <span>Fuente: <span className="text-white/70">{bar.source}</span></span>
        {bar.hash_identificador && (
          <span className="font-mono bg-black/30 px-2 py-1 rounded">
            ID: {bar.hash_identificador.substring(0, 8)}...
          </span>
        )}
      </div>
    </motion.div>
  );
};

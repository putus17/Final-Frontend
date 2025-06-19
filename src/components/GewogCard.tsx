import React from 'react';
import { Edit, Trash2, MapPin, Landmark } from 'lucide-react';
import type { DzongkhagType, GewogType } from '../types';

type Props = {
  gewog: GewogType;
  onEdit: (gewog: GewogType) => void;
  onDelete: (id: string) => void;
  getDzongkhagName: (dzongkhag: string | DzongkhagType) => string;
};

const GewogCard: React.FC<Props> = ({ gewog, onEdit, onDelete, getDzongkhagName }) => {
  return (
    
    <div className="rounded-3xl border border-gray-600 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 font-roboto">
      {/* Header */}
      <div className="flex flex-col gap-2 p-5 bg-gray-800/80 backdrop-blur-md rounded-t-3xl border-b border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-3xl font-montserrat text-cyan-400 drop-shadow-lg">{gewog.name}</h3>
            {gewog.nameInDzongkha && (
              <p className="text-sm text-cyan-300 italic font-semibold">{gewog.nameInDzongkha}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onEdit(gewog)}
              className="p-2 text-cyan-500 hover:bg-cyan-900 rounded-full transition"
              title="Edit"
              aria-label="Edit gewog"
            >
              <Edit className="w-6 h-6" />
            </button>
            <button
              onClick={() => onDelete(gewog._id!)}
              className="p-2 text-red-500 hover:bg-red-900 rounded-full transition"
              title="Delete"
              aria-label="Delete gewog"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 text-gray-300 font-roboto">
        <div className="flex justify-between items-center">
          <span className="text-cyan-400 font-semibold">Dzongkhag:</span>
          <span className="flex items-center gap-2 font-medium">
            <Landmark className="w-5 h-5 text-cyan-500" />
            {getDzongkhagName(gewog.dzongkhag)}
          </span>
        </div>

        {gewog.population && (
          <div className="flex justify-between">
            <span className="text-cyan-400 font-semibold">Population:</span>
            <span className="font-medium">{gewog.population.toLocaleString()}</span>
          </div>
        )}

        {gewog.area && (
          <div className="flex justify-between">
            <span className="text-cyan-400 font-semibold">Area:</span>
            <span className="font-medium">{gewog.area} km²</span>
          </div>
        )}

        {gewog.coordinates?.latitude && gewog.coordinates?.longitude && (
          <div className="flex items-center gap-2 pt-2 text-xs text-cyan-500 font-fira-mono">
            <MapPin className="w-5 h-5" />
            {gewog.coordinates.latitude.toFixed(4)}, {gewog.coordinates.longitude.toFixed(4)}
          </div>
        )}
      </div>
    </div>
  );
};

export default GewogCard;

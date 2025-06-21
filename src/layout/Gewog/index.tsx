import { useEffect, useState } from 'react';
import GewogCard from '../../components/GewogCard';
import GewogFormModal from '../../components/GewogForm';
import { getDzongkhagsApi } from '../../api/dzongkhagApi';
import { Plus, Search } from 'lucide-react';
import type { DzongkhagType, GewogType, GewogUpdateType } from '../../types';
import { useGewogStore } from '../../store/useGewogStore';

const GewogManagement = () => {
  const { gewogs, updateGewog, createGewog, deleteGewog, fetchGewogs } = useGewogStore();

  const [dzongkhags, setDzongkhags] = useState<DzongkhagType[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDzongkhag, setSelectedDzongkhag] = useState<string>('');
  const [formData, setFormData] = useState<Partial<GewogType>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchGewogs();
        const dzongkhagsRes = await getDzongkhagsApi();
        setDzongkhags(Array.isArray(dzongkhagsRes.data) ? dzongkhagsRes.data : []);
      } catch (err) {
        setError('Failed to load data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchGewogs]);

  const handleEdit = (gewog: GewogType) => {
    setFormData(gewog);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGewog(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && formData._id) {
        await updateGewog(formData._id, formData as GewogUpdateType);
      } else {
        await createGewog(formData as GewogUpdateType);
      }
      setIsModalOpen(false);
      setFormData({});
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredGewogs = gewogs.filter((g): g is GewogType => {
    if (!g || !g.name) return false;
    const nameMatch = g.name.toLowerCase().includes(search.toLowerCase());
    const dzongkhagMatch = selectedDzongkhag
      ? typeof g.dzongkhag === 'object'
        ? g.dzongkhag?._id === selectedDzongkhag
        : g.dzongkhag === selectedDzongkhag
      : true;
    return nameMatch && dzongkhagMatch;
  });

  const getDzongkhagName = (dzongkhag: string | DzongkhagType) =>
    typeof dzongkhag === 'string'
      ? dzongkhags.find((d) => d?._id === dzongkhag)?.name || 'Unknown'
      : dzongkhag?.name || 'Unknown';

  if (loading) return <div className="p-6 text-center text-gray-200">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
<div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-teal-600 p-6 text-white">

  {/* Redesigned Header */}
  <header className="max-w-6xl mx-auto mb-10 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/20 backdrop-blur-xl bg-white/10">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8">
      
      {/* Title and Subtitle */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-cyan-200">
          <svg className="w-7 h-7 text-cyan-400 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Gewog Management</h1>
        </div>
        <p className="text-sm text-cyan-100/90 font-light max-w-md leading-relaxed">
          Manage and explore gewogs in a sleek, organized dashboard interface. Add, edit, and view all in one place.
        </p>
      </div>
    </div>
  </header>


      {/* Controls */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-white opacity-80" />
          <input
            type="text"
            placeholder="Search Gewogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600
              text-white placeholder-white/70
              py-3 pl-11 pr-4
              font-medium
              shadow-lg shadow-cyan-700/40
              focus:outline-none focus:ring-2 focus:ring-cyan-300
              transition-all duration-300
            "
          />
        </div>

        {/* Dropdown */}
        <select
          value={selectedDzongkhag}
          onChange={(e) => setSelectedDzongkhag(e.target.value)}
          className="
            w-full lg:w-64
            rounded-xl
            bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600
            text-white font-semibold
            py-3 px-4
            shadow-lg shadow-cyan-700/40
            focus:outline-none focus:ring-2 focus:ring-cyan-300
            transition-all duration-300
            appearance-none
          "
        >
          <option value="" className="bg-white text-gray-800">All Dzongkhags</option>
          {dzongkhags.map((d) => (
            <option key={d._id} value={d._id} className="bg-white text-gray-800">
              {d.name}
            </option>
          ))}
        </select>

        {/* Add Button */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setFormData({});
          }}
          className="
            inline-flex items-center gap-2
            bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600
            hover:from-cyan-500 hover:to-indigo-500
            transition-all duration-300 ease-in-out
            rounded-xl px-6 py-3
            text-white font-semibold shadow-lg
            shadow-cyan-700/40 hover:shadow-cyan-500/40
          "
          type="button"
        >
          <Plus className="w-5 h-5" />
          Add Gewog
        </button>
      </div>

      {/* Gewog Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredGewogs.map((g) => (
          <GewogCard
            key={g._id}
            gewog={g}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getDzongkhagName={getDzongkhagName}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <GewogFormModal
          isEditing={isEditing}
          formData={formData}
          dzongkhags={dzongkhags}
          onChange={(field) => setFormData((prev) => ({ ...prev, ...field }))}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setFormData({});
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default GewogManagement;

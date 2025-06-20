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

  if (loading) return <div className="p-6 text-center text-gray-700">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
     <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-teal-600 p-6 text-white">
      {/* Glass Header */}
      <header className="max-w-7xl mx-auto mb-12 p-6 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg flex flex-col md:flex-row md:justify-between md:items-center border border-white/40">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide drop-shadow-sm">
            Gewog Management
          </h1>
          <p className="mt-1 text-gray-200 italic font-light max-w-md">
            A clean and simple interface to browse and manage your gewogs.
          </p>
        </div>
      
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Gewogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        {/* Dzongkhag Dropdown */}
        <select
          value={selectedDzongkhag}
          onChange={(e) => setSelectedDzongkhag(e.target.value)}
          className="w-full md:w-64 rounded-2xl border border-gray-300 bg-white py-3 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
        >
          <option value="">All Dzongkhags</option>
          {dzongkhags
            .filter((d) => d && d._id)
            .map((d) => (
              <option key={d._id} value={d._id} className="text-gray-800">
                {d.name}
              </option>
            ))}
        </select>

        {/* Add Gewog Button */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setFormData({});
          }}
          className="inline-flex items-center gap-3 bg-pink-400 hover:bg-pink-500 transition rounded-2xl px-7 py-3 font-bold text-white shadow-lg shadow-pink-300/70"
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

      {/* Modal Form */}
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

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RegionType } from '../lib/constants';
import type { DzongkhagUpdateType } from '../types';
import { motion } from 'framer-motion';

interface DzongkhagAddEditDialogProps {
  open: boolean;
  onClose: () => void;
  initialData: DzongkhagUpdateType | null;
  onAddOrUpdate: (dzongkhag: DzongkhagUpdateType) => void;
}

const defaultForm: DzongkhagUpdateType = {
  name: '',
  nameInDzongkha: '',
  code: '',
  area: 0,
  region: RegionType.Western,
  population: undefined,
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
};

export default function DzongkhagAddEditDialog({
  open,
  onClose,
  initialData,
  onAddOrUpdate,
}: DzongkhagAddEditDialogProps) {
  const [form, setForm] = useState<DzongkhagUpdateType>(defaultForm);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'latitude' || name === 'longitude') {
      const parsedValue = parseFloat(value) || 0;
      setForm((prev) => ({
        ...prev,
        coordinates: {
          latitude:
            name === 'latitude' ? parsedValue : prev.coordinates?.latitude ?? 0,
          longitude:
            name === 'longitude' ? parsedValue : prev.coordinates?.longitude ?? 0,
        },
      }));
    } else if (name === 'area' || name === 'population') {
      setForm((prev) => ({
        ...prev,
        [name]: value === '' ? 0 : parseFloat(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddOrUpdate(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-cyan-100/70 to-blue-200/50 backdrop-blur-lg border border-cyan-300/60 rounded-3xl shadow-2xl p-8 font-sans">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-3xl text-cyan-700 font-semibold drop-shadow-sm">
              {form.code ? 'Edit 🌊' : 'Add🌴'}
            </DialogTitle>
            <p className="text-cyan-600 text-sm italic">
              Capture the waves of detail below.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Name', name: 'name', type: 'text', value: form.name, placeholder: 'Thimphu' },
                { label: 'Name in Dzongkha', name: 'nameInDzongkha', type: 'text', value: form.nameInDzongkha, placeholder: 'ཐིམ་ཕུ་' },
                { label: 'Code', name: 'code', type: 'text', value: form.code, placeholder: 'TH01' },
                { label: 'Area (sq.km)', name: 'area', type: 'number', value: form.area, placeholder: '1234.56' },
                { label: 'Population', name: 'population', type: 'number', value: form.population ?? '', placeholder: '50000' },
                { label: 'Latitude', name: 'latitude', type: 'number', value: form.coordinates?.latitude ?? '', placeholder: '27.46' },
                { label: 'Longitude', name: 'longitude', type: 'number', value: form.coordinates?.longitude ?? '', placeholder: '89.64' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-blue-800 text-sm font-medium mb-1">{field.label}</label>
                  <Input
                    {...field}
                    onChange={handleChange}
                    className="rounded-lg border border-cyan-300 bg-white/60 text-cyan-900 focus:ring-2 focus:ring-cyan-500"
                    required={['name', 'code'].includes(field.name)}
                  />
                </div>
              ))}

              <div>
                <label className="block text-blue-800 text-sm font-medium mb-1">Region</label>
                <select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-cyan-300 p-2 bg-white/70 text-cyan-800 focus:ring-2 focus:ring-cyan-500"
                >
                  {Object.values(RegionType).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-cyan-500 text-cyan-700 hover:bg-cyan-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-cyan-600 text-white hover:bg-cyan-700 shadow-md"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

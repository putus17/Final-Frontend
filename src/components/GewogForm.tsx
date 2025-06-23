import React from 'react'
import type { DzongkhagType, GewogType } from '../types'

type Props = {
  isEditing: boolean
  formData: Partial<GewogType>
  dzongkhags: DzongkhagType[]
  onChange: (field: Partial<GewogType>) => void
  onSubmit: () => void
  onCancel: () => void
}

const GewogForm: React.FC<Props> = ({
  isEditing,
  formData,
  dzongkhags,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100/60 via-white/60 to-blue-200/70 backdrop-blur-md p-4 sm:p-6 overflow-auto">
      <div className="w-full max-w-md sm:max-w-3xl bg-white/90 shadow-2xl rounded-3xl border border-blue-100 overflow-hidden ring-1 ring-blue-300/20">

        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-blue-50 to-blue-100 border-b">
          <h2 className="text-lg sm:text-2xl font-bold text-blue-800">
            {isEditing ? '✏️ Edit Gewog' : '➕ Add New Gewog'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-600 mt-1">
            Please fill out the information below.
          </p>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {/* Name English */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Name (English)</label>
              <input
                type="text"
                placeholder="e.g., Chukha"
                value={formData.name || ''}
                onChange={(e) => onChange({ name: e.target.value })}
                className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Name Dzongkha */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Name (Dzongkha)</label>
              <input
                type="text"
                placeholder="ཆུ་ཁ་"
                value={formData.nameInDzongkha || ''}
                onChange={(e) => onChange({ nameInDzongkha: e.target.value })}
                className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Dzongkhag */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-violet-700 mb-1">Dzongkhag</label>
              <div className="relative">
                <select
                  value={typeof formData.dzongkhag === 'string' ? formData.dzongkhag : formData.dzongkhag?._id || ''}
                  onChange={(e) => onChange({ dzongkhag: e.target.value })}
                  className="peer w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm transition focus:border-violet-500 focus:ring-1 focus:ring-violet-400 focus:outline-none"
                >
                  <option value="">Select Dzongkhag</option>
                  {dzongkhags.map((dz) => (
                    <option key={dz._id} value={dz._id}>
                      {dz.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Population */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Population</label>
              <input
                type="number"
                placeholder="e.g., 3000"
                value={formData.population ?? ''}
                onChange={(e) =>
                  onChange({
                    population: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Area (sq. km)</label>
              <input
                type="number"
                placeholder="e.g., 120.5"
                value={formData.area ?? ''}
                onChange={(e) =>
                  onChange({
                    area: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Latitude */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Latitude</label>
              <input
                type="number"
                placeholder="e.g., 27.456"
                value={formData.coordinates?.latitude ?? ''}
                onChange={(e) =>
                  onChange({
                    coordinates: {
                      latitude: e.target.value ? parseFloat(e.target.value) : 0,
                      longitude: formData.coordinates?.longitude ?? 0,
                    },
                  })
                }
                className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Longitude */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Longitude</label>
              <input
                type="number"
                placeholder="e.g., 89.640"
                value={formData.coordinates?.longitude ?? ''}
                onChange={(e) =>
                  onChange({
                    coordinates: {
                      latitude: formData.coordinates?.latitude ?? 0,
                      longitude: e.target.value ? parseFloat(e.target.value) : 0,
                    },
                  })
                }
                className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 bg-blue-50 border-t border-blue-200 flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-4">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto rounded-xl px-5 py-2 text-sm font-medium text-blue-700 border border-blue-300 bg-white hover:bg-blue-100 transition shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="w-full sm:w-auto rounded-xl px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow"
          >
            {isEditing ? 'Update Gewog' : 'Create Gewog'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GewogForm

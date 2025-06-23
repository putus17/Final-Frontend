import { useEffect, useState } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { MapPin, Plus, Search } from 'lucide-react'
import { Input } from '../../components/ui/input'
import { RegionType } from '../../lib/constants'
import { getRegionBadgeColor } from '../../lib/utils'
import DzongkhagAddEditDialog from '../../components/DzongkhagAddEdit'
import { toast } from 'react-toastify'
import { useDzongkhagStore } from '../../store/useDzongkhagStore'
import type { DzongkhagUpdateType } from '../../types'
import DzongkhagList from '../../components/DzongkhagCard'
import { Button } from '../../components/ui/button'
import Loader from '../../components/Loader'

const Dzongkhag = () => {
  const {
    loading,
    dzongkhags,
    updateDzongkhag,
    createDzongkhag,
    deleteDzongkhag,
    fetchDzongkhags,
  } = useDzongkhagStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDzongkhag, setEditingDzongkhag] = useState<DzongkhagUpdateType | null>(null)

  useEffect(() => {
    fetchDzongkhags()
  }, [fetchDzongkhags])

  const regions = ['All', 'Western', 'Central', 'Southern', 'Eastern']

  const filteredDzongkhags = dzongkhags
    .filter((dzongkhag) => dzongkhag && typeof dzongkhag === 'object')
    .filter((dzongkhag) => {
      const matchesSearch =
        (dzongkhag.name?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
        (dzongkhag.code?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
      const matchesRegion =
        selectedRegion === 'All' || dzongkhag.region === selectedRegion
      return matchesSearch && matchesRegion
    })

  const regionStats = regions.slice(1).map((region) => {
    const regionDzongkhags = dzongkhags.filter(
      (d) => d && typeof d === 'object' && d.region === region
    )

    return {
      name: region,
      count: regionDzongkhags.length,
      population: regionDzongkhags.reduce(
        (sum, d) => sum + Number(d?.population ?? 0),
        0
      ),
      color: getRegionBadgeColor(region as RegionType),
    }
  })

  const formatNumber = (num: number | bigint) =>
    new Intl.NumberFormat().format(num)

  const handleAddOrUpdate = async (data: DzongkhagUpdateType) => {
    try {
      if (editingDzongkhag && editingDzongkhag._id) {
        await updateDzongkhag(editingDzongkhag._id, data)
        toast.success(`Updated: ${data.name}`)
      } else {
        await createDzongkhag(data)
        toast.success(`Created: ${data.name}`)
      }

      setDialogOpen(false)
      setEditingDzongkhag(null)
      await fetchDzongkhags()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Operation failed')
    }
  }

  const handleDeleteClick = async (id: string, name: string) => {
    try {
      await deleteDzongkhag(id)
      toast.success(`Deleted dzongkhag: ${name}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete dzongkhag')
    }
  }

  const onAddDzongkhagClick = () => {
    setEditingDzongkhag(null)
    setDialogOpen(true)
  }

  const onEditDzongkhag = (dzongkhags: DzongkhagUpdateType) => {
    setEditingDzongkhag(dzongkhags)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingDzongkhag(null)
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-teal-600 p-4 sm:p-6 text-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto p-4 sm:p-8 rounded-2xl bg-blue-900/70 backdrop-blur-md shadow-lg border border-teal-400">
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <svg className="h-10 w-10 sm:h-12 sm:w-12 text-teal-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C10 6 6 9 6 13a6 6 0 0012 0c0-4-4-7-6-11z" />
            </svg>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wider">
              འབྲུག་ཡུལ་གྱི་སྐྱོང་ཁུལ་རྫོང་ཁག་ཚུ།
            </h1>
          </div>
          <h2 className="text-lg sm:text-2xl font-semibold text-teal-300">
            Administrative Districts of Bhutan
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto text-teal-200/90">
            Bhutan is divided into 20 administrative districts known as dzongkhags...
          </p>
        </div>
      </div>

      {/* Region Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {regionStats.map((region) => (
          <Card key={region.name} className="bg-blue-800/60 border border-teal-400">
            <CardContent className="p-4 text-teal-100">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${region.color} shadow-md`} />
                <div>
                  <h3 className="font-semibold text-white">{region.name}</h3>
                  <p className="text-sm text-teal-200">{region.count} dzongkhags</p>
                  <p className="text-xs text-teal-300">
                    {formatNumber(region.population)} people
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-blue-900/70 border border-teal-400 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-300" />
          <Input
            placeholder="Search Dzongkhags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 py-2 rounded-lg border border-teal-400 text-teal-900 bg-teal-100"
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-start justify-center flex-1">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                selectedRegion === region
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <Button
          onClick={onAddDzongkhagClick}
          className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-teal-600 border-teal-600 bg-teal-50 hover:bg-teal-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Dzongkhag
        </Button>
      </div>

      {/* Dzongkhag Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredDzongkhags.map((dzongkhag) => (
          <div
            key={dzongkhag.code}
            className="relative group bg-blue-900/40 border border-teal-400 rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-50 transition duration-300 bg-teal-400 blur-xl mix-blend-screen pointer-events-none" />
            <DzongkhagList
              dzongkhagData={dzongkhag}
              onEditDzongkhag={onEditDzongkhag}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-to-r from-teal-600 to-blue-700 text-white mb-8">
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
          <div>
            <h3 className="text-2xl font-bold">{dzongkhags.length}</h3>
            <p className="text-teal-200">Total Dzongkhags</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{regionStats.length}</h3>
            <p className="text-teal-200">Administrative Regions</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              {formatNumber(
                dzongkhags.reduce((sum, d) => sum + Number(d?.population ?? 0), 0)
              )}
            </h3>
            <p className="text-teal-200">Total Population</p>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {searchTerm && filteredDzongkhags.length === 0 && (
        <div className="text-center py-10 text-teal-200">
          <MapPin className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-lg font-semibold">No dzongkhags found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <DzongkhagAddEditDialog
        open={dialogOpen}
        onClose={closeDialog}
        initialData={editingDzongkhag ?? null}
        onAddOrUpdate={handleAddOrUpdate}
      />
    </div>
  )
}

export default Dzongkhag

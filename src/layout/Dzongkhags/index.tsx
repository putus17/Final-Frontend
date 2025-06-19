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
import DzongkhagList from '../../components/DzongkhagLists'
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

  if (loading) {
    return <Loader />
  }

  return (
     <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-teal-600 p-6 text-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto p-10 rounded-3xl bg-blue-900/70 backdrop-blur-md shadow-lg border border-teal-400">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <svg
              className="h-12 w-12 text-teal-300 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C10 6 6 9 6 13a6 6 0 0012 0c0-4-4-7-6-11z" />
            </svg>
            <h1 className="text-4xl font-extrabold tracking-wider drop-shadow-lg">
           འབྲུག་ཡུལ་གྱི་སྐྱོང་ཁུལ་རྫོང་ཁག་ཚུ།
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-300 drop-shadow-sm">
        Administrative Districts of Bhutan
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-teal-200/90">
         Bhutan is divided into 20 administrative districts known as dzongkhags. Each dzongkhag serves as a vital unit of governance and community life, reflecting the country’s deep-rooted traditions and vibrant heritage. These districts are not only administrative hubs but also custodians of Bhutan’s unique cultural identity, preserving centuries-old monasteries, festivals, and local customs. Beyond their cultural significance, the dzongkhags are nestled within breathtaking landscapes—ranging from lush valleys and rolling hills to towering mountains and pristine forests—making each district a remarkable destination that showcases Bhutan’s natural beauty alongside its historical and spiritual wealth.
          </p>
        </div>
      </div>

      {/* Region Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
        {regionStats.map((region) => (
          <Card
            key={region.name}
            className="hover:shadow-lg transition-all duration-300 bg-blue-800/60 border border-teal-400"
          >
            <CardContent className="p-6 text-teal-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full ${region.color} shadow-md`}
                ></div>
                <div className="flex-1">
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

      {/* Search and Filter */}
      <div className="bg-blue-900/70 backdrop-blur-sm border border-teal-400 p-6 rounded-2xl shadow-md space-y-6 md:space-y-0 md:flex md:items-center md:justify-between flex-wrap gap-4 mb-8">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-300" />
          <Input
            placeholder="Search Dzongkhags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-teal-400 focus:ring-2 focus:ring-teal-500 text-teal-900 bg-teal-100 shadow-sm"
          />
        </div>

        {/* Region Buttons */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start flex-1">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                selectedRegion === region
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <div className="w-full md:w-auto">
          <Button
            onClick={onAddDzongkhagClick}
            variant="outline"
            className="w-full md:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-teal-600 border-teal-600 bg-teal-50 hover:bg-teal-200 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Dzongkhag
          </Button>
        </div>
      </div>

      {/* Dzongkhags Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDzongkhags.map((dzongkhag) => (
          <div
            key={dzongkhag.code}
            className="relative group bg-blue-900/40 backdrop-blur-lg border border-teal-400 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none bg-teal-400 blur-xl mix-blend-screen"></div>
            <DzongkhagList
              dzongkhagData={dzongkhag}
              onEditDzongkhag={onEditDzongkhag}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-to-r from-teal-600 to-blue-700 text-white mb-8 shadow-lg">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold">{dzongkhags?.length}</h3>
              <p className="text-teal-200">Total Dzongkhags</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{regionStats.length}</h3>
              <p className="text-teal-200">Administrative Regions</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">
                {formatNumber(
                  (dzongkhags ?? []).reduce((sum, d) => sum + Number(d?.population ?? 0), 0)
                )}
              </h3>
              <p className="text-teal-200">Total Population</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {searchTerm && filteredDzongkhags.length === 0 && (
        <div className="text-center py-12 text-teal-200">
          <MapPin className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No dzongkhags found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Add/Edit Dialog remains unchanged */}
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
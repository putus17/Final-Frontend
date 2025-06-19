import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import {
  MapPin,
  Users,
  Mountain,
  Hash,
  Pencil,
  Trash2,
  Eye,
} from 'lucide-react';
import { getRegionBadgeColor } from '../lib/utils';
import type { RegionType } from '../lib/constants';
import { Button } from './ui/button';
import type { DzongkhagType, DzongkhagUpdateType } from '../types';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

type DzongkhagProps = {
  onEditDzongkhag: (dzongkhag: DzongkhagUpdateType) => void;
  handleDeleteClick: (id: string, name: string) => Promise<void>;
  dzongkhagData: DzongkhagType;
};

const DzongkhagCard = ({
  onEditDzongkhag,
  handleDeleteClick,
  dzongkhagData,
}: DzongkhagProps) => {
  const [open, setOpen] = useState(false);

  const formatNumber = (num: number | bigint) =>
    new Intl.NumberFormat().format(num);

  const formatDate = (dateString: string | number | Date) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="w-full bg-gradient-to-br from-cyan-900 via-cyan-950 to-sky-900/80 border border-cyan-700 rounded-3xl text-white backdrop-blur-md shadow-xl p-5 space-y-5">
        <CardHeader className="flex justify-between items-start border-b border-cyan-700 pb-3">
          <div>
            <CardTitle className="text-2xl font-bold flex gap-2 items-center text-cyan-100">
              <Mountain className="h-6 w-6 text-cyan-300" />
              {dzongkhagData.name}
            </CardTitle>
            <p className="text-sm text-cyan-200 italic">{dzongkhagData.nameInDzongkha}</p>
          </div>
          <Badge
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${getRegionBadgeColor(
              dzongkhagData.region as RegionType
            )}`}
          >
            {dzongkhagData.region}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-5 text-sm text-cyan-200">
            <div className="space-y-2">
              <p>
                <Hash className="inline w-4 h-4 text-cyan-400 mr-1" />
                <span className="font-medium">Code:</span> <strong>{dzongkhagData.code}</strong>
              </p>
              <p>
                <Users className="inline w-4 h-4 text-emerald-300 mr-1" />
                <span className="font-medium">Population:</span> <strong>{formatNumber(dzongkhagData.population)}</strong>
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <Mountain className="inline w-4 h-4 text-indigo-300 mr-1" />
                <span className="font-medium">Area:</span> <strong>{formatNumber(dzongkhagData.area)} km²</strong>
              </p>
              <p>
                <MapPin className="inline w-4 h-4 text-blue-300 mr-1" />
                <span className="font-medium">Coordinates:</span>{' '}
                <strong>
                  {dzongkhagData.coordinates?.latitude}°N, {dzongkhagData.coordinates?.longitude}°E
                </strong>
              </p>
            </div>
          </div>

          <Card>
  <CardContent className="flex flex-col space-y-4">
    {/* Main content above here, if any */}

    {/* Footer section with dates centered */}
    <div className="text-center text-xs text-cyan-300">
      <p>Created: {formatDate(dzongkhagData.createdAt)}</p>
      <p>Updated: {formatDate(dzongkhagData.updatedAt)}</p>
    </div>

    {/* Action buttons aligned vertically on the right */}
    <div className="flex justify-end space-x-0 space-y-2 flex-col items-end">
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-cyan-200 hover:bg-cyan-800/40 w-full flex justify-center"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      </DialogTrigger>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onEditDzongkhag(dzongkhagData)}
        className="border-cyan-500 text-cyan-300 hover:bg-cyan-800/50 w-full flex justify-center"
      >
        <Pencil className="w-4 h-4 mr-1" />
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleDeleteClick(dzongkhagData._id, dzongkhagData.name)}
        className="w-full flex justify-center"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Delete
      </Button>
    </div>
  </CardContent>
</Card>


      {/* Modal content */}
      <DialogContent className="max-w-3xl bg-gradient-to-br from-sky-950 to-cyan-900 border border-cyan-700 text-white p-6 space-y-4 rounded-3xl backdrop-blur-md shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-cyan-100">
            <Mountain className="w-5 h-5 text-cyan-400" />
            Detailed View – {dzongkhagData.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-cyan-300 leading-snug"
>
          <p><strong>Dzongkha Name:</strong> {dzongkhagData.nameInDzongkha}</p>
          <p><strong>Population:</strong> {formatNumber(dzongkhagData.population)}</p>
          <p><strong>Area:</strong> {formatNumber(dzongkhagData.area)} km²</p>
          <p><strong>Coordinates:</strong> {dzongkhagData.coordinates?.latitude}°N, {dzongkhagData.coordinates?.longitude}°E</p>
          <p><strong>Region:</strong> {dzongkhagData.region}</p>
        </div>
      </DialogContent>
      </CardContent>
    </Card>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-cyan-400 hover:bg-cyan-600 to-black hover:text-white rounded-md transition">

          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}

export default DzongkhagCard;

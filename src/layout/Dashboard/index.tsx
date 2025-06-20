import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Droplets,
  AlertTriangle,
  TrendingUp,
  Gauge,
  CheckCircle,
  MapPin,
  Clock,
} from 'lucide-react';
import { dailyConsumption, leakAlerts, waterSources, waterTanks } from '../../data';

const CHART_COLORS = ['#1e3a8a', '#14b8a6', '#f97316', '#3b82f6', '#64748b'];

const getTankStatusIcon = (level: number) => {
  if (level > 70) return '';
  if (level > 40) return '';
  return '';
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-600 text-white border-red-800';
    case 'medium':
      return 'bg-yellow-400 text-black border-yellow-600';
    case 'low':
      return 'bg-green-400 text-black border-green-600';
    default:
      return 'bg-gray-500 text-white border-gray-700';
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a8a] via-[#0f766e] to-[#1e3a8a] p-8 text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center gap-4 bg-[#0f766e]/80 backdrop-blur-md rounded-3xl px-6 py-4 shadow-lg border border-[#f1f5f9]/30">
            <div className="p-4 rounded-full bg-gradient-to-br from-cyan-900 to-teal-600 shadow-lg">
              <Droplets className="h-10 w-10 text-[#f97316]" />
            </div>
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              DWAS Dashboard
            </h1>
          </div>
          <p className="max-w-3xl mx-auto text-[#f1f5f9]/90 text-lg font-light leading-relaxed">
            Dive deep into data — <strong className="font-semibold text-[#f97316]">DWAS</strong> keeping water clear and insights flowing.
            <br />
            <span className="italic text-orange-400 text-xl mt-4 block">Silent streams, smart signals..</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-[#f1f5f9] text-sm font-semibold">
          {[{
            icon: <CheckCircle className="w-6 h-6 text-[#f97316]" />, text: 'Real-Time Monitoring Enabled', style: 'bg-slate-700 bg-opacity-90 border border-slate-500',
          }, {
            icon: <MapPin className="w-6 h-6 text-[#f97316]" />, text: 'Region: Bhutan', style: 'bg-slate-800 bg-opacity-90 border border-slate-600',
          }, {
            icon: <Clock className="w-6 h-6 text-[#f97316]" />, text: `Last Sync: ${new Date().toLocaleTimeString()}`, style: 'bg-slate-700 bg-opacity-80 border border-slate-500',
          }].map(({ icon, text, style }, i) => (
            <div key={i} className={`flex items-center gap-3 px-6 py-3 rounded-full cursor-default select-none ${style} hover:scale-[1.05] transition-transform duration-300`}>
              {icon}<span className="tracking-wide">{text}</span>
            </div>
          ))}
        </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[{
    title: "Today’s Usage",
    value: '1,820L',
    icon: <Gauge className="h-10 w-10 text-orange-400" />,
    border: 'border-orange-400',
  }, {
    title: "Active Alerts",
    value: '2',
    icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
    border: 'border-red-500',
  }, {
    title: "System Efficiency",
    value: '92%',
    icon: <TrendingUp className="h-10 w-10 text-green-400" />,
    border: 'border-green-400',
  }].map(({ title, value, icon, border }, i) => (
    <Card key={i} className={`rounded-2xl border-l-4 ${border} bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors duration-300 shadow-md`}>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-full">
            {icon}
          </div>
          <div>
            <p className="text-sm text-slate-300">{title}</p>
            <p className="text-2xl font-semibold text-white">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3 drop-shadow-lg text-[#f97316]">
            <Droplets className="w-7 h-7" /> Tank Status Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {waterTanks.map((tank) => (
              <Card key={tank.id} className="bg-slate-800/70 border border-slate-600 rounded-3xl shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-[1.04] transition-transform duration-300 cursor-default">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center text-[#f1f5f9] text-lg font-semibold drop-shadow-md">
                    {tank.id}
                    <span className="text-2xl">{getTankStatusIcon(tank.level)}</span>
                  </CardTitle>
                  <p className="text-slate-400 text-sm opacity-90">{tank.location}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-[#f97316] drop-shadow-xl">{tank.level}%</p>
                    <p className="text-sm text-slate-400 opacity-90">
                      {Math.round(tank.capacity * tank.level / 100)} / {tank.capacity}L
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-700 shadow-md" style={{ width: `${tank.level}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-mono tracking-wider">
                      <span>0%</span><span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <Card className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 font-semibold drop-shadow-md text-[#f97316]">
                <TrendingUp className="h-6 w-6" /> Daily Water Consumption & Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyConsumption}>
                  <defs>
                    <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} stroke="#f1f5f9" />
                  <YAxis axisLine={false} tickLine={false} stroke="#f1f5f9" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f766e', borderRadius: 12, border: 'none', color: '#f1f5f9' }} />
                  <Area type="monotone" dataKey="liters" stroke="#f97316" strokeWidth={2} fill="url(#consumptionGradient)" />
                  <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 font-semibold drop-shadow-md text-[#f97316]">
                <Droplets className="h-6 w-6" /> Water Source Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={waterSources}
                    dataKey="percentage"
                    nameKey="source"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={2}
                    label={({ source, percentage }) => `${source}: ${percentage}%`}
                  >
                    {waterSources.map((_entry, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f766e', borderRadius: 12, border: 'none', color: '#f1f5f9' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 font-semibold drop-shadow-md text-red-400">
              <AlertTriangle className="h-6 w-6" /> Recent System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-[#f1f5f9]">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left p-4">Time</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Location</th>
                    <th className="text-left p-4">Severity</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leakAlerts.map((alert, index) => (
                    <tr key={alert.id} className={`${index % 2 ? 'bg-slate-800/40' : 'bg-slate-700/25'} hover:bg-orange-400/20 transition-colors duration-300 cursor-default`}>
                      <td className="p-4 font-mono">{new Date(alert.time).toLocaleString()}</td>
                      <td className="p-4 font-semibold">{alert.type}</td>
                      <td className="p-4 text-[#f97316]">{alert.location}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alert.status === 'Resolved'
                            ? 'bg-green-500 text-green-900 border border-green-600'
                            : alert.status === 'Active'
                            ? 'bg-red-600 text-red-900 border border-red-700'
                            : 'bg-yellow-500 text-yellow-900 border border-yellow-700'
                        }`}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

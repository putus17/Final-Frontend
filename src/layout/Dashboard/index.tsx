import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
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
import { Droplets, AlertTriangle, TrendingUp, Gauge, CheckCircle, MapPin, Clock } from 'lucide-react';
import { dailyConsumption, leakAlerts, waterSources, waterTanks } from '../../data';

const MIDNIGHT_REEF_COLORS = [
  '#0b1d3a', // Midnight navy
  '#05575f', // Deep teal
  '#ff6f61', // Coral pink
  '#6c4b7c', // Soft purple
  '#e0f7fa', // Glow white
];

export default function DashboardHome() {

  const getTankStatusIcon = (level: number) => {
    if (level > 70) return '🐠'; // vibrant fish
    if (level > 40) return '🦀'; // crab
    return '🐚'; // shell
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-800 text-red-100 border-red-900';
      case 'medium': return 'bg-orange-700 text-orange-100 border-orange-800';
      case 'low': return 'bg-yellow-600 text-yellow-900 border-yellow-700';
      default: return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1d3a] via-[#05575f] to-[#0b1d3a] p-8 text-[#e0f7fa]">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center gap-4 bg-[#05575f]/80 backdrop-blur-md rounded-3xl px-6 py-4 shadow-lg border border-[#e0f7fa]/30">
            <div className="p-4 rounded-full bg-gradient-to-br from-teal-900 to-teal-700 shadow-md">
              <Droplets className="h-10 w-10 text-[#ff6f61]" />
            </div>
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Druk Water Authority System (DWAS)
            </h1>
          </div>
          <p className="max-w-3xl mx-auto text-[#e0f7fa]/90 text-lg font-light leading-relaxed drop-shadow-sm">
            Dive deep into data — <strong className="font-semibold text-[#ff6f61]">DWAS</strong>  keeping water clear and insights flowing.
            <br />
            <span className="italic text-[#e9580f] text-xl mt-4 block">Silent streams, smart signals..</span>
          </p>
        </div>

        {/* Status Bar */}
        <div className="flex flex-wrap justify-center gap-6 text-[#e0f7fa] text-sm font-semibold">
          {[{
            icon: <CheckCircle className="w-6 h-6 text-[#ff6f61]" />,
            text: 'Real-Time Monitoring Enabled',
            style: 'bg-[#05575f] bg-opacity-90 border border-[#0b1d3a] shadow-md',
          }, {
            icon: <MapPin className="w-6 h-6 text-[#ff6f61]" />,
            text: 'Region: Bhutan',
            style: 'bg-[#0b1d3a] bg-opacity-90 border border-[#05575f] shadow-md',
          }, {
            icon: <Clock className="w-6 h-6 text-[#ff6f61]" />,
            text: `Last Sync: ${new Date().toLocaleTimeString()}`,
            style: 'bg-[#05575f] bg-opacity-80 border border-[#0b1d3a] shadow-md',
          }].map(({ icon, text, style }, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-6 py-3 rounded-full cursor-default select-none ${style} hover:scale-[1.05] transition-transform duration-300`}
            >
              {icon}
              <span className="tracking-wide">{text}</span>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            title: "Today’s Usage",
            value: '1,820L',
            icon: <Gauge className="h-10 w-10 text-[#ff6f61]" />,
            bg: 'bg-gradient-to-br from-[#05575f] to-[#0b1d3a]',
          }, {
            title: "Active Alerts",
            value: '2',
            icon: <AlertTriangle className="h-10 w-10 text-red-600" />,
            bg: 'bg-gradient-to-br from-red-800 to-red-600',
          }, {
            title: "System Efficiency",
            value: '92%',
            icon: <TrendingUp className="h-10 w-10 text-[#ff6f61]" />,
            bg: 'bg-gradient-to-br from-[#0b1d3a] to-[#05575f]',
          }].map(({ title, value, icon, bg }, i) => (
            <Card
              key={i}
              className={`${bg} rounded-2xl shadow-lg backdrop-blur-md border border-[#05575f] cursor-default hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm opacity-90">{title}</p>
                  <h2 className="text-3xl font-bold tracking-wide">{value}</h2>
                </div>
                {icon}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tank Levels */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3 drop-shadow-lg text-[#ff6f61]">
            <Droplets className="w-7 h-7" />
            Tank Status Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {waterTanks.map((tank) => (
              <Card
                key={tank.id}
                className="bg-[#05575f]/70 border border-[#0b1d3a] rounded-3xl shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-[1.04] transition-transform duration-300 cursor-default"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center text-[#e0f7fa] text-lg font-semibold drop-shadow-md">
                    {tank.id}
                    <span className="text-2xl">{getTankStatusIcon(tank.level)}</span>
                  </CardTitle>
                  <p className="text-[#6c4b7c] text-sm opacity-90">{tank.location}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold drop-shadow-lg">{tank.level}%</p>
                    <p className="text-sm text-[#6c4b7c] opacity-90">
                      {Math.round(tank.capacity * tank.level / 100)} / {tank.capacity}L
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-[#0b1d3a] rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r from-[#05575f] to-[#0b1d3a] rounded-full transition-all duration-700 shadow-md`}
                        style={{ width: `${tank.level}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#6c4b7c] font-mono tracking-wider">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Area Chart */}
          <Card className="bg-[#05575f]/70 backdrop-blur-sm border border-[#0b1d3a] shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 font-semibold drop-shadow-md text-[#ff6f61]">
                <TrendingUp className="h-6 w-6" />
                Daily Water Consumption & Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyConsumption}>
                  <defs>
                    <linearGradient id="midnightReefConsumptionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#05575f" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#0b1d3a" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} stroke="#e0f7fa" />
                  <YAxis axisLine={false} tickLine={false} stroke="#e0f7fa" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#05575f', borderRadius: 12, border: 'none', color: '#e0f7fa' }}
                  />
                  <Area type="monotone" dataKey="liters" stroke="#ff6f61" strokeWidth={2} fill="url(#midnightReefConsumptionGradient)" />
                  <Line type="monotone" dataKey="efficiency" stroke="#6c4b7c" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-[#05575f]/70 backdrop-blur-sm border border-[#0b1d3a] shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3 font-semibold drop-shadow-md text-[#ff6f61]">
                <Droplets className="h-6 w-6" />
                Water Source Distribution
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
                      <Cell key={index} fill={MIDNIGHT_REEF_COLORS[index % MIDNIGHT_REEF_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#05575f', borderRadius: 12, border: 'none', color: '#e0f7fa' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Table */}
        <Card className="bg-[#05575f]/70 backdrop-blur-sm border border-[#0b1d3a] shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 font-semibold drop-shadow-md text-red-400">
              <AlertTriangle className="h-6 w-6" />
              Recent System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-[#e0f7fa]">
                <thead>
                  <tr className="border-b border-[#0b1d3a]">
                    <th className="text-left p-4">Time</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Location</th>
                    <th className="text-left p-4">Severity</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leakAlerts.map((alert, index) => (
                    <tr
                      key={alert.id}
                      className={`${index % 2 ? 'bg-[#6c4b7c]/30' : 'bg-[#05575f]/25'} hover:bg-[#ff6f61]/20 transition-colors duration-300 cursor-default`}
                    >
                      <td className="p-4 font-mono">{new Date(alert.time).toLocaleString()}</td>
                      <td className="p-4 font-semibold">{alert.type}</td>
                      <td className="p-4 text-[#ff6f61]">{alert.location}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            alert.status === 'Resolved'
                              ? 'bg-emerald-500 text-emerald-900 border border-emerald-600'
                              : alert.status === 'Active'
                              ? 'bg-red-600 text-red-900 border border-red-700'
                              : 'bg-yellow-600 text-yellow-900 border border-yellow-700'
                          }`}
                        >
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

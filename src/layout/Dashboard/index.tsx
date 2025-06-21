// unchanged imports
import {
  Card, CardContent, CardHeader, CardTitle,
} from '../../components/ui/card';
import {
  Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import {
  Droplets, AlertTriangle, TrendingUp, Gauge, CheckCircle, MapPin, Clock,
} from 'lucide-react';
import { dailyConsumption, leakAlerts, waterSources, waterTanks } from '../../data';

const CHART_COLORS = ['#1e3a8a', '#14b8a6', '#f97316', '#3b82f6', '#64748b'];

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
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a8a] via-[#0f766e] to-[#1e3a8a] px-3 py-4 sm:px-6 md:px-8 text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-[#0f766e]/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-[#f1f5f9]/30">
            <div className="p-3 rounded-full bg-gradient-to-br from-cyan-900 to-teal-600 shadow-lg">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-[#f97316]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-lg">DWAS Dashboard</h1>
          </div>
          <p className="text-sm max-w-xs sm:max-w-md mx-auto text-[#f1f5f9]/90 font-light leading-relaxed">
            Dive deep into data — <strong className="font-semibold text-[#f97316]">DWAS</strong> keeping water clear and insights flowing.
            <br />
            <span className="italic text-orange-400 text-sm mt-1 block">Silent streams, smart signals..</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 text-sm font-semibold">
          {[{
            icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#f97316]" />, text: 'Real-Time Monitoring',
          }, {
            icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#f97316]" />, text: 'Region: Bhutan',
          }, {
            icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#f97316]" />, text: `Last Sync: ${new Date().toLocaleTimeString()}`,
          }].map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-700/70 border border-slate-500 shadow text-white hover:scale-[1.03] transition">
              {icon}<span>{text}</span>
            </div>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[{
            title: "Today’s Usage",
            value: '1,820L',
            icon: <Gauge className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />,
            border: 'border-orange-400',
          }, {
            title: "Active Alerts",
            value: '2',
            icon: <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />,
            border: 'border-red-500',
          }, {
            title: "System Efficiency",
            value: '92%',
            icon: <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />,
            border: 'border-green-400',
          }].map(({ title, value, icon, border }, i) => (
            <Card key={i} className={`border-l-4 ${border} bg-white/5 backdrop-blur-md rounded-xl`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-full">{icon}</div>
                <div>
                  <p className="text-xs text-slate-300">{title}</p>
                  <p className="text-lg sm:text-xl font-semibold text-white">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tank Status */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-[#f97316]">
            <Droplets className="w-5 h-5 sm:w-6 sm:h-6" /> Tank Status Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {waterTanks.map((tank) => (
              <Card key={tank.id} className="bg-slate-800/70 border border-slate-600 rounded-2xl hover:scale-[1.03] transition">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between text-white text-sm sm:text-base font-medium">
                    {tank.id}
                  </CardTitle>
                  <p className="text-slate-400 text-xs">{tank.location}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#f97316]">{tank.level}%</p>
                    <p className="text-xs text-slate-400">
                      {Math.round(tank.capacity * tank.level / 100)} / {tank.capacity}L
                    </p>
                  </div>
                  <div>
                    <div className="h-2 sm:h-3 w-full bg-slate-700 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-700"
                        style={{ width: `${tank.level}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>0%</span><span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Consumption Area Chart */}
          <Card className="bg-slate-800/70 border border-slate-600 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-[#f97316]">
                <TrendingUp className="w-5 h-5" /> Daily Consumption & Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={dailyConsumption}>
                  <defs>
                    <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#f1f5f9" />
                  <YAxis stroke="#f1f5f9" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f766e', borderRadius: 12 }} />
                  <Area type="monotone" dataKey="liters" stroke="#f97316" fill="url(#consumptionGradient)" />
                  <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-slate-800/70 border border-slate-600 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-[#f97316]">
                <Droplets className="w-5 h-5" /> Water Source Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={waterSources}
                    dataKey="percentage"
                    nameKey="source"
                    cx="50%" cy="50%"
                    outerRadius={80}
                    innerRadius={30}
                    paddingAngle={2}
                    label={({ source, percentage }) => `${source}: ${percentage}%`}
                  >
                    {waterSources.map((_entry, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f766e', borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Table */}
        <Card className="bg-slate-800/70 border border-slate-600 rounded-2xl overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" /> Recent System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-xs sm:text-sm min-w-[600px] text-left text-[#f1f5f9]">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="p-2">Time</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Severity</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leakAlerts.map((alert, index) => (
                  <tr key={alert.id} className={`${index % 2 ? 'bg-slate-700/30' : 'bg-slate-700/10'} hover:bg-orange-400/20`}>
                    <td className="p-2">{new Date(alert.time).toLocaleString()}</td>
                    <td className="p-2">{alert.type}</td>
                    <td className="p-2 text-[#f97316]">{alert.location}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'Resolved' ? 'bg-green-500 text-green-900 border border-green-600'
                        : alert.status === 'Active' ? 'bg-red-600 text-red-100 border border-red-700'
                        : 'bg-yellow-500 text-yellow-900 border border-yellow-700'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

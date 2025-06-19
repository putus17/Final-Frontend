// Mock data to match the original structure
export const waterTanks = [
  { id: 'Tank A', level: 85, capacity: 5000, location: 'North District' },
  { id: 'Tank B', level: 62, capacity: 3500, location: 'Central District' },
  { id: 'Tank C', level: 94, capacity: 4200, location: 'South District' },
  { id: 'Tank D', level: 38, capacity: 2800, location: 'East District' },
];

export const dailyConsumption = [
  { date: 'Mon', liters: 3200, efficiency: 92 },
  { date: 'Tue', liters: 2900, efficiency: 88 },
  { date: 'Wed', liters: 3400, efficiency: 95 },
  { date: 'Thu', liters: 3100, efficiency: 89 },
  { date: 'Fri', liters: 3600, efficiency: 91 },
  { date: 'Sat', liters: 2800, efficiency: 94 },
  { date: 'Sun', liters: 2600, efficiency: 96 }
];

export const waterSources = [
  { source: 'Municipal', percentage: 45, color: '#3b82f6' },
  { source: 'Well Water', percentage: 30, color: '#06b6d4' },
  { source: 'Rainwater', percentage: 15, color: '#10b981' },
  { source: 'Recycled', percentage: 10, color: '#8b5cf6' }
];

export const leakAlerts = [
  { id: 1, time: new Date().toISOString(), type: 'Minor Leak', location: 'Pipeline A-3', status: 'Active', severity: 'medium' },
  { id: 2, time: new Date(Date.now() - 3600000).toISOString(), type: 'Pressure Drop', location: 'Tank B Outlet', status: 'Investigating', severity: 'high' },
  { id: 3, time: new Date(Date.now() - 7200000).toISOString(), type: 'Flow Anomaly', location: 'Main Distribution', status: 'Resolved', severity: 'low' },
  { id: 4, time: new Date(Date.now() - 10800000).toISOString(), type: 'Valve Malfunction', location: 'Sector 7', status: 'Resolved', severity: 'medium' }
];

export const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6'];


export const dzongkhags = [
  // Western Region
  { name: "Chhukha", code: "CH", region: "Western", dzongkha: "ཆུ་ཁ་", capital: "Phuentsholing", elevation: "300m", population: 76700 },
  { name: "Haa", code: "HA", region: "Western", dzongkha: "ཧཱ་", capital: "Haa", elevation: "2670m", population: 13000 },
  { name: "Paro", code: "PA", region: "Western", dzongkha: "སྤ་གྲོ་", capital: "Paro", elevation: "2200m", population: 44500 },
  { name: "Samtse", code: "ST", region: "Western", dzongkha: "བསམ་རྩེ་", capital: "Samtse", elevation: "1000m", population: 65000 },
  { name: "Thimphu", code: "TH", region: "Western", dzongkha: "ཐིམ་ཕུག་", capital: "Thimphu", elevation: "2320m", population: 138700 },

  // Central Region
  { name: "Dagana", code: "DA", region: "Central", dzongkha: "དར་དཀར་ནང་", capital: "Dagana", elevation: "1400m", population: 25000 },
  { name: "Gasa", code: "GA", region: "Central", dzongkha: "མགར་ས་", capital: "Gasa", elevation: "2770m", population: 3500 },
  { name: "Punakha", code: "PU", region: "Central", dzongkha: "སྤུ་ན་ཁ་", capital: "Punakha", elevation: "1200m", population: 28000 },
  { name: "Tsirang", code: "TS", region: "Central", dzongkha: "རྩི་རང་", capital: "Damphu", elevation: "1800m", population: 19000 },
  { name: "Wangdue Phodrang", code: "WP", region: "Central", dzongkha: "དབང་འདུས་ཕོ་བྲང་", capital: "Bajo", elevation: "1240m", population: 32000 },

  // Southern Region
  { name: "Sarpang", code: "SP", region: "Southern", dzongkha: "གསར་སྦང་", capital: "Gelephu", elevation: "100m", population: 46500 },
  { name: "Zhemgang", code: "ZG", region: "Southern", dzongkha: "གཞལ་སྒང་", capital: "Zhemgang", elevation: "800m", population: 18000 },

  // Eastern Region
  { name: "Bumthang", code: "BU", region: "Eastern", dzongkha: "བུམ་ཐང་", capital: "Jakar", elevation: "2500m", population: 19000 },
  { name: "Lhuentse", code: "LH", region: "Eastern", dzongkha: "ལྷུན་རྩེ་", capital: "Lhuentse", elevation: "1500m", population: 16000 },
  { name: "Mongar", code: "MO", region: "Eastern", dzongkha: "མོང་སྒར་", capital: "Mongar", elevation: "1600m", population: 44500 },
  { name: "Pemagatshel", code: "PE", region: "Eastern", dzongkha: "པདྨ་དགའ་ཚལ་", capital: "Pemagatshel", elevation: "1000m", population: 24580 },
  { name: "Samdrup Jongkhar", code: "SJ", region: "Eastern", dzongkha: "བསམ་གྲུབ་ལྗོངས་མཁར་", capital: "Samdrup Jongkhar", elevation: "200m", population: 22000 },
  { name: "Trashigang", code: "TG", region: "Eastern", dzongkha: "བཀྲ་ཤིས་སྒང་", capital: "Trashigang", elevation: "1554m", population: 55000 },
  { name: "Trashiyangtse", code: "TY", region: "Eastern", dzongkha: "བཀྲ་ཤིས་གཡང་རྩེ་", capital: "Trashiyangtse", elevation: "1750m", population: 20000 },
  { name: "Trongsa", code: "TR", region: "Eastern", dzongkha: "ཀྲོང་གསར་", capital: "Trongsa", elevation: "2200m", population: 18000 },
];
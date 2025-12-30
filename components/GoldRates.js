'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  Cell
} from 'recharts'
import { 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  LineChart as LineChartIcon,
  History,
  ChevronUp,
  ChevronDown,
  Zap,
  Shield,
  Award,
  Target,
  Activity
} from 'lucide-react'

export default function GoldRates() {
  const [rates, setRates] = useState({
    gold24k: 6200,
    gold22k: 5800,
    silver: 78,
    platinum: 3200,
    gold18k: 4750
  })
  const [loading, setLoading] = useState(false)
  const [trend, setTrend] = useState('up')
  const [lastUpdated, setLastUpdated] = useState('')
  const [mounted, setMounted] = useState(false)
  const [timePeriod, setTimePeriod] = useState('daily') // 'daily', 'weekly', 'monthly'
  const [chartType, setChartType] = useState('line') // 'line', 'area', 'bar'
  const [selectedMetal, setSelectedMetal] = useState('gold24k')

  useEffect(() => {
    setMounted(true)
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }, [])

  // Generate consistent mock chart data
  const generateChartData = useMemo(() => {
    const generate = (period = timePeriod) => {
      const data = []
      const now = new Date('2024-01-01T12:00:00') // Fixed date for consistency
      
      switch (period) {
        case 'daily':
          // Last 24 hours
          for (let i = 23; i >= 0; i--) {
            const time = new Date(now)
            time.setHours(now.getHours() - i)
            const basePrice = 6200
            // Use deterministic calculation instead of Math.random
            const variation = Math.sin(i * 0.5) * 50 + Math.sin(i) * 25
            
            data.push({
              time: time.getHours().toString().padStart(2, '0') + ':00',
              gold24k: Math.round(basePrice + variation),
              gold22k: Math.round(basePrice * 0.935 + variation * 0.9),
              silver: Math.round(78 + Math.sin(i * 0.3) * 2 + Math.cos(i) * 1),
              platinum: Math.round(3200 + Math.sin(i * 0.4) * 100 + Math.cos(i) * 50),
              date: time.toISOString()
            })
          }
          break
          
        case 'weekly':
          // Last 7 days
          for (let i = 6; i >= 0; i--) {
            const date = new Date(now)
            date.setDate(now.getDate() - i)
            const basePrice = 6200
            const variation = Math.sin(i) * 80 + Math.cos(i * 2) * 40
            
            data.push({
              time: date.toLocaleDateString('en-US', { weekday: 'short' }),
              gold24k: Math.round(basePrice + variation),
              gold22k: Math.round(basePrice * 0.935 + variation * 0.9),
              silver: Math.round(78 + Math.sin(i * 0.5) * 4 + Math.cos(i) * 2),
              platinum: Math.round(3200 + Math.sin(i * 0.6) * 150 + Math.cos(i * 2) * 75),
              date: date.toISOString()
            })
          }
          break
          
        case 'monthly':
          // Last 30 days (grouped by week)
          for (let i = 29; i >= 0; i -= 1) {
            const date = new Date(now)
            date.setDate(now.getDate() - i)
            const basePrice = 6200
            const variation = Math.sin(i / 5) * 120 + Math.cos(i / 3) * 60
            
            data.push({
              time: (i + 1).toString(),
              gold24k: Math.round(basePrice + variation),
              gold22k: Math.round(basePrice * 0.935 + variation * 0.9),
              silver: Math.round(78 + Math.sin(i / 8) * 6 + Math.cos(i / 4) * 3),
              platinum: Math.round(3200 + Math.sin(i / 6) * 200 + Math.cos(i / 2) * 100),
              date: date.toISOString()
            })
          }
          break
      }
      
      return data
    }
    return generate
  }, [timePeriod])

  const [chartData, setChartData] = useState(() => generateChartData(timePeriod))

  const fetchLiveRates = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Use deterministic changes instead of Math.random
      const timeBasedChange = () => {
        const now = new Date()
        const seconds = now.getSeconds()
        return Math.sin(seconds) * 10 // Deterministic based on seconds
      }
      
      const newRates = {
        gold24k: Math.max(6100, Math.min(6300, rates.gold24k + timeBasedChange())),
        gold22k: Math.max(5700, Math.min(5900, rates.gold22k + timeBasedChange() * 0.9)),
        silver: Math.max(75, Math.min(82, rates.silver + timeBasedChange() * 0.05)),
        platinum: Math.max(3100, Math.min(3300, rates.platinum + timeBasedChange())),
        gold18k: Math.max(4700, Math.min(4800, rates.gold18k + timeBasedChange() * 0.8))
      }
      
      setRates(newRates)
      setTrend(newRates.gold24k > rates.gold24k ? 'up' : 'down')
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      
      // Update chart data with new rate
      const newChartData = [...chartData]
      if (newChartData.length > 0) {
        const lastPoint = { ...newChartData[newChartData.length - 1] }
        lastPoint.gold24k = newRates.gold24k
        lastPoint.gold22k = newRates.gold22k
        lastPoint.silver = newRates.silver
        lastPoint.platinum = newRates.platinum
        newChartData[newChartData.length - 1] = lastPoint
        setChartData(newChartData)
      }
    } catch (error) {
      console.error('Error fetching rates:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      fetchLiveRates()
      const interval = setInterval(fetchLiveRates, 45000)
      return () => clearInterval(interval)
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      setChartData(generateChartData(timePeriod))
    }
  }, [timePeriod, mounted, generateChartData])

  // Use fixed, deterministic change percentages
  const rateCards = useMemo(() => [
    { 
      id: 'gold24k',
      name: '24K Gold', 
      rate: rates.gold24k, 
      unit: 'per gram', 
      color: '#FFC90C',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      icon: <DollarSign className="w-5 h-5" />,
      change: '+1.24', // Fixed value
      changePercent: 1.24, // Fixed for calculations
      trend: 'up'
    },
    { 
      id: 'gold22k',
      name: '22K Gold', 
      rate: rates.gold22k, 
      unit: 'per gram', 
      color: '#E6B400',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-amber-100',
      icon: <Shield className="w-5 h-5" />,
      change: '+0.89',
      changePercent: 0.89,
      trend: 'up'
    },
    { 
      id: 'gold18k',
      name: '18K Gold', 
      rate: rates.gold18k, 
      unit: 'per gram', 
      color: '#B8860B',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      icon: <Award className="w-5 h-5" />,
      change: '+0.67',
      changePercent: 0.67,
      trend: 'up'
    },
    { 
      id: 'silver',
      name: 'Silver', 
      rate: rates.silver, 
      unit: 'per gram', 
      color: '#C0C0C0',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      icon: <Target className="w-5 h-5" />,
      change: '+2.08',
      changePercent: 2.08,
      trend: 'up'
    },
    { 
      id: 'platinum',
      name: 'Platinum', 
      rate: rates.platinum, 
      unit: 'per gram', 
      color: '#E5E4E2',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      icon: <Activity className="w-5 h-5" />,
      change: '+0.52',
      changePercent: 0.52,
      trend: 'up'
    },
  ], [rates])

  const timePeriods = [
    { id: 'daily', label: '24H', icon: <Clock className="w-4 h-4" /> },
    { id: 'weekly', label: '7D', icon: <Calendar className="w-4 h-4" /> },
    { id: 'monthly', label: '30D', icon: <History className="w-4 h-4" /> },
  ]

  const chartTypes = [
    { id: 'line', label: 'Line', icon: <LineChartIcon className="w-4 h-4" /> },
    { id: 'area', label: 'Area', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'bar', label: 'Bar', icon: <BarChart3 className="w-4 h-4" /> },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.dataKey}:</span>
              <span className="text-sm font-bold">₹{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // Calculate statistics deterministically
  const stats = useMemo(() => {
    const prices = chartData.map(d => d.gold24k)
    const max = Math.max(...prices)
    const min = Math.min(...prices)
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length
    const current = rates.gold24k
    const changePercent = ((current - prices[0]) / prices[0]) * 100
    
    return {
      max: Math.round(max),
      min: Math.round(min),
      avg: Math.round(avg),
      current: Math.round(current),
      changePercent: changePercent.toFixed(2),
      changeValue: Math.round(current - prices[0]),
      volatility: ((max - min) / avg * 100).toFixed(1)
    }
  }, [chartData, rates.gold24k])

  // Use fixed performance data to avoid hydration issues
  const performanceData = useMemo(() => [
    { period: 'Daily', change: '+1.45%', value: '+₹89.25', color: 'green' },
    { period: 'Weekly', change: '+3.21%', value: '+₹198.75', color: 'green' },
    { period: 'Monthly', change: '-0.89%', value: '-₹55.10', color: 'red' },
  ], [])

  return (
    <section id="rates" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4 bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-full">
            <Zap className="text-primary w-6 h-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-secondary">
              Live Gold Rates
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real-time precious metal prices with advanced charting. Track daily, weekly, and monthly trends.
          </p>
        </div>

        {/* Current Rates Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {rateCards.map((item) => (
            <div
              key={item.id}
              className={`${item.bgColor} p-4 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer ${
                selectedMetal === item.id ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              onClick={() => setSelectedMetal(item.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="p-1 rounded-md" style={{ backgroundColor: `${item.color}20` }}>
                      {item.icon}
                    </div>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.trend === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.trend === 'up' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      {item.change}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₹{item.rate.toLocaleString()}
              </div>
              <p className="text-gray-500 text-xs">{item.unit}</p>
            </div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          {/* Chart Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Price Trends</h2>
              <div className="flex items-center gap-3">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {trend === 'up' ? 'Bullish Market' : 'Bearish Market'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  Updates every 45s
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Time Period Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {timePeriods.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => setTimePeriod(id)}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                      timePeriod === id 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              
              {/* Chart Type Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {chartTypes.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => setChartType(id)}
                    className={`px-3 py-2 rounded-md flex items-center gap-2 transition-all ${
                      chartType === id 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={fetchLiveRates}
                disabled={loading}
                className="bg-primary text-secondary px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Updating...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-80 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#666" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#666" 
                    fontSize={12}
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gold24k"
                    stroke="#FFC90C"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, stroke: '#FFC90C', strokeWidth: 2, fill: '#fff' }}
                    name="24K Gold"
                  />
                  <Line
                    type="monotone"
                    dataKey="gold22k"
                    stroke="#E6B400"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="22K Gold"
                  />
                  <Line
                    type="monotone"
                    dataKey="silver"
                    stroke="#C0C0C0"
                    strokeWidth={2}
                    name="Silver"
                  />
                  <Line
                    type="monotone"
                    dataKey="platinum"
                    stroke="#E5E4E2"
                    strokeWidth={2}
                    name="Platinum"
                  />
                </LineChart>
              ) : chartType === 'area' ? (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" fontSize={12} />
                  <YAxis 
                    stroke="#666" 
                    fontSize={12}
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="gold24k"
                    stroke="#FFC90C"
                    fill="#FFC90C"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="24K Gold"
                  />
                  <Area
                    type="monotone"
                    dataKey="gold22k"
                    stroke="#E6B400"
                    fill="#E6B400"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name="22K Gold"
                  />
                </AreaChart>
              ) : (
                <BarChart data={chartData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" fontSize={12} />
                  <YAxis 
                    stroke="#666" 
                    fontSize={12}
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="gold24k" name="24K Gold" fill="#FFC90C" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="gold22k" name="22K Gold" fill="#E6B400" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Statistics Cards */}
          {mounted && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-800 font-medium">Current Price</span>
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">₹{stats.current.toLocaleString()}</div>
                <div className={`text-sm flex items-center mt-1 ${
                  parseFloat(stats.changePercent) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(stats.changePercent) >= 0 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {Math.abs(parseFloat(stats.changePercent))}% (₹{Math.abs(stats.changeValue)})
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-800 font-medium">24H High</span>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">₹{stats.max.toLocaleString()}</div>
                <div className="text-sm text-blue-600 mt-1">
                  +₹{(stats.max - stats.current).toLocaleString()} from current
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-800 font-medium">24H Low</span>
                  <TrendingDown className="w-4 h-4 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">₹{stats.min.toLocaleString()}</div>
                <div className="text-sm text-red-600 mt-1">
                  -₹{(stats.current - stats.min).toLocaleString()} from current
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-800 font-medium">Volatility</span>
                  <Activity className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.volatility}%</div>
                <div className="text-sm text-purple-600 mt-1">
                  Range: ₹{(stats.max - stats.min).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Time Period Performance */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceData.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border">
                  <div className="text-sm text-gray-500 mb-1">{item.period} Change</div>
                  <div className={`text-2xl font-bold ${
                    item.color === 'green' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </div>
                  <div className="text-sm text-gray-500">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-secondary">Market Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border">
              <h4 className="font-semibold text-gray-800 mb-3">Current Analysis</h4>
              <p className="text-gray-600 text-sm mb-3">
                Gold prices are showing {trend === 'up' ? 'strong bullish' : 'mild bearish'} momentum with increased trading volume. 
                The current trend indicates {trend === 'up' ? 'potential for continued growth' : 'possible correction'} in the coming sessions.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-gray-500">Market sentiment: {trend === 'up' ? 'Positive' : 'Cautious'}</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border">
              <h4 className="font-semibold text-gray-800 mb-3">Trading Recommendation</h4>
              <p className="text-gray-600 text-sm mb-3">
                {trend === 'up' 
                  ? 'Consider accumulating positions during minor dips. Support at ₹6150, resistance at ₹6280.'
                  : 'Wait for confirmation of trend reversal. Consider partial profit booking at current levels.'
                }
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {trend === 'up' ? '🟢 Accumulate' : '🟡 Hold'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          {mounted && (
            <div className="inline-flex items-center gap-3 mb-4 bg-gray-100 px-6 py-3 rounded-full">
              <Clock className="w-5 h-5 text-gray-500" />
              <p className="text-gray-600 text-sm">
                Last updated: <span className="font-semibold">{lastUpdated}</span> • Updates automatically
              </p>
            </div>
          )}
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            * Rates are indicative and may vary based on purity and market conditions. 
            Past performance is not indicative of future results. 
            Please consult with a financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </section>
  )
}
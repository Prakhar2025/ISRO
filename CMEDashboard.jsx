import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  Activity, AlertTriangle, CheckCircle, Play, Pause, RotateCcw, Settings, 
  History, Radio, Zap, TrendingUp, Brain, Download, Filter, 
  Globe, Clock, Shield, Database, BarChart3, Calendar, 
  Maximize2, RefreshCw, Bell, Eye, Users, Server
} from 'lucide-react';

const CMEDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cmeDetected, setCmeDetected] = useState(false);
  const [confidence, setConfidence] = useState(0.126);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTab, setSelectedTab] = useState('live');
  const [alertCount, setAlertCount] = useState(2);
  const [systemHealth, setSystemHealth] = useState(98.7);

  // Advanced particle flux data with logarithmic scale
  const [particleData, setParticleData] = useState([
    { time: '12:00', protonFlux: 4.2, electronFlux: 3.8, highEnergy: 2.1, threshold: 6.0 },
    { time: '13:00', protonFlux: 4.5, electronFlux: 3.9, highEnergy: 2.3, threshold: 6.0 },
    { time: '14:00', protonFlux: 4.1, electronFlux: 4.1, highEnergy: 2.0, threshold: 6.0 },
    { time: '15:00', protonFlux: 4.8, electronFlux: 4.3, highEnergy: 2.5, threshold: 6.0 },
    { time: '16:00', protonFlux: 4.6, electronFlux: 4.0, highEnergy: 2.2, threshold: 6.0 },
    { time: '16:48', protonFlux: 4.3, electronFlux: 3.7, highEnergy: 2.4, threshold: 6.0 },
  ]);

  const eventHistory = [
    { date: '06 Jul', time: '03:12', confidence: 0.83, type: 'Halo CME', notes: 'Alert Sent', severity: 'high' },
    { date: '03 Jul', time: '15:10', confidence: 0.62, type: 'Weak CME', notes: '', severity: 'medium' },
    { date: '28 Jun', time: '09:45', confidence: 0.71, type: 'Partial CME', notes: 'Minor Flag', severity: 'medium' },
    { date: '25 Jun', time: '12:33', confidence: 0.89, type: 'Halo CME', notes: 'Alert Sent', severity: 'high' },
    { date: '22 Jun', time: '08:15', confidence: 0.45, type: 'Weak Event', notes: 'Monitoring', severity: 'low' },
  ];

  const modelMetrics = {
    autoencoderScore: 0.14,
    lstmConfidence: 0.28,
    ensemblePrediction: 'Non-CME',
    alertThreshold: 0.65,
    modelAccuracy: 94.3,
    lastTraining: '2024-06-15'
  };

  const systemStats = {
    dataIngestion: 99.2,
    modelPerformance: 96.8,
    alertSystem: 100.0,
    uptime: '99.94%'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isPlaying) {
        setConfidence(prev => Math.max(0, Math.min(1, prev + (Math.random() - 0.5) * 0.05)));
        setSystemHealth(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5)));
        
        setParticleData(prev => {
          const newData = [...prev];
          if (newData.length > 10) newData.shift();
          const now = new Date();
          newData.push({
            time: now.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
            protonFlux: Math.random() * 1.5 + 3.5,
            electronFlux: Math.random() * 1.2 + 3.0,
            highEnergy: Math.random() * 1.0 + 1.5,
            threshold: 6.0
          });
          return newData;
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    setCmeDetected(confidence > 0.65);
  }, [confidence]);

  const MetricCard = ({ title, value, status, icon: Icon, trend, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className={`w-5 h-5 ${status === 'critical' ? 'text-red-500' : status === 'warning' ? 'text-yellow-500' : 'text-green-500'}`} />
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <div className="mb-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {trend && (
              <span className={`ml-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${status === 'critical' ? 'bg-red-50' : status === 'warning' ? 'bg-yellow-50' : 'bg-green-50'} group-hover:scale-110 transition-transform duration-200`}>
          <div className={`w-3 h-3 rounded-full ${status === 'critical' ? 'bg-red-500 animate-pulse' : status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
        </div>
      </div>
    </div>
  );

const AdvancedChart = () => {
  // Create visually varying dummy data
  const demoParticleData = [
    { time: '12:00', protonFlux: 3.2, electronFlux: 2.1, highEnergy: 1.3, threshold: 5.5 },
    { time: '12:05', protonFlux: 4.8, electronFlux: 2.9, highEnergy: 1.7, threshold: 5.5 },
    { time: '12:10', protonFlux: 2.2, electronFlux: 2.5, highEnergy: 1.1, threshold: 5.5 },
    { time: '12:15', protonFlux: 6.1, electronFlux: 3.7, highEnergy: 2.5, threshold: 5.5 },
    { time: '12:20', protonFlux: 3.9, electronFlux: 4.1, highEnergy: 2.2, threshold: 5.5 },
    { time: '12:25', protonFlux: 5.3, electronFlux: 3.5, highEnergy: 2.6, threshold: 5.5 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>Particle Flux Analysis</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">Real-time data from Aditya-L1 SWIS-ASPEX • Log Scale (10³ to 10⁶)</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Proton Flux</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Electron Flux</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>High-Energy Particles</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <span>CME Alert Threshold</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={demoParticleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" />
          <YAxis 
            domain={[1, 7]} 
            label={{ value: 'Log₁₀(Flux)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="protonFlux" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="electronFlux" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="highEnergy" stroke="#f59e0b" strokeWidth={2} />
          <Line type="monotone" dataKey="threshold" stroke="#374151" strokeDasharray="5 5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


  const ModelMetricsPanel = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">AI Model Metrics</h2>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Autoencoder Score</div>
            <div className="text-2xl font-bold text-green-600">{modelMetrics.autoencoderScore.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Normal Range</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">LSTM Confidence</div>
            <div className="text-2xl font-bold text-blue-600">{modelMetrics.lstmConfidence.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Low Confidence</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Ensemble Prediction</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              cmeDetected ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {cmeDetected ? '🔴 CME Detected' : '✅ Non-CME'}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Current Confidence</span>
            <span className="text-sm font-bold text-gray-900">{(confidence * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                confidence > 0.65 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                confidence > 0.4 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                'bg-gradient-to-r from-green-500 to-green-600'
              }`}
              style={{ width: `${confidence * 100}%` }}
            >
              <div className="h-full rounded-full bg-white bg-opacity-30"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span className="font-medium">Alert Threshold: {(modelMetrics.alertThreshold * 100).toFixed(0)}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{modelMetrics.modelAccuracy}%</div>
            <div className="text-xs text-gray-500">Model Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{systemStats.uptime}</div>
            <div className="text-xs text-gray-500">System Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );

  const EventHistoryTable = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">Event History Log</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Confidence</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Event Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {eventHistory.map((event, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm text-gray-900">{event.date}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{event.time}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      event.confidence > 0.8 ? 'bg-red-500' : 
                      event.confidence > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-900">
                      {(event.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{event.type}</td>
                <td className="py-3 px-4">
                  {event.notes && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.severity === 'high' ? 'bg-red-100 text-red-800' :
                      event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.notes}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Globe className="w-8 h-8 text-blue-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  CME-SENSE
                </h1>
                <p className="text-sm text-blue-200">Real-Time Halo CME Detection Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-300" />
                <span className="text-sm">UTC {currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-green-300" />
                <span className="text-sm">System: {systemHealth.toFixed(1)}%</span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                cmeDetected ? 'bg-red-500 bg-opacity-20' : 'bg-green-500 bg-opacity-20'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  cmeDetected ? 'bg-red-400 animate-pulse' : 'bg-green-400'
                }`}></div>
                <span className="text-sm font-medium">
                  {cmeDetected ? 'CME Alert' : 'Online'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'live', label: 'Live Feed', icon: Radio },
              { id: 'events', label: 'Events', icon: AlertTriangle },
              { id: 'history', label: 'History', icon: History },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="CME Detection Status"
            value={cmeDetected ? "CME Detected" : "No CME Detected"}
            status={cmeDetected ? "critical" : "normal"}
            icon={cmeDetected ? AlertTriangle : CheckCircle}
            subtitle="Real-time monitoring active"
          />
          <MetricCard
            title="Confidence Level"
            value={`${(confidence * 100).toFixed(1)}%`}
            status={confidence > 0.65 ? "critical" : confidence > 0.4 ? "warning" : "normal"}
            icon={TrendingUp}
            trend={confidence > 0.5 ? 2.1 : -1.3}
            subtitle="Model ensemble output"
          />
          <MetricCard
            title="Next Data Update"
            value="30 sec"
            status="normal"
            icon={RefreshCw}
            subtitle="Aditya-L1 telemetry"
          />
          <MetricCard
            title="Active Alerts"
            value={alertCount}
            status={alertCount > 0 ? "warning" : "normal"}
            icon={Bell}
            subtitle="Past 24 hours"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Advanced Particle Flux Chart */}
          <div className="lg:col-span-2">
            <AdvancedChart />
          </div>

          {/* Model Metrics Panel */}
          <div>
            <ModelMetricsPanel />
          </div>
        </div>

        {/* Event History */}
        <EventHistoryTable />

        {/* System Footer */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{systemStats.dataIngestion}%</div>
              <div className="text-sm text-gray-600">Data Ingestion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{systemStats.modelPerformance}%</div>
              <div className="text-sm text-gray-600">Model Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{systemStats.alertSystem}%</div>
              <div className="text-sm text-gray-600">Alert System</div>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Powered by Aditya-L1 Mission | ISRO Space Weather Group | Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMEDashboard;
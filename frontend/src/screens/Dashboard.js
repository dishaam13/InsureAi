import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Target, Shield, Bot } from 'lucide-react';

const API = 'http://localhost:8000';

const weekTrend = [
  { day: 'Mon', campaigns: 32, conversions: 6 },
  { day: 'Tue', campaigns: 38, conversions: 7 },
  { day: 'Wed', campaigns: 35, conversions: 6 },
  { day: 'Thu', campaigns: 41, conversions: 8 },
  { day: 'Fri', campaigns: 45, conversions: 9 },
  { day: 'Sat', campaigns: 48, conversions: 10 },
  { day: 'Sun', campaigns: 43, conversions: 8 },
];

export default function Dashboard({ uploadData, setScreen }) {
  const [stats, setStats] = useState({
    campaigns_sent: 0,
    open_rate: 0,
    conversion_rate: 0,
    fairness_score: 94,
    customer_satisfaction: 87,
    agent_accuracy: 91
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Use uploaded customer data if available
    if (uploadData?.customers) {
      setCustomers(uploadData.customers.slice(0, 8)); // Show first 8
      
      // Calculate stats based on uploaded customers
      const totalCustomers = uploadData.customers.length;
      setStats({
        campaigns_sent: Math.floor(totalCustomers * 2.5), // ~2.5 campaigns per customer
        open_rate: 43,
        conversion_rate: 8,
        fairness_score: 94,
        customer_satisfaction: 87,
        agent_accuracy: 91
      });
    } else {
      // Try backend as fallback
      fetch(`${API}/customers`).then(r => r.json()).then(d => setCustomers(d.customers || [])).catch(() => {});
      fetch(`${API}/stats`).then(r => r.json()).then(setStats).catch(() => {});
    }
  }, [uploadData]);

  const fairnessAngle = (stats.fairness_score / 100) * 180;

  return (
    <div style={{ padding: '32px', background: '#0A1628', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '6px' }}>
          Welcome to TrustAI 👋
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px' }}>
          Here's what's happening with your marketing campaigns today
        </p>
      </div>

      {/* Top Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Campaigns', value: stats.campaigns_sent, icon: Target, color: '#3B82F6', trend: '+12%', up: true },
          { label: 'Open Rate', value: `${stats.open_rate}%`, icon: TrendingUp, color: '#10B981', trend: '+8%', up: true },
          { label: 'Conversion', value: `${stats.conversion_rate}%`, icon: Bot, color: '#8B5CF6', trend: '+15%', up: true },
          { label: 'Customers', value: uploadData?.total || 100, icon: Users, color: '#F59E0B', trend: 'Active', up: true },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `radial-gradient(circle at top right, ${card.color}15 0%, transparent 70%)` }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: `${card.color}20`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <card.icon size={20} color={card.color} strokeWidth={2.5} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: card.up ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', border: `1px solid ${card.up ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}>
                  {card.up ? <TrendingUp size={12} color="#10B981" /> : <TrendingDown size={12} color="#EF4444" />}
                  <span style={{ fontSize: '11px', fontWeight: '700', color: card.up ? '#10B981' : '#EF4444' }}>{card.trend}</span>
                </div>
              </div>
              
              <div style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '4px' }}>{card.value}</div>
              <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600' }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Performance Chart */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Campaign Performance</h3>
              <p style={{ color: '#94A3B8', fontSize: '13px' }}>Last 7 days activity</p>
            </div>
            <div style={{ padding: '6px 14px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <span style={{ color: '#60A5FA', fontSize: '12px', fontWeight: '700' }}>This Week</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weekTrend}>
              <defs>
                <linearGradient id="campaignGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <Line type="monotone" dataKey="campaigns" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 5 }} fill="url(#campaignGradient)" name="Campaigns" />
              <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} name="Conversions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fairness Score Gauge */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '24px', alignSelf: 'flex-start' }}>Fairness Score</h3>
          
          {/* Circular Gauge */}
          <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '20px' }}>
            {/* Background arc */}
            <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle
                cx="80" cy="80" r="70" fill="none"
                stroke={stats.fairness_score >= 80 ? '#10B981' : stats.fairness_score >= 60 ? '#F59E0B' : '#EF4444'}
                strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${(stats.fairness_score / 100) * 440} 440`}
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
            </svg>
            
            {/* Center text */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '42px', fontWeight: '900', color: 'white', lineHeight: 1 }}>{stats.fairness_score}</div>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>/ 100</div>
            </div>
          </div>

          <div style={{ width: '100%', padding: '16px', background: stats.fairness_score >= 80 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: `1px solid ${stats.fairness_score >= 80 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: stats.fairness_score >= 80 ? '#10B981' : '#F59E0B' }}>
                  {stats.fairness_score >= 80 ? '✅ Excellent' : stats.fairness_score >= 60 ? '⚠️ Good' : '❌ Needs Review'}
                </div>
              </div>
              <Shield size={24} color={stats.fairness_score >= 80 ? '#10B981' : '#F59E0B'} />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Customer Profiles</h3>
            <p style={{ color: '#94A3B8', fontSize: '13px' }}>Active customers in your dataset</p>
          </div>
          <button
            onClick={() => setScreen('agent')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
              transition: 'transform 0.2s'
            }}
          >
            🤖 Run AI Agent
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                {['Customer', 'Age', 'Location', 'Life Event', 'Channel', 'Best Time'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid rgba(255,255,255,0.05)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.slice(0, 5).map((c, i) => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'white', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ fontSize: '24px' }}>{c.icon}</div>
                      {c.name}
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: '#94A3B8', fontSize: '14px' }}>{c.age}</td>
                  <td style={{ padding: '16px', color: '#94A3B8', fontSize: '14px' }}>{c.location}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#60A5FA' }}>
                      {c.life_event?.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#94A3B8', fontSize: '14px' }}>{c.channel}</td>
                  <td style={{ padding: '16px', color: '#94A3B8', fontSize: '13px' }}>{c.best_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

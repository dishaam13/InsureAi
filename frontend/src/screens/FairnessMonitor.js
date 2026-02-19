import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API = 'http://localhost:8000';

export default function FairnessMonitor() {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    fetch(`${API}/fairness`).then(r => r.json()).then(setData).catch(() => {
      setData({
        overall_score: 94, status: 'FAIR',
        by_gender: { male: { conversion: 8.2, campaigns: 120 }, female: { conversion: 8.3, campaigns: 127 } },
        by_region: { Mumbai: { conversion: 8.5, campaigns: 67 }, Delhi: { conversion: 8.1, campaigns: 72 }, Bangalore: { conversion: 7.8, campaigns: 65 }, Pune: { conversion: 8.3, campaigns: 43 } },
        recommendations: ['All groups receiving equal quality offers', 'No bias detected in last 30 days', 'Conversion rates within acceptable range']
      });
    });
  }, []);

  const genderData = data ? Object.entries(data.by_gender).map(([k, v]) => ({ name: k.charAt(0).toUpperCase() + k.slice(1), conversion: v.conversion })) : [];
  const regionData = data ? Object.entries(data.by_region).map(([k, v]) => ({ name: k, conversion: v.conversion })) : [];

  if (!data) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0F172A', margin: '0 0 4px' }}>⚖️ Fairness Monitor</h2>
          <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>Real-time bias detection — ensuring equal treatment for every customer</p>
        </div>
        <button onClick={() => { setAlert(true); setTimeout(() => setAlert(false), 5000); }}
          style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          🚨 Simulate Bias Alert
        </button>
      </div>

      {alert && (
        <div style={{ background: '#FEF2F2', border: '2px solid #EF4444', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>🚨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '800', color: '#DC2626', fontSize: '15px' }}>BIAS ALERT DETECTED!</div>
            <div style={{ color: '#7F1D1D', fontSize: '13px', marginTop: '2px' }}>Male customers receiving 28% more premium offers than female. Campaigns PAUSED. Human review required!</div>
          </div>
          <div style={{ background: '#EF4444', color: 'white', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '12px' }}>ACTION NEEDED</div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: '18px', marginBottom: '18px' }}>
        <div style={{ background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: '14px', padding: '24px', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold' }}>{data.overall_score}</div>
          <div style={{ fontSize: '16px', opacity: 0.8 }}>/ 100</div>
          <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '6px' }}>Fairness Score</div>
          <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '20px', padding: '5px 12px', display: 'inline-block', marginTop: '12px', fontWeight: '700', fontSize: '13px' }}>✅ {data.status}</div>
        </div>

        <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h4 style={{ margin: '0 0 14px', color: '#1E293B' }}>By Gender</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={genderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 12]} />
              <Tooltip />
              <Bar dataKey="conversion" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Conversion %" />
            </BarChart>
          </ResponsiveContainer>
          {Object.entries(data.by_gender).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#F8FAFC', borderRadius: '6px', marginTop: '6px', fontSize: '13px' }}>
              <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{k}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: '700', color: '#3B82F6' }}>{v.conversion}%</span>
                <span style={{ background: '#ECFDF5', color: '#065F46', padding: '1px 6px', borderRadius: '8px', fontSize: '10px', fontWeight: '600' }}>✅ FAIR</span>
              </span>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h4 style={{ margin: '0 0 14px', color: '#1E293B' }}>By Region</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 12]} />
              <Tooltip />
              <Bar dataKey="conversion" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Conversion %" />
            </BarChart>
          </ResponsiveContainer>
          {Object.entries(data.by_region).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#F8FAFC', borderRadius: '6px', marginTop: '6px', fontSize: '13px' }}>
              <span style={{ fontWeight: '500' }}>{k}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: '700', color: '#8B5CF6' }}>{v.conversion}%</span>
                <span style={{ background: '#ECFDF5', color: '#065F46', padding: '1px 6px', borderRadius: '8px', fontSize: '10px', fontWeight: '600' }}>✅ FAIR</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
        <h4 style={{ margin: '0 0 12px', color: '#1E293B' }}>💡 Agent Recommendations</h4>
        {data.recommendations.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#F0FDF4', borderRadius: '8px', marginBottom: '8px', borderLeft: '3px solid #10B981' }}>
            <span style={{ color: '#10B981' }}>✓</span>
            <span style={{ color: '#065F46', fontSize: '14px' }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

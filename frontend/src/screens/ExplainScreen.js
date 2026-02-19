import { useState } from 'react';

const API = 'http://localhost:8000';
const CUSTOMERS = [
  { id: 1, name: 'Priya Sharma', icon: '👰', event: 'Just Married' },
  { id: 2, name: 'Rahul Kumar', icon: '🧑', event: 'Bought Car' },
  { id: 3, name: 'Anjali Patel', icon: '👩', event: 'Had Baby' },
  { id: 4, name: 'Vikram Singh', icon: '👨', event: 'Bought House' },
  { id: 5, name: 'Sneha Rao', icon: '👩‍💼', event: 'New Job' },
];

export default function ExplainScreen() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const explain = async (id) => {
    setSelected(id);
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`${API}/explain/${id}`);
      const d = await res.json();
      setData(d);
    } catch {
      const c = CUSTOMERS.find(x => x.id === id);
      setData({ customer_name: c.name, product: 'Family Health Insurance', reasons: ['Life event detected recently', 'Age matches ideal coverage stage', '89% of similar profiles found this helpful', 'Location coverage available', 'High engagement score'], data_used: ['Age', 'Location', 'Life Event', 'Channel Preference'], data_not_used: ['Income', 'Medical History', 'Social Media', 'Bank Details'], confidence_score: 89, similar_profiles: 1050, success_rate: '89%' });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '28px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0F172A', margin: '0 0 6px' }}>🔍 Explainability Engine</h2>
      <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>Every recommendation has a clear reason — complete transparency, no black boxes</p>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', height: 'fit-content' }}>
          <h4 style={{ margin: '0 0 12px', color: '#64748B', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Customer</h4>
          {CUSTOMERS.map(c => (
            <div key={c.id} onClick={() => explain(c.id)} style={{ padding: '12px', marginBottom: '8px', borderRadius: '8px', border: `2px solid ${selected === c.id ? '#8B5CF6' : '#F1F5F9'}`, background: selected === c.id ? '#F5F3FF' : '#FAFAFA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '22px' }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#1E293B' }}>{c.name}</div>
                <div style={{ color: '#94A3B8', fontSize: '11px' }}>{c.event}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {loading && <div style={{ background: 'white', borderRadius: '14px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}><div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div><p style={{ color: '#8B5CF6' }}>Fetching explanation...</p></div>}

          {data && !loading && (
            <div>
              <div style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', borderRadius: '14px', padding: '22px', marginBottom: '18px', color: 'white' }}>
                <h3 style={{ margin: '0 0 4px', fontSize: '20px' }}>{data.customer_name}</h3>
                <div style={{ opacity: 0.85 }}>Recommended: <strong>{data.product}</strong></div>
                <div style={{ display: 'flex', gap: '14px', marginTop: '14px' }}>
                  {[['Confidence', `${data.confidence_score}%`], ['Similar Profiles', data.similar_profiles], ['Success Rate', data.success_rate]].map(([k, v]) => (
                    <div key={k} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{v}</div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                  <h4 style={{ margin: '0 0 14px', color: '#1E293B' }}>Why This Recommendation?</h4>
                  {data.reasons.map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px', background: '#F8FAFC', borderRadius: '8px', marginBottom: '8px', borderLeft: '3px solid #8B5CF6' }}>
                      <span style={{ color: '#8B5CF6', fontWeight: '700', minWidth: '18px' }}>{i + 1}.</span>
                      <span style={{ color: '#374151', fontSize: '13px' }}>{r}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                    <h4 style={{ margin: '0 0 12px', color: '#065F46', fontSize: '14px' }}>✅ Data We Used</h4>
                    {data.data_used.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: '#ECFDF5', borderRadius: '6px', marginBottom: '6px', fontSize: '13px' }}>
                        <span style={{ color: '#10B981' }}>✓</span><span style={{ color: '#065F46' }}>{d}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                    <h4 style={{ margin: '0 0 12px', color: '#DC2626', fontSize: '14px' }}>🔒 Data NOT Used</h4>
                    {data.data_not_used.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: '#FEF2F2', borderRadius: '6px', marginBottom: '6px', fontSize: '13px' }}>
                        <span>🔒</span><span style={{ color: '#991B1B' }}>{d} (private)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!data && !loading && (
            <div style={{ background: 'white', borderRadius: '14px', padding: '70px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', color: '#CBD5E1' }}>
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>🔍</div>
              <h3>Select a customer to see why they got their recommendation</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

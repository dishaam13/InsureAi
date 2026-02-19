import { useState } from 'react';

export default function CustomerPanel() {
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({ useAge: true, useLifeEvents: true, useLocation: true, useIncome: false, useSocialMedia: false, frequency: 'weekly', whatsapp: true, email: true, sms: false, app: true });

  const toggle = k => { setPrefs(p => ({ ...p, [k]: !p[k] })); setSaved(false); };

  const dataItems = [
    { key: 'useAge', label: 'Age & Life Stage', safe: true, icon: '🎂' },
    { key: 'useLifeEvents', label: 'Life Events', safe: true, icon: '🎉' },
    { key: 'useLocation', label: 'Location & Region', safe: true, icon: '📍' },
    { key: 'useIncome', label: 'Income Level', safe: false, icon: '💰' },
    { key: 'useSocialMedia', label: 'Social Media Activity', safe: false, icon: '📲' },
  ];

  const channels = [
    { key: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { key: 'email', label: 'Email', icon: '📧' },
    { key: 'sms', label: 'SMS', icon: '📱' },
    { key: 'app', label: 'App Notifications', icon: '🔔' },
  ];

  const freqs = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly ✅', },
    { value: 'monthly', label: 'Monthly' },
    { value: 'never', label: 'Never' },
  ];

  return (
    <div style={{ padding: '28px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0F172A', margin: '0 0 6px' }}>🎛️ Customer Control Panel</h2>
      <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>You are in full control of your data and how we reach you</p>

      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A8A)', borderRadius: '12px', padding: '18px 22px', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '14px', color: 'white' }}>
        <span style={{ fontSize: '36px' }}>🛡️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '700', fontSize: '16px' }}>TrustAI Privacy Promise</div>
          <div style={{ opacity: 0.8, fontSize: '13px', marginTop: '3px' }}>We only use data you allow. Change preferences anytime. Your data is never sold.</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>100%</div>
          <div style={{ fontSize: '11px', opacity: 0.7 }}>Your Control</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: 'white', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#1E293B' }}>🔐 Data Permissions</h3>
          {dataItems.map(item => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', marginBottom: '8px', background: prefs[item.key] ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${prefs[item.key] ? '#86EFAC' : '#FECACA'}`, transition: 'all 0.2s' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1E293B', fontSize: '14px' }}>{item.label}</div>
                {!item.safe && <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: '600' }}>⚠️ Privacy Sensitive</span>}
              </div>
              <div onClick={() => toggle(item.key)} style={{ width: '44px', height: '24px', borderRadius: '12px', background: prefs[item.key] ? '#10B981' : '#CBD5E1', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '3px', left: prefs[item.key] ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '16px', color: '#1E293B' }}>📱 Preferred Channels</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {channels.map(ch => (
                <div key={ch.key} onClick={() => toggle(ch.key)} style={{ padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', border: `2px solid ${prefs[ch.key] ? '#3B82F6' : '#E2E8F0'}`, background: prefs[ch.key] ? '#EFF6FF' : '#FAFAFA', transition: 'all 0.15s' }}>
                  <div style={{ fontSize: '22px' }}>{ch.icon}</div>
                  <div style={{ fontWeight: '600', color: '#1E293B', fontSize: '13px', marginTop: '4px' }}>{ch.label}</div>
                  {prefs[ch.key] && <div style={{ color: '#3B82F6', fontSize: '10px', fontWeight: '700', marginTop: '4px' }}>✓ ON</div>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '16px', color: '#1E293B' }}>⏰ Contact Frequency</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {freqs.map(f => (
                <div key={f.value} onClick={() => { setPrefs(p => ({ ...p, frequency: f.value })); setSaved(false); }} style={{ padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', border: `2px solid ${prefs.frequency === f.value ? '#8B5CF6' : '#E2E8F0'}`, background: prefs.frequency === f.value ? '#F5F3FF' : '#FAFAFA', transition: 'all 0.15s' }}>
                  <div style={{ fontWeight: '700', color: prefs.frequency === f.value ? '#7C3AED' : '#374151', fontSize: '14px' }}>{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setSaved(true)} style={{ background: saved ? '#10B981' : 'linear-gradient(135deg, #1E3A8A, #3B82F6)', color: 'white', border: 'none', padding: '14px 44px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '16px', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}>
          {saved ? '✅ Preferences Saved!' : '💾 Save My Preferences'}
        </button>
        {saved && <p style={{ color: '#10B981', marginTop: '10px', fontWeight: '600', fontSize: '14px' }}>Your choices are respected! We only use what you allow.</p>}
      </div>
    </div>
  );
}

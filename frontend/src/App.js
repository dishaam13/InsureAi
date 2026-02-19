import { useState } from 'react';
import { LayoutDashboard, Bot, GitBranch, TrendingUp, ShieldAlert, Shuffle, Scale, Eye, Settings } from 'lucide-react';
import UploadScreen from './screens/UploadScreen';
import Dashboard from './screens/Dashboard';
import LiveAgentChat from './screens/LiveAgentChat';
import JourneySimulator from './screens/JourneySimulator';
import BeforeAfter from './screens/BeforeAfter';
import BiasAlert from './screens/BiasAlert';
import WhatIfSimulator from './screens/WhatIfSimulator';
import FairnessMonitor from './screens/FairnessMonitor';
import ExplainScreen from './screens/ExplainScreen';
import CustomerPanel from './screens/CustomerPanel';

const FEATURES = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: Dashboard },
  { key: 'agent', label: 'AI Agent', icon: Bot, component: LiveAgentChat },
  { key: 'journey', label: 'Journey', icon: GitBranch, component: JourneySimulator },
  { key: 'compare', label: 'Analytics', icon: TrendingUp, component: BeforeAfter },
  { key: 'bias', label: 'Bias Alert', icon: ShieldAlert, component: BiasAlert },
  { key: 'whatif', label: 'Simulator', icon: Shuffle, component: WhatIfSimulator },
  { key: 'fairness', label: 'Fairness', icon: Scale, component: FairnessMonitor },
  { key: 'explain', label: 'Insights', icon: Eye, component: ExplainScreen },
  { key: 'control', label: 'Settings', icon: Settings, component: CustomerPanel },
];

export default function App() {
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadData, setUploadData] = useState(null);
  const [screen, setScreen] = useState('dashboard');

  const handleUploadSuccess = (data) => {
    setUploadData(data);
    setUploadComplete(true);
  };

  if (!uploadComplete) {
    return <UploadScreen onUploadSuccess={handleUploadSuccess} />;
  }

  const ActiveComponent = FEATURES.find(f => f.key === screen)?.component;


  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", minHeight: '100vh', background: '#0A1628', display: 'flex' }}>
      
      {/* DARK SIDEBAR */}
      <div style={{ width: '240px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100 }}>
        
        {/* Logo */}
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              🤖
            </div>
            <div style={{ color: 'white', fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>TrustAI</div>
          </div>
          
          {/* Dataset Badge */}
          {uploadData && (
            <div style={{ marginTop: '12px', background: 'rgba(16,185,129,0.15)', borderRadius: '8px', padding: '8px 12px', border: '1px solid rgba(16,185,129,0.3)' }}>
              <div style={{ color: '#6EE7B7', fontSize: '10px', marginBottom: '2px', fontWeight: '600' }}>DATASET ACTIVE</div>
              <div style={{ color: 'white', fontSize: '18px', fontWeight: '800' }}>{uploadData.total}</div>
              <div style={{ color: '#94A3B8', fontSize: '10px' }}>Customers</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
          {FEATURES.map(item => {
            const Icon = item.icon;
            const isActive = screen === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setScreen(item.key)}
                style={{
                  width: '100%',
                  background: isActive ? 'linear-gradient(90deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #3B82F6' : '3px solid transparent',
                  color: isActive ? '#60A5FA' : '#94A3B8',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '600',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Footer Status */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            <div>
              <div style={{ color: '#6EE7B7', fontSize: '11px', fontWeight: '700' }}>SYSTEM ACTIVE</div>
              <div style={{ color: '#94A3B8', fontSize: '10px' }}>All features online</div>
            </div>
          </div>
          
          <button
            onClick={() => { setUploadComplete(false); setUploadData(null); }}
            style={{
              width: '100%',
              marginTop: '10px',
              background: 'rgba(100,116,139,0.1)',
              border: '1px solid rgba(100,116,139,0.2)',
              color: '#94A3B8',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            🔄 Change Dataset
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ marginLeft: '240px', flex: 1, minHeight: '100vh', background: '#0A1628' }}>
        {ActiveComponent && <ActiveComponent uploadData={uploadData} setScreen={setScreen} />}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

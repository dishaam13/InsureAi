import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NORMAL = {
  score:94,status:'FAIR',
  gender:[{name:'Male',rate:8.2,campaigns:120},{name:'Female',rate:8.3,campaigns:127}],
  region:[{name:'Mumbai',rate:8.5},{name:'Delhi',rate:8.1},{name:'Bangalore',rate:7.8},{name:'Pune',rate:8.3},{name:'Chennai',rate:8.0}],
  age:[{name:'20-30',rate:9.1},{name:'31-40',rate:7.8},{name:'41-50',rate:7.2},{name:'51+',rate:6.9}],
};
const BIASED = {
  score:41,status:'BIASED',
  gender:[{name:'Male',rate:12.8,campaigns:180},{name:'Female',rate:4.1,campaigns:67}],
  region:[{name:'Mumbai',rate:14.2},{name:'Delhi',rate:13.8},{name:'Bangalore',rate:3.1},{name:'Pune',rate:2.9},{name:'Chennai',rate:3.4}],
  age:[{name:'20-30',rate:14.1},{name:'31-40',rate:12.5},{name:'41-50',rate:2.1},{name:'51+',rate:1.2}],
};

const CAMPAIGNS_PAUSED = [
  {id:'CAMP-091',customer:'Geeta Nair',location:'Bangalore',product:'Health Insurance',reason:'Female customer underserved region'},
  {id:'CAMP-092',customer:'Meena Iyer',location:'Pune',product:'Term Life',reason:'Female customer receiving lower quality offer'},
  {id:'CAMP-093',customer:'Lakshmi R.',location:'Chennai',product:'Car Insurance',reason:'Regional bias detected'},
  {id:'CAMP-094',customer:'Priya D.',location:'Bangalore',product:'Home Insurance',reason:'Female customer underserved region'},
  {id:'CAMP-095',customer:'Anjali M.',location:'Chennai',product:'Child Health',reason:'Intersecting bias: gender + region'},
];

export default function BiasAlert() {
  const [state,setState]=useState('normal'); // normal | injecting | biased | fixing | fixed
  const [data,setData]=useState(NORMAL);
  const [paused,setPaused]=useState([]);
  const [log,setLog]=useState([]);
  const [fixProgress,setFixProgress]=useState(0);

  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const addLog=(msg,type='info')=>setLog(p=>[{msg,type,id:Date.now()+Math.random()},...p].slice(0,8));

  const injectBias = async () => {
    setState('injecting');
    addLog('⚠️ Injecting biased training data into campaign algorithm...','warn');
    await sleep(800);
    addLog('⚠️ Gender weight imbalance detected in recommendation engine...','warn');
    await sleep(800);
    addLog('⚠️ Regional scoring disparity growing...','warn');
    await sleep(800);
    setState('biased');
    setData(BIASED);
    addLog('🚨 CRITICAL BIAS DETECTED — System alert triggered!','error');
    addLog('🛑 47 campaigns automatically PAUSED pending review','error');
    setPaused(CAMPAIGNS_PAUSED);
  };

  const fixBias = async () => {
    setState('fixing');
    setFixProgress(0);
    addLog('🔧 Initiating bias correction protocol...','info');
    for(let i=10;i<=100;i+=10){
      await sleep(300);
      setFixProgress(i);
      if(i===30) addLog('✅ Rebalancing gender recommendation weights...','success');
      if(i===60) addLog('✅ Correcting regional scoring disparities...','success');
      if(i===90) addLog('✅ Retraining fairness model on balanced dataset...','success');
    }
    await sleep(400);
    setState('fixed');
    setData(NORMAL);
    setPaused([]);
    addLog('🎉 Bias correction complete! All campaigns resumed.','success');
    addLog('✅ Fairness score restored: 94/100','success');
  };

  const reset=()=>{ setState('normal');setData(NORMAL);setPaused([]);setLog([]);setFixProgress(0); };

  const isBiased = state==='biased'||state==='fixing';
  const scoreColor = data.score>=80?'#10B981':data.score>=60?'#F59E0B':'#EF4444';
  const barColor = isBiased?'#EF4444':'#3B82F6';

  return (
    <div style={{padding:'24px',maxWidth:'1400px',margin:'0 auto'}}>
      <div style={{marginBottom:'18px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h2 style={{fontSize:'26px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>🚨 Bias Alert System</h2>
          <p style={{color:'#64748B',fontSize:'14px',margin:0}}>Real-time bias detection — when TrustAI finds unfairness, it automatically stops campaigns and alerts humans</p>
        </div>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
          {state==='normal'&&<button onClick={injectBias} style={{background:'#EF4444',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',cursor:'pointer',fontWeight:'700',fontSize:'13px'}}>🚨 Simulate Bias Injection</button>}
          {state==='biased'&&<button onClick={fixBias} style={{background:'#10B981',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',cursor:'pointer',fontWeight:'700',fontSize:'13px'}}>🔧 Fix Bias Now</button>}
          {(state==='fixed')&&<button onClick={reset} style={{background:'#64748B',color:'white',border:'none',padding:'10px 18px',borderRadius:'8px',cursor:'pointer',fontWeight:'700',fontSize:'13px'}}>🔄 Reset Demo</button>}
        </div>
      </div>

      {/* CRITICAL ALERT BANNER */}
      {isBiased&&(
        <div style={{background:'#FEF2F2',border:'3px solid #EF4444',borderRadius:'14px',padding:'18px 22px',marginBottom:'18px',animation:'pulse 1.5s infinite'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <span style={{fontSize:'36px'}}>🚨</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:'900',color:'#DC2626',fontSize:'18px',letterSpacing:'-0.5px'}}>CRITICAL BIAS DETECTED — IMMEDIATE ACTION REQUIRED</div>
              <div style={{color:'#7F1D1D',fontSize:'13px',marginTop:'4px'}}>
                Female customers receiving 68% lower quality offers • Southern region customers severely underserved • {state==='fixing'?'Fixing...':'47 campaigns PAUSED automatically'}
              </div>
            </div>
            <div style={{background:'#EF4444',color:'white',padding:'10px 16px',borderRadius:'8px',fontWeight:'800',fontSize:'14px',textAlign:'center'}}>
              {state==='fixing'?`FIXING ${fixProgress}%`:'ACTION\nNEEDED'}
            </div>
          </div>
          {state==='fixing'&&(
            <div style={{marginTop:'12px'}}>
              <div style={{background:'#FEE2E2',borderRadius:'20px',height:'8px',overflow:'hidden'}}>
                <div style={{background:'#10B981',height:'100%',borderRadius:'20px',width:`${fixProgress}%`,transition:'width 0.3s ease'}}/>
              </div>
              <div style={{color:'#DC2626',fontSize:'12px',marginTop:'4px',fontWeight:'600'}}>Bias correction: {fixProgress}% complete</div>
            </div>
          )}
        </div>
      )}

      {/* SUCCESS BANNER */}
      {state==='fixed'&&(
        <div style={{background:'#F0FDF4',border:'2px solid #86EFAC',borderRadius:'14px',padding:'16px 22px',marginBottom:'18px',display:'flex',alignItems:'center',gap:'14px',animation:'fadeIn 0.5s ease'}}>
          <span style={{fontSize:'32px'}}>✅</span>
          <div>
            <div style={{fontWeight:'800',color:'#065F46',fontSize:'16px'}}>Bias Corrected Successfully!</div>
            <div style={{color:'#166534',fontSize:'13px',marginTop:'2px'}}>All fairness checks passing. 47 paused campaigns resumed. Fairness score restored to 94/100.</div>
          </div>
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 300px',gap:'16px',marginBottom:'16px'}}>

        {/* Score */}
        <div style={{background:isBiased?'linear-gradient(135deg,#7F1D1D,#EF4444)':'linear-gradient(135deg,#065F46,#10B981)',borderRadius:'14px',padding:'24px',color:'white',textAlign:'center',transition:'all 0.5s'}}>
          <div style={{fontSize:'18px',opacity:0.85,marginBottom:'8px'}}>Overall Fairness Score</div>
          <div style={{fontSize:'72px',fontWeight:'900',lineHeight:1,transition:'all 0.5s'}}>{data.score}</div>
          <div style={{fontSize:'20px',opacity:0.8}}>/100</div>
          <div style={{background:'rgba(255,255,255,0.2)',borderRadius:'20px',padding:'8px 16px',display:'inline-block',marginTop:'14px',fontWeight:'800',fontSize:'16px'}}>
            {isBiased?'⚠️ BIASED':state==='fixed'?'✅ RESTORED':'✅ FAIR'}
          </div>
        </div>

        {/* Gender chart */}
        <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)',border:isBiased?'2px solid #FCA5A5':'2px solid #BBF7D0',transition:'border 0.5s'}}>
          <h4 style={{margin:'0 0 12px',color:isBiased?'#DC2626':'#065F46',fontSize:'14px',display:'flex',alignItems:'center',gap:'6px'}}>
            {isBiased?'⚠️':'✅'} Gender Conversion Rate
          </h4>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data.gender}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="name" tick={{fontSize:12}}/>
              <YAxis tick={{fontSize:11}} domain={[0,16]}/>
              <Tooltip/>
              <Bar dataKey="rate" fill={barColor} radius={[6,6,0,0]} name="Conversion %"/>
            </BarChart>
          </ResponsiveContainer>
          {isBiased&&(
            <div style={{background:'#FEF2F2',borderRadius:'6px',padding:'8px',marginTop:'8px',fontSize:'11px',color:'#DC2626',fontWeight:'600'}}>
              ⚠️ Male: 12.8% vs Female: 4.1% — 212% disparity! Unacceptable.
            </div>
          )}
        </div>

        {/* Live Log */}
        <div style={{background:'#0F172A',borderRadius:'14px',padding:'16px',display:'flex',flexDirection:'column'}}>
          <div style={{color:'rgba(255,255,255,0.5)',fontSize:'10px',fontFamily:'monospace',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'10px'}}>
            ● SYSTEM LOG
          </div>
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:'6px'}}>
            {log.length===0&&(
              <div style={{color:'rgba(255,255,255,0.2)',fontSize:'11px',fontFamily:'monospace',marginTop:'10px'}}>
                Waiting for events...<br/>Click "Simulate Bias" to start
              </div>
            )}
            {log.map(l=>(
              <div key={l.id} style={{fontSize:'11px',fontFamily:'monospace',lineHeight:'1.4',color:l.type==='error'?'#FCA5A5':l.type==='warn'?'#FDE68A':l.type==='success'?'#6EE7B7':'#93C5FD',animation:'fadeIn 0.3s ease'}}>
                {l.msg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region chart + Paused campaigns */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
        <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)',border:isBiased?'2px solid #FCA5A5':'2px solid #BBF7D0',transition:'border 0.5s'}}>
          <h4 style={{margin:'0 0 12px',color:isBiased?'#DC2626':'#065F46',fontSize:'14px'}}>
            {isBiased?'⚠️':'✅'} Regional Conversion Rate
          </h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data.region}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="name" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}} domain={[0,18]}/>
              <Tooltip/>
              <Bar dataKey="rate" fill={isBiased?'#EF4444':'#8B5CF6'} radius={[6,6,0,0]} name="Conversion %"/>
            </BarChart>
          </ResponsiveContainer>
          {isBiased&&<div style={{background:'#FEF2F2',borderRadius:'6px',padding:'8px',marginTop:'6px',fontSize:'11px',color:'#DC2626',fontWeight:'600'}}>⚠️ Mumbai/Delhi: ~14% vs Bangalore/Pune/Chennai: ~3% — 4.5x regional disparity!</div>}
        </div>

        <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
          <h4 style={{margin:'0 0 12px',color:'#1E293B',fontSize:'14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            🛑 Auto-Paused Campaigns
            {paused.length>0&&<span style={{background:'#EF4444',color:'white',padding:'2px 8px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{paused.length} PAUSED</span>}
          </h4>
          {paused.length===0?(
            <div style={{textAlign:'center',padding:'30px',color:'#94A3B8'}}>
              <div style={{fontSize:'36px',marginBottom:'8px'}}>✅</div>
              <div style={{fontSize:'13px'}}>All campaigns running normally</div>
            </div>
          ):(
            <div style={{display:'flex',flexDirection:'column',gap:'8px',maxHeight:'220px',overflowY:'auto'}}>
              {paused.map((p,i)=>(
                <div key={i} style={{padding:'10px 12px',background:'#FEF2F2',borderRadius:'8px',borderLeft:'3px solid #EF4444',display:'flex',justifyContent:'space-between',alignItems:'center',animation:'fadeIn 0.3s ease'}}>
                  <div>
                    <div style={{fontWeight:'700',color:'#1E293B',fontSize:'13px'}}>{p.customer}</div>
                    <div style={{color:'#64748B',fontSize:'11px'}}>{p.product} • {p.location}</div>
                    <div style={{color:'#EF4444',fontSize:'10px',marginTop:'2px'}}>{p.reason}</div>
                  </div>
                  <span style={{background:'#EF4444',color:'white',padding:'3px 8px',borderRadius:'6px',fontSize:'10px',fontWeight:'700',flexShrink:0}}>PAUSED</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}

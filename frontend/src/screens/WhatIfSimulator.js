import { useState } from 'react';

const PRODUCTS = {just_married:'Family Health Insurance 💍',bought_car:'Comprehensive Car Insurance 🚗',had_baby:'Child Health Insurance 👶',bought_house:'Home Protection Insurance 🏠',new_job:'Term Life Insurance 💼'};
const CHANNELS = {WhatsApp:{rate:52,emoji:'💬'},Email:{rate:38,emoji:'📧'},SMS:{rate:45,emoji:'📱'},'App Notification':{rate:48,emoji:'🔔'}};
const TIMES = {'Morning (8-10 AM)':{boost:1.1},'Afternoon (12-2 PM)':{boost:0.85},'Evening (6-8 PM)':{boost:1.05},'Weekend Morning':{boost:1.2},'Weekend Evening':{boost:1.0}};
const DISCOUNTS = {'No Discount':{conv:0.06},'10% Off':{conv:0.07},'20% Off':{conv:0.08},'25% Off':{conv:0.09},'30% Off':{conv:0.095}};
const EVENTS = ['just_married','bought_car','had_baby','bought_house','new_job'];
const AGES = [[20,25],[26,30],[31,35],[36,45],[46,60]];
const LOCATIONS = ['Mumbai','Delhi','Bangalore','Pune','Chennai','Hyderabad'];

const MESSAGES = {
  just_married:(name,ch,disc)=>`Congratulations on your wedding, ${name}! 🎉💍\nOur *Family Health Insurance* keeps both of you protected.\n${disc!=='No Discount'?`✨ Special ${disc} for newlyweds!`:'Explore our plans today!'}`,
  bought_car:(name,ch,disc)=>`Congrats on your new car, ${name}! 🚗✨\nProtect it with *Comprehensive Car Insurance*.\n${disc!=='No Discount'?`🎁 ${disc} for new vehicles!`:'Get covered today!'}`,
  had_baby:(name,ch,disc)=>`Welcome to parenthood, ${name}! 👶💕\n*Child Health Insurance* covers from day one.\n${disc!=='No Discount'?`🎁 ${disc} — your baby deserves the best!`:'Secure your baby today!'}`,
  bought_house:(name,ch,disc)=>`Congrats on your new home, ${name}! 🏠\nProtect it with *Home Protection Insurance*.\n${disc!=='No Discount'?`🎁 ${disc} for new homeowners!`:'Get a free quote today!'}`,
  new_job:(name,ch,disc)=>`Congrats on the new job, ${name}! 💼🌟\nLock in lowest rates with *Term Life Insurance*.\n${disc!=='No Discount'?`🎁 ${disc} first-job discount!`:'Secure your future today!'}`,
};

export default function WhatIfSimulator() {
  const [params, setParams] = useState({name:'Priya',event:'just_married',ageRange:0,location:'Mumbai',channel:'WhatsApp',time:'Weekend Morning',discount:'20% Off'});
  const [generated, setGenerated] = useState(false);

  const set = (k,v) => { setParams(p=>({...p,[k]:v})); setGenerated(false); };

  const ch = CHANNELS[params.channel];
  const t = TIMES[params.time];
  const d = DISCOUNTS[params.discount];
  const openRate = Math.round(ch.rate * t.boost);
  const convRate = (d.conv * t.boost * 100).toFixed(1);
  const msg = (MESSAGES[params.event]||MESSAGES.just_married)(params.name,params.channel,params.discount);
  const product = PRODUCTS[params.event]||PRODUCTS.just_married;

  const scoreColor = openRate>=45?'#10B981':openRate>=35?'#F59E0B':'#EF4444';
  const grade = openRate>=45?'A+':openRate>=40?'A':openRate>=35?'B+':'B';

  return (
    <div style={{padding:'24px',maxWidth:'1300px',margin:'0 auto'}}>
      <div style={{marginBottom:'20px'}}>
        <h2 style={{fontSize:'26px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>🔄 What If Simulator</h2>
        <p style={{color:'#64748B',fontSize:'14px',margin:0}}>Adjust any parameter and instantly see how the AI campaign changes — try different combos to find the best strategy!</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'380px 1fr',gap:'20px'}}>

        {/* Controls */}
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>

          {/* Name */}
          <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
            <label style={{fontSize:'12px',color:'#64748B',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:'8px'}}>Customer Name</label>
            <input value={params.name} onChange={e=>set('name',e.target.value)} style={{width:'100%',padding:'10px 12px',borderRadius:'8px',border:'2px solid #E2E8F0',fontSize:'14px',fontWeight:'600',outline:'none',boxSizing:'border-box'}} placeholder="Enter name"/>
          </div>

          {/* Life Event */}
          <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
            <label style={{fontSize:'12px',color:'#64748B',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:'10px'}}>Life Event</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'7px'}}>
              {EVENTS.map(e=>(
                <div key={e} onClick={()=>set('event',e)} style={{padding:'9px',borderRadius:'8px',border:`2px solid ${params.event===e?'#3B82F6':'#F1F5F9'}`,background:params.event===e?'#EFF6FF':'#FAFAFA',cursor:'pointer',textAlign:'center',fontSize:'12px',fontWeight:'600',color:params.event===e?'#1D4ED8':'#64748B',transition:'all 0.15s'}}>
                  {PRODUCTS[e].split(' ').slice(-1)[0]} {e.replace(/_/g,' ')}
                </div>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
            <label style={{fontSize:'12px',color:'#64748B',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:'10px'}}>Channel</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'7px'}}>
              {Object.entries(CHANNELS).map(([k,v])=>(
                <div key={k} onClick={()=>set('channel',k)} style={{padding:'9px',borderRadius:'8px',border:`2px solid ${params.channel===k?'#8B5CF6':'#F1F5F9'}`,background:params.channel===k?'#F5F3FF':'#FAFAFA',cursor:'pointer',textAlign:'center',fontSize:'12px',fontWeight:'600',color:params.channel===k?'#7C3AED':'#64748B',transition:'all 0.15s'}}>
                  {v.emoji} {k}
                </div>
              ))}
            </div>
          </div>

          {/* Timing */}
          <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
            <label style={{fontSize:'12px',color:'#64748B',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:'10px'}}>Send Timing</label>
            <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
              {Object.keys(TIMES).map(t=>(
                <div key={t} onClick={()=>set('time',t)} style={{padding:'8px 12px',borderRadius:'7px',border:`2px solid ${params.time===t?'#10B981':'#F1F5F9'}`,background:params.time===t?'#ECFDF5':'#FAFAFA',cursor:'pointer',fontSize:'13px',fontWeight:'600',color:params.time===t?'#065F46':'#64748B',transition:'all 0.15s',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  {t}
                  {params.time===t&&<span style={{fontSize:'10px',background:'#10B981',color:'white',padding:'1px 6px',borderRadius:'4px'}}>SELECTED</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
            <label style={{fontSize:'12px',color:'#64748B',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:'10px'}}>Discount Offer</label>
            <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
              {Object.keys(DISCOUNTS).map(d=>(
                <div key={d} onClick={()=>set('discount',d)} style={{padding:'8px 12px',borderRadius:'7px',border:`2px solid ${params.discount===d?'#F59E0B':'#F1F5F9'}`,background:params.discount===d?'#FFFBEB':'#FAFAFA',cursor:'pointer',fontSize:'13px',fontWeight:'600',color:params.discount===d?'#92400E':'#64748B',transition:'all 0.15s'}}>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>

          {/* Score */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px'}}>
            {[
              {label:'Est. Open Rate',value:`${openRate}%`,color:scoreColor,sub:'Based on channel+time'},
              {label:'Est. Conversion',value:`${convRate}%`,color:'#8B5CF6',sub:'Based on all params'},
              {label:'Campaign Grade',value:grade,color:scoreColor,sub:'Overall effectiveness'},
              {label:'Channel Score',value:`${ch.rate}%`,color:'#3B82F6',sub:`${params.channel} avg rate`},
            ].map((s,i)=>(
              <div key={i} style={{background:'white',borderRadius:'12px',padding:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)',textAlign:'center',borderTop:`4px solid ${s.color}`}}>
                <div style={{fontSize:'28px',fontWeight:'800',color:s.color}}>{s.value}</div>
                <div style={{color:'#1E293B',fontSize:'12px',fontWeight:'600',marginTop:'2px'}}>{s.label}</div>
                <div style={{color:'#94A3B8',fontSize:'10px',marginTop:'3px'}}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Message preview */}
          <div style={{background:'white',borderRadius:'14px',padding:'22px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <h3 style={{margin:0,color:'#1E293B',fontSize:'16px'}}>💬 Live Message Preview</h3>
              <div style={{display:'flex',gap:'8px'}}>
                <span style={{background:'#EFF6FF',color:'#1D4ED8',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>
                  {ch.emoji} {params.channel}
                </span>
                <span style={{background:'#F5F3FF',color:'#7C3AED',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>
                  ⏰ {params.time}
                </span>
              </div>
            </div>

            {/* Phone mockup */}
            <div style={{maxWidth:'340px',margin:'0 auto'}}>
              <div style={{background:'#1E293B',borderRadius:'20px',padding:'8px',boxShadow:'0 8px 24px rgba(0,0,0,0.2)'}}>
                <div style={{background:'#F8FAFC',borderRadius:'14px',overflow:'hidden'}}>
                  <div style={{background:'#25D366',padding:'10px 14px',display:'flex',alignItems:'center',gap:'8px'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>🏥</div>
                    <div>
                      <div style={{color:'white',fontWeight:'700',fontSize:'13px'}}>TrustAI Insurance</div>
                      <div style={{color:'rgba(255,255,255,0.8)',fontSize:'11px'}}>Online</div>
                    </div>
                  </div>
                  <div style={{padding:'14px',background:'#E5DDD5',minHeight:'120px'}}>
                    <div style={{background:'white',borderRadius:'8px 8px 8px 0',padding:'10px 12px',maxWidth:'85%',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
                      <p style={{margin:0,fontSize:'13px',lineHeight:'1.5',color:'#1E293B',whiteSpace:'pre-line'}}>{msg}</p>
                      <div style={{color:'#94A3B8',fontSize:'10px',textAlign:'right',marginTop:'4px'}}>{params.time} ✓✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div style={{background:'linear-gradient(135deg,#1E3A8A,#3B82F6)',borderRadius:'14px',padding:'20px',color:'white'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:'13px',opacity:0.8,marginBottom:'4px'}}>Recommended Product</div>
                <div style={{fontSize:'20px',fontWeight:'800'}}>{product}</div>
                <div style={{opacity:0.8,fontSize:'13px',marginTop:'4px'}}>Discount: <strong>{params.discount}</strong></div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'36px',fontWeight:'800',color:openRate>=40?'#86EFAC':'#FCA5A5'}}>{openRate}%</div>
                <div style={{fontSize:'12px',opacity:0.7}}>Expected Open Rate</div>
                <div style={{background:'rgba(255,255,255,0.2)',borderRadius:'20px',padding:'3px 10px',fontSize:'11px',fontWeight:'700',marginTop:'4px',display:'inline-block'}}>Grade: {grade}</div>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div style={{background:'#FFFBEB',border:'1px solid #FCD34D',borderRadius:'12px',padding:'14px 18px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
            <span style={{fontSize:'20px'}}>💡</span>
            <div>
              <div style={{fontWeight:'700',color:'#92400E',fontSize:'13px',marginBottom:'3px'}}>Best Combo Found!</div>
              <div style={{color:'#78350F',fontSize:'12px'}}>
                <strong>Weekend Morning + WhatsApp + 20% Discount</strong> gives the highest open rate of ~62% for most life events. Try it!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

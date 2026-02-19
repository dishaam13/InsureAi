import { useState, useEffect } from 'react';

function Counter({target,duration=2000,suffix='',color='#1E293B'}){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    let start=null;
    const step=ts=>{
      if(!start)start=ts;
      const progress=Math.min((ts-start)/duration,1);
      setVal(Math.floor(progress*target));
      if(progress<1)requestAnimationFrame(step);
    };
    const t=setTimeout(()=>requestAnimationFrame(step),200);
    return()=>clearTimeout(t);
  },[target]);
  return <span style={{color,fontWeight:'800'}}>{val}{suffix}</span>;
}

export default function BeforeAfter() {
  const [started,setStarted]=useState(false);
  const [tab,setTab]=useState('priya');

  const customers={
    priya:{icon:'👰',name:'Priya',event:'Just Married',
      before:{msg:"Dear Customer,\n\nWe are pleased to inform you about our insurance products. Please consider purchasing a policy today.\n\nClick here for more information.\n\nRegards,\nInsurance Co.",channel:'📧 Bulk Email',time:'Tuesday 2:00 PM (random)',product:'Random Product Blast',open:2,conv:0.5,sat:28,relevant:false},
      after:{msg:"Congratulations on your wedding, Priya! 🎉💍\nStarting your new journey together?\nOur Family Health Insurance keeps both of you protected with cashless hospitalization & maternity coverage.\n✨ 20% Newlywed Discount!\nReply YES to know more! 💙",channel:'💬 WhatsApp (preferred)',time:'Saturday 10 AM (optimal)',product:'Family Health Insurance',open:43,conv:8,sat:87,relevant:true},
    },
    rahul:{icon:'🧑',name:'Rahul',event:'Bought Car',
      before:{msg:"Dear Valued Customer,\n\nExplore our range of insurance solutions today! We have health, life, home and vehicle plans available.\n\nBest regards,\nTeam Insurance",channel:'📧 Bulk Email',time:'Monday 9:00 AM (random)',product:'Generic Insurance Blast',open:3,conv:0.8,sat:31,relevant:false},
      after:{msg:"Congrats on your new car, Rahul! 🚗✨\nYour new ride deserves the best protection!\nOur Comprehensive Car Insurance covers accidents, theft & roadside assistance.\n🎁 15% New Vehicle Discount!\nReply YES to protect your car today!",channel:'📧 Email (preferred)',time:'Sunday 8 PM (optimal)',product:'Comprehensive Car Insurance',open:38,conv:9,sat:89,relevant:true},
    },
  };

  const c=customers[tab];

  return(
    <div style={{padding:'24px',maxWidth:'1300px',margin:'0 auto'}}>
      <div style={{marginBottom:'20px'}}>
        <h2 style={{fontSize:'26px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>📊 Before vs After</h2>
        <p style={{color:'#64748B',fontSize:'14px',margin:0}}>The dramatic difference between generic marketing and TrustAI's personalized approach</p>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        {Object.entries(customers).map(([k,v])=>(
          <button key={k} onClick={()=>setTab(k)} style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 18px',borderRadius:'10px',border:`2px solid ${tab===k?'#3B82F6':'#E2E8F0'}`,background:tab===k?'#EFF6FF':'white',cursor:'pointer',fontWeight:'700',fontSize:'13px',color:tab===k?'#1D4ED8':'#64748B'}}>
            <span style={{fontSize:'20px'}}>{v.icon}</span>{v.name} — {v.event}
          </button>
        ))}
        <button onClick={()=>setStarted(true)} style={{marginLeft:'auto',background:'linear-gradient(135deg,#1E3A8A,#3B82F6)',color:'white',border:'none',padding:'10px 20px',borderRadius:'10px',cursor:'pointer',fontWeight:'700',fontSize:'13px'}}>
          {started?'🔄 Replay Animation':'▶️ Start Comparison'}
        </button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>

        {/* BEFORE */}
        <div style={{background:'white',borderRadius:'16px',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.07)',border:'2px solid #FEE2E2'}}>
          <div style={{background:'linear-gradient(135deg,#7F1D1D,#EF4444)',padding:'16px 20px',color:'white'}}>
            <div style={{fontSize:'28px',fontWeight:'800',marginBottom:'2px'}}>❌ OLD WAY</div>
            <div style={{opacity:0.85,fontSize:'13px'}}>Generic, spray-and-pray marketing</div>
          </div>
          <div style={{padding:'20px'}}>
            {/* Generic message */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'11px',color:'#94A3B8',fontWeight:'700',textTransform:'uppercase',marginBottom:'8px'}}>📧 Generic Message Sent</div>
              <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'10px',padding:'14px'}}>
                <p style={{margin:0,fontSize:'13px',color:'#7F1D1D',lineHeight:'1.6',whiteSpace:'pre-line',fontFamily:'monospace'}}>{c.before.msg}</p>
              </div>
            </div>
            {/* Meta */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'16px'}}>
              {[['Channel',c.before.channel],['Timing',c.before.time],['Product',c.before.product],['Personalized','❌ Not at all']].map(([k,v])=>(
                <div key={k} style={{background:'#FEF2F2',borderRadius:'8px',padding:'10px'}}>
                  <div style={{fontSize:'10px',color:'#EF4444',fontWeight:'700',textTransform:'uppercase',marginBottom:'3px'}}>{k}</div>
                  <div style={{fontSize:'12px',color:'#7F1D1D',fontWeight:'600'}}>{v}</div>
                </div>
              ))}
            </div>
            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px'}}>
              {[['Open Rate',c.before.open,'%','#EF4444'],['Conversion',c.before.conv,'%','#EF4444'],['Satisfaction',c.before.sat,'/100','#EF4444']].map(([label,val,suf,color])=>(
                <div key={label} style={{background:'#FEF2F2',borderRadius:'8px',padding:'12px',textAlign:'center',border:'1px solid #FECACA'}}>
                  <div style={{fontSize:'22px',fontWeight:'800',color}}>{started?<Counter target={val} suffix={suf} color={color}/>:`0${suf}`}</div>
                  <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AFTER */}
        <div style={{background:'white',borderRadius:'16px',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.07)',border:'2px solid #BBF7D0'}}>
          <div style={{background:'linear-gradient(135deg,#065F46,#10B981)',padding:'16px 20px',color:'white'}}>
            <div style={{fontSize:'28px',fontWeight:'800',marginBottom:'2px'}}>✅ TRUSTAI</div>
            <div style={{opacity:0.85,fontSize:'13px'}}>Personalized, ethical, intelligent marketing</div>
          </div>
          <div style={{padding:'20px'}}>
            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'11px',color:'#94A3B8',fontWeight:'700',textTransform:'uppercase',marginBottom:'8px'}}>💬 Personalized Message</div>
              <div style={{background:'#F0FDF4',border:'1px solid #86EFAC',borderRadius:'10px',padding:'14px'}}>
                <p style={{margin:0,fontSize:'13px',color:'#065F46',lineHeight:'1.6',whiteSpace:'pre-line'}}>{c.after.msg}</p>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'16px'}}>
              {[['Channel',c.after.channel],['Timing',c.after.time],['Product',c.after.product],['Personalized','✅ 100% Tailored']].map(([k,v])=>(
                <div key={k} style={{background:'#F0FDF4',borderRadius:'8px',padding:'10px'}}>
                  <div style={{fontSize:'10px',color:'#10B981',fontWeight:'700',textTransform:'uppercase',marginBottom:'3px'}}>{k}</div>
                  <div style={{fontSize:'12px',color:'#065F46',fontWeight:'600'}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px'}}>
              {[['Open Rate',c.after.open,'%','#10B981'],['Conversion',c.after.conv,'%','#10B981'],['Satisfaction',c.after.sat,'/100','#10B981']].map(([label,val,suf,color])=>(
                <div key={label} style={{background:'#F0FDF4',borderRadius:'8px',padding:'12px',textAlign:'center',border:'1px solid #86EFAC'}}>
                  <div style={{fontSize:'22px',fontWeight:'800',color}}>{started?<Counter target={val} suffix={suf} color={color}/>:`0${suf}`}</div>
                  <div style={{fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Row */}
      {started&&(
        <div style={{background:'linear-gradient(135deg,#1E3A8A,#7C3AED)',borderRadius:'16px',padding:'24px',color:'white',animation:'fadeIn 0.5s ease'}}>
          <h3 style={{margin:'0 0 16px',fontSize:'18px',textAlign:'center'}}>🚀 TrustAI Improvement Summary</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}}>
            {[
              {label:'Open Rate',before:c.before.open,after:c.after.open,suffix:'%',mult:Math.round(c.after.open/c.before.open*10)/10},
              {label:'Conversion',before:c.before.conv,after:c.after.conv,suffix:'%',mult:Math.round(c.after.conv/c.before.conv*10)/10},
              {label:'Satisfaction',before:c.before.sat,after:c.after.sat,suffix:'',mult:Math.round(c.after.sat/c.before.sat*10)/10},
              {label:'Relevance',before:'Generic',after:'Personal',suffix:'',mult:'∞'},
            ].map((s,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.15)',borderRadius:'12px',padding:'16px',textAlign:'center'}}>
                <div style={{fontSize:'28px',fontWeight:'800',color:'#86EFAC'}}>{s.mult}x</div>
                <div style={{fontWeight:'700',fontSize:'14px',marginTop:'2px'}}>{s.label}</div>
                <div style={{opacity:0.7,fontSize:'12px',marginTop:'4px'}}>
                  {typeof s.before==='number'?`${s.before}${s.suffix} → ${s.after}${s.suffix}`:`${s.before} → ${s.after}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

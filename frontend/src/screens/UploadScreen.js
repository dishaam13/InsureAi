import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const API = 'http://localhost:8000';

// Parse CSV to extract customer data
function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const customers = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length < headers.length) continue;
    
    const customer = {};
    headers.forEach((header, idx) => {
      customer[header] = values[idx];
    });
    
    // Ensure required fields and add defaults
    customer.id = customer.id || i;
    customer.name = customer.name || `Customer ${i}`;
    customer.age = parseInt(customer.age) || 30;
    customer.location = customer.location || 'Unknown';
    customer.life_event = customer.life_event || 'new_customer';
    customer.channel = customer.channel || 'WhatsApp';
    customer.icon = customer.gender === 'female' ? '👩' : customer.gender === 'male' ? '👨' : '👤';
    customer.best_time = customer.best_time || 'Morning';
    customer.segment = customer.segment || 'single_young';
    customer.marital_status = customer.marital_status || 'Single';
    customer.dependents = customer.dependents || '0';
    customer.income = parseInt(customer.income) || 500000;
    customer.confidence = parseInt(customer.confidence) || 85;
    
    customers.push(customer);
  }
  
  return customers;
}

export default function UploadScreen({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a CSV file first');
      return;
    }

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setUploading(true);
    setError('');

    // Parse CSV locally
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const customers = parseCSV(text);
        
        if (customers.length === 0) {
          setError('No valid customer data found in CSV');
          setUploading(false);
          return;
        }
        
        setTimeout(() => {
          onUploadSuccess({
            success: true,
            total: customers.length,
            customers: customers, // Pass actual customer data!
            message: `Successfully loaded ${customers.length} customers`
          });
        }, 800);
      } catch (err) {
        setError('Failed to parse CSV file: ' + err.message);
        setUploading(false);
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read file');
      setUploading(false);
    };
    
    reader.readAsText(file);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Animated background elements */}
      <div style={{position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 20s ease-in-out infinite'}} />
      <div style={{position: 'absolute', bottom: '15%', right: '10%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(80px)', animation: 'float 25s ease-in-out infinite reverse'}} />
      <div style={{position: 'absolute', top: '50%', left: '50%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', filter: 'blur(40px)', animation: 'pulse 10s ease-in-out infinite'}} />

      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '50px 40px',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)',
        position: 'relative',
        zIndex: 1
      }}>

        {/* Logo and Title */}
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
            animation: 'float 3s ease-in-out infinite'
          }}>
            <div style={{fontSize: '40px'}}>🤖</div>
          </div>
          
          <h1 style={{
            fontSize: '36px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
            letterSpacing: '-1px'
          }}>
            TrustAI
          </h1>
          
          <p style={{fontSize: '16px', color: '#64748B', marginBottom: '8px'}}>
            Ethical Insurance Marketing Agent
          </p>

          <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', borderRadius: '20px', border: '1px solid rgba(102, 126, 234, 0.2)'}}>
            <div style={{width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite'}} />
            <span style={{fontSize: '13px', fontWeight: '600', color: '#667eea'}}>System Ready</span>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: dragActive ? '3px dashed #667eea' : file ? '3px solid #10B981' : '3px dashed #E2E8F0',
            borderRadius: '20px',
            padding: '50px 30px',
            textAlign: 'center',
            background: dragActive ? 'rgba(102, 126, 234, 0.05)' : file ? 'rgba(16, 185, 129, 0.05)' : '#F8FAFC',
            transition: 'all 0.3s',
            cursor: 'pointer',
            position: 'relative',
            marginBottom: '24px'
          }}
          onClick={() => !file && document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleChange}
            style={{display: 'none'}}
          />

          {!file && !uploading && (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}>
                <Upload size={36} color="white" strokeWidth={2.5} />
              </div>
              
              <p style={{fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '8px'}}>
                {dragActive ? 'Drop your CSV file here' : 'Upload Customer Dataset'}
              </p>
              
              <p style={{fontSize: '14px', color: '#64748B', marginBottom: '16px'}}>
                Drag and drop or click to browse
              </p>

              <div style={{display: 'inline-block', padding: '8px 16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '20px', fontSize: '12px', color: '#667eea', fontWeight: '600'}}>
                📄 Supports: .csv files
              </div>
            </>
          )}

          {file && !uploading && (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <FileText size={36} color="white" strokeWidth={2.5} />
              </div>
              
              <p style={{fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '4px'}}>
                {file.name}
              </p>
              <p style={{fontSize: '14px', color: '#64748B'}}>
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </>
          )}

          {uploading && (
            <>
              <div style={{
                width: '80px',
                height: '80px',
                border: '4px solid #E2E8F0',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                margin: '0 auto 20px',
                animation: 'spin 1s linear infinite'
              }} />
              
              <p style={{fontSize: '18px', fontWeight: '700', color: '#667eea'}}>
                Processing your data...
              </p>
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '16px 20px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'shake 0.5s'
          }}>
            <AlertCircle size={20} color="#EF4444" />
            <span style={{color: '#DC2626', fontSize: '14px', fontWeight: '600'}}>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{display: 'flex', gap: '12px'}}>
          {file && !uploading && (
            <button
              onClick={() => {setFile(null); setError('');}}
              style={{
                flex: 1,
                padding: '16px',
                background: '#F1F5F9',
                border: '2px solid #E2E8F0',
                borderRadius: '12px',
                color: '#64748B',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Remove File
            </button>
          )}
          
          <button
            onClick={uploadFile}
            disabled={!file || uploading}
            style={{
              flex: 1,
              padding: '16px 32px',
              background: file && !uploading ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#E2E8F0',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              cursor: file && !uploading ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              boxShadow: file && !uploading ? '0 10px 30px rgba(102, 126, 234, 0.4)' : 'none',
              opacity: file && !uploading ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {uploading ? (
              'Processing...'
            ) : (
              <>
                <CheckCircle size={20} />
                Start Analysis
              </>
            )}
          </button>
        </div>

        {/* Info Section */}
        <div style={{marginTop: '32px', padding: '20px', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)', borderRadius: '16px', border: '1px solid rgba(102, 126, 234, 0.1)'}}>
          <p style={{fontSize: '13px', fontWeight: '600', color: '#667eea', marginBottom: '12px'}}>📌 Dataset Requirements:</p>
          <ul style={{margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#64748B', lineHeight: '1.8'}}>
            <li>CSV format with customer data</li>
            <li>Columns: id, name, age, location, life_event, channel</li>
            <li>Sample template included: customer_template.csv</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.95); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

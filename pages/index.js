import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    fetch('/api/ping')
      .then(res => res.json())
      .then(data => {
        if (data.connected) setStatus('✅ Connected to MongoDB!');
        else setStatus('❌ Connection failed');
      })
      .catch(() => setStatus('❌ Connection error'));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>MongoDB Connection Status</h1>
      <p>{status}</p>
    </div>
  );
}

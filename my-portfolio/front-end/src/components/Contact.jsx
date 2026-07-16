import { useState } from 'react';

const Contact = () => {
  // Quản lý State cho Form
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const executeSubmit = (e) => {
    e.preventDefault(); 
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('[ERROR] Payload không hợp lệ. Hãy điền đầy đủ các trường.');
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus('[ERROR] Email không đúng cấu trúc (thiếu @).');
      return;
    }

    setStatus('[SUCCESS] Connection established! Thông tin của bạn đã được ghi nhận.');
    setFormData({ name: '', email: '', message: '' }); 
  };

  return (
    <section id="contact">
      <h2>&gt; Connect to me : </h2>
      
      {/* Câu giới thiệu tiếng Anh chuẩn IT bạn đã sửa */}
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Reach out to me via email or the channels below:
      </p>
      
      {/* Cụm Icon mạng xã hội của bạn */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '3rem' }}>
        <a href="https://github.com/luanhocuit" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <a href="https://facebook.com/khailuan.trinh.3" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </a>

        <a href="mailto:25521062@gm.uit.edu.vn" style={{ color: 'var(--text-main)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
          </svg>
        </a>
      </div>

      {/* Phần Form được phân cách bởi một đường kẻ */}
      <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '2rem' }}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 'normal' }}>
          &gt;  Direct message for me :
        </h3>
        
        <form onSubmit={executeSubmit} style={{ maxWidth: '500px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent)', fontSize: '0.9rem' }}>$ whoami --input-name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Nhập tên định danh của bạn..." 
              value={formData.name} 
              onChange={handleInput} 
              style={{ margin: 0 }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent)', fontSize: '0.9rem' }}>$ mail --input-address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Nhập địa chỉ email..." 
              value={formData.email} 
              onChange={handleInput} 
              style={{ margin: 0 }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent)', fontSize: '0.9rem' }}>$ write --input-message</label>
            <textarea 
              name="message" 
              placeholder="Nhập nội dung tin nhắn..." 
              rows="4"
              value={formData.message} 
              onChange={handleInput} 
              style={{ margin: 0 }}
            />
          </div>

          {/* Khối hiển thị trạng thái Submit */}
          {status && (
            <div style={{ 
              padding: '0.75rem', 
              marginBottom: '1rem', 
              backgroundColor: status.includes('ERROR') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
              border: `1px solid ${status.includes('ERROR') ? '#ef4444' : '#22c55e'}`,
              color: status.includes('ERROR') ? '#fca5a5' : '#86efac',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              borderRadius: '4px'
            }}>
              {status}
            </div>
          )}

          <button type="submit">Execute Submit</button>
        </form>
      </div>

    </section>
  );
};

export default Contact;
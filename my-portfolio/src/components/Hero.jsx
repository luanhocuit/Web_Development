const Hero = () => {
  // 1. Khai báo hàm handleAlert ở đây (ngay trước return) để tránh lỗi crash web
  const handleAlert = () => {
    alert("Vui lòng chọn phần ./contact ở góc phải đầu trang để lấy thông tin liên hệ nhé !");
  };

  return (
    <section id="about">
      <img src="/Avatar.png" alt="Avatar" style={{ width: '120px', borderRadius: '50%', marginBottom: '1rem' }} />
      <div style={{ 
        fontFamily: "'Consolas', 'Courier New', monospace", 
        fontSize: '1.4rem', 
        fontWeight: 'bold', 
        margin: '1.5rem 0',
        lineHeight: '1.4'
      }}>
        <div style={{ color: 'var(--accent)' }}>
          mov rax, 1   <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 'normal' }}>; sys_write</span>
        </div>
        <div style={{ color: 'var(--accent)' }}>
          mov rdi, 1   <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 'normal' }}>; stdout</span>
        </div>
        <div style={{ color: 'var(--accent)' }}>
          mov rsi, msg <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 'normal' }}>; buffer pointer (addr of "Hello World")</span>
        </div>
        <div style={{ color: 'var(--accent)' }}>
          mov rdx, 15  <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 'normal' }}>; 15 bytes</span>
        </div>
        <div style={{ color: 'var(--accent)' }}>
          syscall      
        </div>
        <div style={{ color: 'var(--text-main)', marginTop: '0.8rem' }}>&gt;&gt; Hello World :3</div>
      </div>
      <h2>Sinh viên ATTT K20 | Trường Đại học Công nghệ thông tin - VNU-HCM </h2>
      <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
        {/* Đam mê phân tích hạ tầng mạng, bảo mật hệ thống và vận hành môi trường Cloud.  */}
        Đây là portfolio của mình cũng như blog chia sẻ những kiến thức mình tiếp thu được trên con đường học tập của mình trong ngành An toàn thông tin này.
      </p>
      
      {/* Thêm marginBottom: '2.5rem' để đẩy nút "Liên hệ ngay" cách xa phần kĩ năng một khoảng vừa mắt */}
      <div style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
        <p><strong>[+] My Skills :</strong> C++, Linux, Networking</p>
        <p><strong>[+] Cyber Security Orientation :</strong> Binary Exploitation, Reverse Engineering</p>
      </div>

      {/* 2. Nút "Liên hệ ngay" gọi đến hàm handleAlert phía trên khi click */}
      <button 
        onClick={handleAlert}
        style={{ 
          padding: '0.75rem 1.5rem', 
          fontSize: '1.1rem', 
          border: '1px solid var(--accent)', 
          backgroundColor: 'transparent',
          color: 'var(--accent)',
          cursor: 'pointer',
          fontFamily: "'Consolas', 'Courier New', monospace",
          fontWeight: 'bold',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent)';
          e.currentTarget.style.color = '#000'; // Đảo màu chữ sang đen khi hover cho nổi bật
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--accent)';
        }}
      >
        &gt; Liên hệ ngay
      </button>
      
    </section>
  );
};

export default Hero;
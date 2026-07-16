import { useState, useEffect } from 'react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]); // Dữ liệu sẽ đổ từ Backend vào đây

  // Định nghĩa URL của Backend đã deploy
  const API_URL = 'https://web-development-ato3.onrender.com';

  // Dùng useEffect để lấy dữ liệu từ server
  useEffect(() => {
    // Nếu có searchTerm thì gọi API tìm kiếm, nếu không thì lấy toàn bộ
    const url = searchTerm 
      ? `${API_URL}/api/projects?search=${searchTerm}` 
      : `${API_URL}/api/projects`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Lỗi khi kết nối Backend:", err));
  }, [searchTerm]); // Mỗi khi searchTerm đổi, nó tự gọi lại API

  return (
    <section id="projects">
      <h2>&gt; Blog : </h2>
      
      <input 
        type="text" 
        placeholder="Grep theo công nghệ (vd: Linux, C++, Assembly)..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {projects.map(proj => (
          <div key={proj.id} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '4px' }}>
            
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>{proj.title}</h3>
            <div style={{ color: 'var(--accent)', marginBottom: '15px', fontSize: '0.9rem' }}>[{proj.tech}]</div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {proj.desc}
            </p>
            
            <a 
              href={proj.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--accent)', 
                textDecoration: 'none', 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                display: 'inline-block'
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              [+] Ấn vào đây để truy cập link Github
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
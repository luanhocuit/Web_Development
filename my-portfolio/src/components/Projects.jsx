import { useState } from 'react';

// Bổ sung thêm link Github
const projectDB = [
  { 
    id: 1, 
    title: 'Pwn & Reverse Engineering CTF', 
    tech: 'C, Assembly', 
    desc: 'Luyện tập kỹ năng khai thác lỗ hổng nhị phân, kỹ năng dịch ngược, kiến thức về kiến trúc bộ nhớ và hợp ngữ qua các CTFs challenge thực tế.',
    githubLink: 'https://github.com/luanhocuit/CTFs'
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projectDB.filter(proj => 
    proj.tech.toLowerCase().includes(searchTerm.toLowerCase()) || 
    proj.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredProjects.map(proj => (
          <div key={proj.id} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '4px' }}>
            
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>{proj.title}</h3>
            <div style={{ color: 'var(--accent)', marginBottom: '15px', fontSize: '0.9rem' }}>[{proj.tech}]</div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {proj.desc}
            </p>
            
            {/* Link truy cập Source Code */}
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
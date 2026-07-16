import { useState, useEffect } from 'react';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [text, setText] = useState('');
  const fullText = '[ KaiLou@portfolio ~ ]#'; // Chữ bạn muốn gõ

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer); // Gõ xong thì dừng
      }
    }, 100); // 100ms gõ 1 ký tự, có thể chỉnh lại tốc độ ở đây

    return () => clearInterval(timer);
  }, []);

  return (
    <header>
      <h2 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
        {text}
        <span className="cursor"></span> {/* Con trỏ nhấp nháy */}
      </h2>
      <nav>
        <a href="#about">./about</a>
        <a href="#projects">./projects</a>
        <a href="#contact">./contact</a>
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
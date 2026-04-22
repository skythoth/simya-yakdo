// 상단 헤더 - 서비스명 + 네비게이션
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        심야약도
      </Link>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>홈</Link>
        <Link to="/favorites" style={styles.link}>즐겨찾기</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    zIndex: 100,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: 12,
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: 14,
  },
};

export default Header;

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div style={{ width: '80px' }}></div>

      <nav>
        <ul>
          <li><Link to="/main">MAIN</Link></li>
          <li><Link to="/hobby">HOBBY</Link></li>
          <li><Link to="/study">STUDY</Link></li>
        </ul>
      </nav>

      <div className="header-right" style={{ width: '80px', textAlign: 'right' }}>
        <Link to="/login" className="login-btn">로그인</Link>
      </div>
    </header>
  );
};

export default Header;
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); 
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
      navigate("/main");
    } catch (error) {
    }
  };
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

      <div className="header-right" style={{ width: '100px', textAlign: 'right' }}>
        {isLoggedIn ? (
          <button
          onClick={handleLogout}
          className="login-btn"
          style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >로그아웃</button>
        ) : (
          <Link to="/login" className="login-btn">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
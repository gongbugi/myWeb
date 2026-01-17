import Header from "../components/Header";
import { Link } from "react-router-dom";

const HobbyPage = () => {
  return (
    <>
      <Header />
      <div className="content" style={{ padding: "40px", textAlign: "center" }}>
        <h1>HOBBY</h1>
        <p>취미 기록 공간</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
          <Link to="/hobby/coffee" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ border: "1px solid #ddd", padding: "30px", borderRadius: "10px", width: "200px", cursor: "pointer" }}>
              <h2>☕️ Coffee</h2>
              <p>테이스팅 노트</p>
            </div>
          </Link>

          <div style={{ border: "1px solid #ddd", padding: "30px", borderRadius: "10px", width: "200px", opacity: 0.5 }}>
            <h2>⛺️ Camping</h2>
            <p>준비중</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HobbyPage;
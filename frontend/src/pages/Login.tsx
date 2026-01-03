import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import apiClient from "../api/axios";
import Loading from "../components/Loading"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      await apiClient.post("/users/login");

      navigate("/main");
    } catch (err : any) {
      console.error(err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError("아이디 또는 비밀번호가 잘못되었습니다.");
      } else if (err.response) {
        setError("서버 오류: " + (err.response.data || "알 수 없는 오류"));
      } else {
        setError("로그인 실패: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="auth-wrapper">
      {isLoading && <Loading />}
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="auth-input-group">
          <label htmlFor="userid">이메일</label>
          <input
          type="email"
          id="userid"
          name="userid"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div className="auth-input-group">
          <label htmlFor="password">비밀번호</label>
          <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        {error && <p style={{color: 'red', marginBottom: '10px'}}>{error}</p>}
        <div>
          <button type="submit" className="auth-submit-btn" disabled={isLoading}>{isLoading ? "로그인 중" : "로그인"}</button>
        </div>
      </form>
      <p>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
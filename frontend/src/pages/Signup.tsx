import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import apiClient from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // 1. Firebase Auth에 사용자 생성
      await createUserWithEmailAndPassword(auth, email, password);

      // 2. 백엔드 MySQL DB에 유저 정보(UID) 동기화 요청
      // apiClient 내부 인터셉터가 자동으로 헤더에 토큰을 포함시킵니다
      await apiClient.post("/users/signup");

      alert("회원가입이 완료되었습니다!");
      // 로그인 페이지로 이동
      navigate("/login");

    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("이미 사용 중인 이메일입니다.");
      } else if (err.response && err.response.data) {
        setError("서버 오류: " + err.response.data); 
      } else {
        setError("회원가입 실패: " + err.message);
      }
    }
  };


  return (
    <div className="auth-wrapper">
      <h1>Signup</h1>
      <form className="auth-form" onSubmit={handleSignup}>
        <div className="auth-input-group">
          <label htmlFor="userid">이메일</label>
          <input
          type="email"
          id="userid"
          name="userid"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@example.com"
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
          minLength={6}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <div>
          <button type="submit" className="auth-submit-btn">가입하기</button>
        </div>
      </form>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default Signup;
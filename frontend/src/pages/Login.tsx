// frontend/src/pages/Login.tsx
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-wrapper">
      <h1>Login</h1>
      <form className="auth-form" action="/login" method="post">
        <div className="auth-input-group">
          <label htmlFor="userid">사용자 아이디:</label>
          <input type="text" id="userid" name="userid" required />
        </div>
        <div className="auth-input-group">
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <button type="submit" className="auth-submit-btn">로그인</button>
        </div>
      </form>
      <p>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
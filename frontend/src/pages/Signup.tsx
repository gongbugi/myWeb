// frontend/src/pages/Signup.tsx
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth-wrapper">
      <h1>Signup</h1>
      <form className="auth-form" action="/signup" method="post">
        <div className="auth-input-group">
          <label htmlFor="userid">사용자 아이디:</label>
          <input type="text" id="userid" name="userid" required />
        </div>
        <div className="auth-input-group">
          <label htmlFor="password">비밀번호:</label>
          <input type="password" id="password" name="password" required />
        </div>
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
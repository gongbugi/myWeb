import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../cognito";
import apiClient from "../api/axios";
import Loading from "../components/Loading";

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

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async () => {
        try {
          await apiClient.post("/users/login");
          navigate("/main");
        } catch (backendErr: any) {
          console.error(backendErr);
          const errData = backendErr.response?.data;
          setError("서버 오류: " + (typeof errData === 'string' ? errData : JSON.stringify(errData) || backendErr.message));
          setIsLoading(false);
        }
      },
      onFailure: (err) => {
        setIsLoading(false);
        console.error(err);
        if (err.name === 'NotAuthorizedException' || err.name === 'UserNotFoundException') {
          setError("아이디 또는 비밀번호가 잘못되었습니다.");
        } else if (err.name === 'UserNotConfirmedException') {
          setError("이메일 인증이 완료되지 않았습니다.");
        } else {
          setError("로그인 실패: " + err.message);
        }
      }
    });
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
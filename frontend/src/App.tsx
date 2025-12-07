import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* 앞으로 여기에 페이지를 하나씩 추가할 거예요 */}
        <Route path="/" element={<h1>홈 페이지 (임시)</h1>} />
        <Route path="/login" element={<h1>로그인 페이지 (임시)</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
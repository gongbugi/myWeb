import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HobbyPage from "./pages/HobbyPage";
import StudyPage from "./pages/StudyPage";
import StudyWritePage from "./pages/StudyWritePage";
import StudyDetailPage from "./pages/StudyDetailPage";
import StudyEditPage from "./pages/StudyEditPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />

        <Route path="/hobby" element={<HobbyPage />} />

        <Route path="/study" element={<StudyPage />} />
        <Route path="/study/write" element={<StudyWritePage />} />
        <Route path="/study/:postId" element={<StudyDetailPage />} />
        <Route path="/study/:postId/edit" element={<StudyEditPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
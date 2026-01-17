import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HobbyPage from "./pages/HobbyPage";
import CoffeePage from "./pages/CoffeePage"
import CoffeeWritePage from "./pages/CoffeeWritePage";
import CoffeeDetailPage from "./pages/CoffeeDetailPage";
import CoffeeEditPage from "./pages/CoffeeEditPage";
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
        <Route path="/hobby/coffee" element={<CoffeePage />} />
        <Route path="/hobby/coffee/write" element={<CoffeeWritePage />} />
        <Route path="/hobby/coffee/:id" element={<CoffeeDetailPage />} />
        <Route path="/hobby/coffee/edit/:id" element={<CoffeeEditPage />} />

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
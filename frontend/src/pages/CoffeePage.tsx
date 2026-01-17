import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import apiClient from "../api/axios";
import { auth } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getCoffeeLogs } from "../api/coffeeLog";
import type { CoffeeLogSummaryResponse } from "../types";
import "./CoffeePage.css";

const CoffeePage = () => {
  const navigate = useNavigate();
  
  const [logs, setLogs] = useState<CoffeeLogSummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      try {
        const logsData = await getCoffeeLogs();
        setLogs(logsData);

        if (user) {
          await checkUserRole();
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("데이터 로딩 중 에러:", error);
      } finally {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/hobby/coffee/${id}`);
  };

  const getMoodStyle = (colors: string) => {
    if (!colors) return { backgroundColor: "#f0f0f0" };
    if (colors.includes(",")) {
      return { background: `linear-gradient(to right, ${colors})` };
    }
    return { backgroundColor: colors };
  };

  const checkUserRole = async () => {
    try {
      const response = await apiClient.get("/users/role");
      if (response.data === "ADMIN") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log("Not Admin");
      setIsAdmin(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      
      <div className="coffee-container">
        <div className="coffee-header">
          <div>
            <h1>Coffee Notes</h1>
          </div>
          {isAdmin && (
            <button 
              className="btn-write"
              onClick={() => navigate("/hobby/coffee/write")}
            >
              글쓰기
            </button>
          )}
        </div>

        <div className="coffee-grid">
          {logs.length === 0 && !isLoading ? (
            <div className="empty-state">
              <h3>작성된 기록이 없습니다.</h3>
            </div>
          ) : (
            logs.map((log) => (
              <div 
                key={log.id} 
                className="coffee-card"
                onClick={() => handleCardClick(log.id)}
              >
                <div 
                  className="card-color-bar" 
                  style={getMoodStyle(log.moodColors)}
                />
                
                <div className="card-body">
                  <h3 className="card-title">{log.name}</h3>
                  
                  <div className="flavor-tags">
                    {log.flavorNotes ? (
                      log.flavorNotes.split(",").map((note, idx) => (
                        <span key={idx} className="flavor-tag">
                          #{note.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="flavor-tag" style={{ color: '#ccc', border: 'none' }}>
                        No Tags
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CoffeePage;
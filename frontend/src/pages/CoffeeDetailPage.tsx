import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import apiClient from "../api/axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getCoffeeLog, deleteCoffeeLog } from "../api/coffeeLog";
import type { CoffeeLogDetailResponse } from "../types";
import "./CoffeeDetailPage.css";

const CoffeeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [log, setLog] = useState<CoffeeLogDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const logData = await getCoffeeLog(Number(id));
        setLog(logData);
        if (user) {
          await checkUserRole();
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        alert("해당 기록을 찾을 수 없습니다.");
        navigate("/hobby/coffee");
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [id, navigate]);

  const getMoodStyle = (colors: string) => {
    if (!colors) return { backgroundColor: "#f0f0f0" };
    if (colors.includes(",")) {
      return { background: `linear-gradient(to right, ${colors})` };
    }
    return { backgroundColor: colors };
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 기록을 삭제하시겠습니까?")) return;

    try {
      if (log?.id) {
        await deleteCoffeeLog(log.id);
        alert("삭제되었습니다.");
        navigate("/hobby/coffee");
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const checkUserRole = async () => {
    try {
      const response = await apiClient.get("/users/role");
      if (response.data === "ADMIN") {
        setIsAdmin(true);
      }
    } catch (error) {
      setIsAdmin(false);
    }
  };

  if (isLoading) return <Loading />;
  if (!log) return null;

  return (
    <>
      <Header />
      
      <div className="detail-container">
        <div 
          className="detail-color-banner" 
          style={getMoodStyle(log.moodColors)}
        />

        <div className="detail-header">
          <h1 className="detail-title">{log.name}</h1>
          <span className="detail-date">
            작성일: {new Date(log.createDate).toLocaleDateString()}
          </span>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <label>Country (산지)</label>
            <span>{log.country || "-"}</span>
          </div>
          <div className="info-item">
            <label>Region (지역)</label>
            <span>{log.region || "-"}</span>
          </div>
          <div className="info-item">
            <label>Variety (품종)</label>
            <span>{log.variety || "-"}</span>
          </div>
          <div className="info-item">
            <label>Processing (가공)</label>
            <span>{log.processing || "-"}</span>
          </div>
          <div className="info-item">
            <label>Roasting (배전도)</label>
            <span>{log.roastingPoint || "-"}</span>
          </div>
        </div>

        <div className="detail-section">
          <div className="section-title">Flavor Notes</div>
          <div className="detail-tags">
            {log.flavorNotes ? (
              log.flavorNotes.split(",").map((note, idx) => (
                <span key={idx} className="detail-tag">
                  #{note.trim()}
                </span>
              ))
            ) : (
              <span style={{ color: "#999" }}>입력된 노트가 없습니다.</span>
            )}
          </div>
        </div>

        <div className="detail-section">
          <div className="section-title">Comment</div>
          <div className="comment-box">
            {log.comment || "작성된 코멘트가 없습니다."}
          </div>
        </div>

        <div className="detail-buttons">
          <button className="btn-list" onClick={() => navigate("/hobby/coffee")}>
            목록으로
          </button>
          {isAdmin && (
            <>
              <button 
                className="btn-edit" 
                onClick={() => navigate(`/hobby/coffee/edit/${log.id}`)}
              >
                수정
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CoffeeDetailPage;
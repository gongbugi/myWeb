import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axios";
import Header from "../components/Header";
import type { StudyPost } from "../types";
import "./StudyDetailPage.css";
import Loading from "../components/Loading";

const StudyDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<StudyPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await apiClient.get<StudyPost>(`/study/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("게시글 로딩 실패", error);
      alert("게시글을 불러오지 못했습니다.");
      navigate("/study");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      await apiClient.delete(`/study/${postId}`);
      alert("게시글이 삭제되었습니다.");
      navigate("/study");
    } catch (error: any) {
      console.error("삭제 실패", error);
      alert("삭제 실패: " + (error.response?.data || error.message));
    }
  };

  if (loading) return <Loading/>;
  if (!post) return <div>게시글이 없습니다.</div>;

  return (
    <>
      <Header />
      <div className="post-container">
        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
          <span>Category: </span>
          <strong>{post.categoryName}</strong>
        </div>

        <div className="post-content">
          {post.content}
        </div>

        <div className="button-group">
          <Link to="/study" className="back-to-list">
            ← 목록으로 돌아가기
          </Link>

          <div className="action-buttons">
            <Link to={`/study/${post.id}/edit`} className="edit-btn">
              수정
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyDetailPage;
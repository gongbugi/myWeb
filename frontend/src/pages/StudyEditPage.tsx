import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../api/axios";
import Header from "../components/Header";
import type { Category, StudyPostRequest, StudyPost } from "../types";
import "./StudyWritePage.css";

const StudyEditPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    fetchCategories();
    fetchPostData();
  }, [postId]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get<Category[]>("/study/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("카테고리 로딩 실패", error);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await apiClient.get<StudyPost>(`/study/${postId}`);
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      
      if (post.categoryId) {
          setSelectedCategoryId(post.categoryId.toString());
      }
    } catch (error) {
      console.error("게시글 데이터 로딩 실패", error);
      alert("게시글 정보를 불러올 수 없습니다.");
      navigate("/study");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategoryId(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId || selectedCategoryId === "") {
      alert("카테고리를 선택하세요.");
      return;
    }

    const requestDto: StudyPostRequest = {
      title,
      content,
      categoryId: Number(selectedCategoryId)
    }

    try {
      await apiClient.put(`/study/${postId}`, requestDto);
      alert("게시글 수정이 완료되었습니다.");
      navigate(`/study/${postId}`);
    } catch (error: any) {
      console.error("게시글 수정 실패", error);
      const errorData = error.response?.data;
      const errorMessage = (typeof errorData === 'object' && errorData.message)
      ? errorData.message 
      : (errorData || error.message);

      alert("수정에 실패했습니다: " + errorMessage);
    }
  };

  return (
    <>
      <Header />
      <div className="write-container">
        <h1>게시글 수정</h1>
        <form name="writeForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">카테고리 선택</label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={selectedCategoryId}
              onChange={handleCategoryChange}
            >
              <option value="">-- 카테고리를 선택하세요 --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div style={{display:'flex', gap: '10px'}}>
             <button type="submit" className="submit-button">수정 완료</button>
             <button 
                type="button" 
                className="submit-button" 
                style={{backgroundColor: '#6c757d'}}
                onClick={() => navigate(-1)}
             >
                취소
             </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudyEditPage;
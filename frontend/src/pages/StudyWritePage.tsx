import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import Header from "../components/Header";
import type { Category, StudyPostRequest } from "../types";
import "./WritePage.css"; // 위에서 만든 CSS 파일 임포트

const WritePage = () => {
  const navigate = useNavigate();

  // 입력 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // 카테고리 관련 상태
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isNewCategoryMode, setIsNewCategoryMode] = useState(false);

  // 초기 카테고리 목록 불러오기
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get<Category[]>("/study/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("카테고리 로딩 실패", error);
    }
  };

  // 드롭다운 변경 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === "addNewCategory") {
      setIsNewCategoryMode(true);
      setSelectedCategoryId("addNewCategory");
    } else {
      setIsNewCategoryMode(false);
      setSelectedCategoryId(value);
      setNewCategoryName(""); // 기존 카테고리 선택 시 새 이름 초기화
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestDto: StudyPostRequest = {
      title,
      content,
    };

    if (isNewCategoryMode) {
        // 새 카테고리 입력 모드일 때
        if (!newCategoryName.trim()) {
            alert("새로운 카테고리 이름을 입력하세요.");
            return;
        }
        requestDto.newCategoryName = newCategoryName;
        requestDto.categoryId = null;
    } else {
        // 기존 카테고리 선택 모드일 때
        if (!selectedCategoryId || selectedCategoryId === "") {
            alert("카테고리를 선택하세요.");
            return;
        }
        requestDto.categoryId = Number(selectedCategoryId);
    }

    try {
      await apiClient.post("/study/write", requestDto);
      alert("게시글 작성이 완료되었습니다.");
      navigate("/study");
    } catch (error: any) {
      console.error("게시글 저장 실패", error);
      const errorData = error.response?.data;
      const errorMessage = (typeof errorData === 'object' && errorData.message)
      ? errorData.message 
      : (errorData || error.message);

    alert("저장에 실패했습니다: " + errorMessage);
    }
  };

  return (
    <>
      <Header />
      
      <div className="write-container">
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
              <option value="addNewCategory">-- 카테고리 추가 --</option>
            </select>
          </div>

          {isNewCategoryMode && (
            <div className="form-group" id="newCategorySection">
              <label htmlFor="newCategoryName">새 카테고리 입력</label>
              <input
                type="text"
                id="newCategoryName"
                name="newCategoryName"
                placeholder="새로운 카테고리 이름을 입력하세요"
                required={isNewCategoryMode}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="submit-button">
            저장하기
          </button>
        </form>
      </div>
    </>
  );
};

export default WritePage;
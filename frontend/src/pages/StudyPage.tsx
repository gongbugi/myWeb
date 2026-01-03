import { useEffect, useState } from "react";
import Header from "../components/Header";
import type { Category, StudyPost } from "../types";
import apiClient from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const StudyPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<StudyPost[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchCategories(),
          fetchPosts(selectedCategoryId),
          checkUserRole()
        ]);
      } catch (error) {      
      } finally {
        setIsLoading(false);
      }
    };

    initFetch();
  }, []);



  const fetchCategories = async () => {
    try {
      const response = await apiClient.get<Category[]>("/study/categories");
      setCategories(response.data);
    } catch (error) {
    }
  };

  const fetchPosts = async (categoryId: number | null) => {
    try {
      const params = categoryId ? {categoryId} : {};
      const response = await apiClient.get<StudyPost[]>("/study", {params});
      setPosts(response.data);
    } catch (error) {
    }
  };

  const checkUserRole = async () => {
    try {
      const response = await apiClient.get("/users/role");
      if(response.data === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);
    }
  }

  const handleCategoryClick = (categoryId: number | null) => {
    if(isEditMode) return;

    setSelectedCategoryId(categoryId);
    fetchPosts(categoryId);
  };

  const handleDeleteCategory = async (categoryId: number, categoryName: String) => {
    if (!window.confirm(`'${categoryName}' 카테고리를 삭제하시겠습니까?`)) return;

    try {
      await apiClient.delete(`/study/category/${categoryId}`);
      alert("카테고리가 삭제되었습니다.");

      if (selectedCategoryId === categoryId) {
        setSelectedCategoryId(null);
        fetchPosts(null);
      }
      
      fetchCategories();
    } catch (error: any) {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleAddCategory = async () => {
    if(!newCategoryName.trim()) {
      alert("카테고리 이름을 이력하세요.");
      return;
    }

    try {
      await apiClient.post("/study/category", {name: newCategoryName});
      alert("카테고리가 생성되었습니다.");
      setNewCategoryName("");
      fetchCategories();
    } catch (error: any) {
      alert("카테고리 생성 실패");
    }
  };

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <div className="container">
        {/* 사이드바 */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li>
              <button
              onClick={() => handleCategoryClick(null)}
              disabled={isEditMode}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: selectedCategoryId === null ? 'bold' : 'normal',
                color: selectedCategoryId === null ? '#007bff' : '#333'
              }}
              >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal',
                    color: selectedCategoryId === category.id ? '#007bff' : '#333',
                    textAlign: 'left',
                    flexGrow: 1
                  }}
                >
                  {category.name}
                </button>
                {isEditMode && isAdmin && (
                  <button
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                    style={{
                      border: 'none',
                      background: '#ff4d4f',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '5px'
                    }}
                    title="삭제"
                  >
                    X
                  </button>
                )}
              </li>
            ))}

            {isEditMode && isAdmin && (
              <li style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="새 카테고리"
                  style={{
                    flexGrow: 1, 
                    padding: '5px', 
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    width: '0px'
                  }}
                />
                <button
                onClick={handleAddCategory}
                style={{
                  padding: '5px 8px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  whiteSpace: 'nowrap'
                }}
                >
                  추가
                </button>
                </div>
              </li>
            )}
          </ul>
          {isAdmin && (
            <button 
            onClick={() => setIsEditMode(!isEditMode)}
            style={{ 
              marginTop: '15px', 
              background: 'none', 
              border: 'none', 
              textDecoration: 'underline', 
              cursor: 'pointer',
              color: isEditMode ? '#ff4d4f' : '#666',
              fontWeight: isEditMode ? 'bold' : 'normal'
            }}
          >
            {isEditMode ? "편집 완료" : "카테고리 편집"}
          </button>
          )}

        </aside>

        <main style={{ flexGrow: 1, padding: '20px' }}>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            {isAdmin && (
             <button
             onClick={() => navigate('/study/write')}
             style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
             >글쓰기
             </button>
            )}
          </div>

          <h1>Study Posts</h1>
          <ul className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id}>
                  <h3>
                    <Link to={`/study/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                </li>
              ))
            ) : (
              <p>게시글이 없습니다.</p>
            )}
          </ul>
        </main>
      </div>
    </>
  );
};

export default StudyPage;
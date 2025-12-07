import { useEffect, useState } from "react";
import Header from "../components/Header";
import type { Category, StudyPost } from "../types";
import apiClient from "../api/axios";
import { useNavigate } from "react-router-dom";

const StudyPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<StudyPost[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchPosts(selectedCategoryId);
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

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    fetchPosts(categoryId);
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* 사이드바 */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li>
              <button
              onClick={() => handleCategoryClick(null)}
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
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal',
                    color: selectedCategoryId === category.id ? '#007bff' : '#333'
                  }}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          <button style={{ marginTop: '15px', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            카테고리 편집
          </button>
        </aside>

        {/* 메인 컨텐츠 */}
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
             <button
             onClick={() => navigate('/study/write')}
             style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
             >글쓰기
             </button>
          </div>

          <h1>Study Posts</h1>
          <ul className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id}>
                  <h3>
                    <a href="#" onClick={(e) => {e.preventDefault; navigate('/study/${post.id}');}}>
                      {post.title}
                    </a>
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
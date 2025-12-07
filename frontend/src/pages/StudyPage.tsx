import Header from "../components/Header";

const StudyPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        {/* 사이드바 */}
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li><a href="#">All</a></li>
            <li><a href="#">Java</a></li>
            <li><a href="#">Spring</a></li>
          </ul>
          <button style={{ marginTop: '15px', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            카테고리 편집
          </button>
        </aside>

        {/* 메인 컨텐츠 */}
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
             <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>글쓰기</button>
          </div>
          <h1>Study Posts</h1>
          <ul style={{ listStyle: 'none', padding: 0 }}>
             <li style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <h3>게시글 예시 제목 1</h3>
             </li>
             <li style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <h3>게시글 예시 제목 2</h3>
             </li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default StudyPage;
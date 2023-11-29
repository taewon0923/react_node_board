function Post({ posts, detail }) {
  return (
    <div>
      <h2 className="postlist">게시글 목록</h2>
      <table border="1" width="80%" height="50" align="center">
        <thead>
          <tr align="center" bgcolor="white">
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성 시간</th>
            <th>상세보기/수정/삭제</th>
          </tr>
        </thead>
        <tbody align="center">
          {posts.map((post) => (
            <tr>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.writer}</td>
              <td>{post.created_at}</td>
              <td>
                <button onClick={() => detail(post.id)}>상세보기</button>
                <button>수정</button>
                <button>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Post;

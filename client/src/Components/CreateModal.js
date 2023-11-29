import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";
import Posts from "./Post";

const Create = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [posts, setPosts] = useState([]);
  const [pass, setPass] = useState("");
  const [postId, setPostId] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/posts", { title, content, writer, pass })
      .then(() => {
        setTitle("");
        setContent("");
        setWriter("");
        setPass("");
        axios
          .get("http://localhost:5000/posts")
          .then((response) => {
            setPosts(response.data);
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const detailModal = () => {
    setPostId(!postId);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const detail = (postId) => {
    axios
      .get(`http://localhost:5000/posts/${postId}`)
      .then((response) => {
        setPostId(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        글 쓰기
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>글 쓰기</h2>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="작성자"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <textarea
                  cols="70"
                  rows="10"
                  type="text"
                  placeholder="내용"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">등록</button>
              </form>
            </div>
            <button className="close-modal" onClick={toggleModal}>
              닫기
            </button>
          </div>
        </div>
      )}
      <form>
        {postId && (
          <div className="modal">
            <div className="overlay">
              <div className="modal-content">
                <h2>상세 정보</h2>
                <p>제목: {postId.title}</p>
                <p>작성자: {postId.writer}</p>
                <p>내용: {postId.content}</p>
                <button className="close-modal" onClick={detailModal}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
      <Posts posts={posts} detail={detail}></Posts>
    </>
  );
};

export default Create;

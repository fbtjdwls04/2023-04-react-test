import { useState } from "react";
import { Button } from "@mui/material";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  NavLink,
  useParams,
  useNavigate,
} from "react-router-dom";
import classNames from "classnames";
function HomeMainPage() {
  return <h1>HOME, MAIN</h1>;
}

function HomeAboutPage() {
  return <h1>HOME ABOUT</h1>;
}

function ArticleListPage() {
  const article = [{ id: 1 }, { id: 2 }];
  return (
    <>
      <h1>ARTICLE, LIST</h1>
      <ul>
        {article.map((article) => (
          <li key={article.id}>
            <NavLink to={`/article/detail/${article.id}`}>
              {article.id}번 게시물
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

function ArticleDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <h1>ARTICLE, DETAIL</h1>
      <h1>{id}번 게시물 상시</h1>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </>
  );
}

function App() {
  const location = useLocation();
  return (
    <>
      <header>현재 주소 : {location.pathname}</header>
      <hr />
      <div>
        <NavLink
          to="/home/main"
          className={({ isActive }) =>
            classNames(
              "btn",
              { "btn-link": !isActive },
              { "btn-primary": isActive }
            )
          }
        >
          Home, Main 페이지
        </NavLink>
        <NavLink
          to="/home/about"
          className={({ isActive }) =>
            classNames(
              "btn",
              { "btn-link": !isActive },
              { "btn-primary": isActive }
            )
          }
        >
          Home, about 페이지
        </NavLink>
        <NavLink
          to="/article/List"
          className={({ isActive }) =>
            classNames(
              "btn",
              { "btn-link": !isActive },
              { "btn-primary": isActive }
            )
          }
        >
          article, list 페이지
        </NavLink>
      </div>
      <Routes>
        <Route path="/home/main" element={<HomeMainPage />} />
        <Route path="/home/about" element={<HomeAboutPage />} />
        <Route path="/article/List" element={<ArticleListPage />} />
        <Route path="/article/detail/:id" element={<ArticleDetailPage />} />
        <Route path="*" element={<Navigate to="/home/main" />} />
      </Routes>
    </>
  );
}

export default App;

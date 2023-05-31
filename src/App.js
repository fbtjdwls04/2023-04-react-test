import { useState, useRef } from "react";
import {
  Route,
  Routes,
  NavLink,
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { Button } from "@mui/material";
import { produce } from "immer";

const todosAtom = atom({
  key: "app/todosAtom",
  default: [
    { id: 3, regDate: "2023-12-12 12:12:12", content: "구라에요" },
    { id: 2, regDate: "2023-12-12 12:12:12", content: "반가워요" },
    { id: 1, regDate: "2023-12-12 12:12:12", content: "안녕하세요" },
  ],
});

function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const lastTodoIdRef = useRef(todos.length == 0 ? 0 : todos[0].id);

  const addTodo = (content) => {
    const regDate = "2023-12-12 12:12:12";
    const id = ++lastTodoIdRef.current;
    // 기존방식
    // const newTodo = {
    //   id,
    //   content,
    //   regDate,
    // };
    // const newTodos = [newTodo, ...todos];

    const newTodos = produce(todos, (draft) => {
      draft.unshift({ id, content, regDate });
    });

    setTodos(newTodos);
  };

  const findIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const removeToboById = (id) => {
    const index = findIndexById(id);
    if (index == -1) return;

    // 기존방식
    // const newTodos = todos.filter((_, _index) => index != _index);

    const newTodos = produce(todos, (draft) => {
      draft.splice(index, 1);
    });

    setTodos(newTodos);
  };

  const removeAllTodos = () => {
    if (!window.confirm("정말 게시글 전체를 삭제하시겠습니까?")) {
      return;
    }
    const newTodos = [];
    setTodos(newTodos);
  };

  const modifyTodoById = (id, content) => {
    const index = findIndexById(id);
    if (index == -1) {
      return;
    }

    // 기존 방식
    // const newTodos = todos.map((todo, _index) =>
    //   index == _index ? { ...todo, content } : todo
    // );
    // setTodos(newTodos);

    const newTodos = produce(todos, (draft) => {
      draft[index].content = content;
    });

    setTodos(newTodos);
  };

  const findTodoById = (id) => {
    const index = findIndexById(id);
    return todos[index];
  };
  return {
    todos,
    addTodo,
    removeToboById,
    modifyTodoById,
    findTodoById,
    removeAllTodos,
  };
}

function TodoListItem({ todo }) {
  const todosState = useTodosState();
  return (
    <li
      key={todo.id}
      className="p-4 my-2 border-[--mui-color-primary-main] border-2 rounded-[20px]"
    >
      {todo.id} : {todo.content}
      <button
        className="btn btn-sm"
        onClick={() =>
          window.confirm(`${todo.id}번 할 일을 삭제하시겠습니까?`) &&
          todosState.removeToboById(todo.id)
        }
      >
        삭제
      </button>
      <NavLink className="btn btn-sm" to={`/edit/${todo.id}`}>
        수정
      </NavLink>
    </li>
  );
}

function TodoListPage() {
  const todosState = useTodosState();
  return (
    <ul>
      {todosState.todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function TodoWritePage() {
  const todosState = useTodosState();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요");
      form.content.focus();

      return;
    }
    const newTodo = form.content.value;
    form.content.value = "";
    form.content.focus();
    todosState.addTodo(newTodo);
    navigate("/list", { replace: true });
  };
  return (
    <>
      <h1>할 일 작성</h1>
      <form onSubmit={onSubmit} className="mt-2">
        <input
          type="text"
          name="content"
          placeholder="할 일을 작성해주세요"
          className="input input-bordered w-full max-w-xs"
        />
        <input type="submit" value="작성" className="btn" />
      </form>
      <ul>{todosState.todos.length}</ul>
    </>
  );
}

function TodoEditPage() {
  const todosState = useTodosState();
  const { id } = useParams();
  const todo = todosState.findTodoById(id);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요");
      form.content.focus();
      return;
    }
    const content = form.content.value;

    todosState.modifyTodoById(id, content);
    navigate("/list", { replace: true });
  };
  return (
    <>
      <h1>할 일 수정</h1>
      <form onSubmit={onSubmit} style={{ display: "inline-block" }}>
        <input
          type="text"
          defaultValue={todo.content}
          placeholder="할 일"
          name="content"
          className="input input-bordered max-w-xs"
        ></input>
        <button className="btn btn-sm" type="submit">
          수정
        </button>
        <NavLink className="btn btn-sm" to="/list">
          취소
        </NavLink>
      </form>
    </>
  );
}

function TopMenuBar() {
  const location = useLocation();
  const todosState = useTodosState();
  return (
    <>
      <NavLink
        to="/list"
        style={({ isActive }) => ({
          color: isActive ? "red" : null,
        })}
      >
        <Button variant="outlined">리스트</Button>
      </NavLink>
      <NavLink
        to="/write"
        style={({ isActive }) => ({
          color: isActive ? "red" : null,
        })}
      >
        <Button variant="outlined">작성</Button>
      </NavLink>
      <Button variant="outlined" onClick={todosState.removeAllTodos}>
        전체 글 삭제
      </Button>
      <span className="ml-5">주소 : {location.pathname}</span>
    </>
  );
}

export default function App() {
  return (
    <>
      <header className="mx-10 mt-5 bg-purple-50 p-5 rounded-[20px]">
        <TopMenuBar />
      </header>
      <div className="p-10 m-10 h-[700px] border-[--mui-color-primary-main] rounded-[20px] border-4 overflow-y-scroll">
        <Routes>
          <Route path="/list" element={<TodoListPage />}></Route>
          <Route path="/write" element={<TodoWritePage />}></Route>
          <Route path="/edit/:id" element={<TodoEditPage />}></Route>
          <Route path="*" element={<Navigate to="write" />}></Route>
        </Routes>
      </div>
    </>
  );
}

import { useState, useRef } from "react";
import {
  Route,
  Routes,
  NavLink,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import { atom, useRecoilState } from "recoil";

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
  const lastTodoIdRef = useRef(todos[0].id);
  const addTodo = (content) => {
    const regDate = "2023-12-12 12:12:12";
    const newTodo = {
      id: ++lastTodoIdRef.current,
      content,
      regDate,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  };
  const findIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const removeToboById = (id) => {
    const index = findIndexById(id);
    if (index == -1) return;
    const newTodos = todos.filter((_, _index) => index != _index);
    setTodos(newTodos);
  };
  const modifyTodoById = (id, content) => {
    const index = findIndexById(id);
    if (index == -1) {
      return;
    }
    const newTodos = todos.map((todo, _index) =>
      index == _index ? { ...todo, content } : todo
    );
    setTodos(newTodos);
  };
  return {
    todos,
    addTodo,
    removeToboById,
    modifyTodoById,
  };
}

function TodoListItem({ todo }) {
  const [editMode, SetEditMode] = useState(false);
  const todosState = useTodosState();
  const showEditMode = () => {
    SetEditMode(true);
  };
  const cancelEditMode = (e) => {
    SetEditMode(false);
  };

  const onSubmitEditForm = (e) => {
    e.preventDefault();

    const form = e.target;
    form.content.value = form.content.value.trim();
    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요");
      form.content.focus();
      return;
    }
    todosState.modifyTodoById(todo.id, form.content.value);
    cancelEditMode();
  };
  return (
    <li key={todo.id}>
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
      {editMode || (
        <button className="btn btn-sm" onClick={showEditMode}>
          수정
        </button>
      )}
      {editMode && (
        <form onSubmit={onSubmitEditForm} style={{ display: "inline-block" }}>
          <input
            type="text"
            defaultValue={todo.content}
            placeholder="할 일"
            name="content"
            className="input input-bordered max-w-xs"
          ></input>
          <button className="btn btn-sm" type="submit">
            수정완료
          </button>
          <button className="btn btn-sm" onClick={cancelEditMode}>
            수정취소
          </button>
        </form>
      )}
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

export default function App() {
  const location = useLocation();
  return (
    <>
      <header>
        <NavLink
          to="/list"
          style={({ isActive }) => ({
            color: isActive ? "red" : null,
          })}
        >
          리스트
        </NavLink>
        &nbsp;/&nbsp;
        <NavLink
          to="/write"
          style={({ isActive }) => ({
            color: isActive ? "red" : null,
          })}
        >
          작성
        </NavLink>
        <hr />
        주소 : {location.pathname}
      </header>
      <Routes>
        <Route path="/list" element={<TodoListPage />}></Route>
        <Route path="/write" element={<TodoWritePage />}></Route>
        <Route path="*" element={<Navigate to="write" />}></Route>
      </Routes>
    </>
  );
}

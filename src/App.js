import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import Order from "./Order";

function TodoListItem({ todosState, todo, index }) {
  const [editMode, SetEditMode] = useState(false);
  const [editedContent, SetEditedContent] = useState(todo.content);
  const editedContentInputRef = useRef(null);

  const removeTodo = () => {
    todosState.removeTodo(index);
  };

  const showEdit = () => {
    SetEditMode(true);
  };

  const commitEdit = () => {
    if (editedContent.trim().length == 0) {
      alert("할 일을 입력해주세요");
      editedContentInputRef.current.focus();
      return;
    }
    todosState.modifyTodo(index, editedContent.trim());
    SetEditMode(false);
  };

  const cancelEdit = () => {
    SetEditMode(false);
    SetEditedContent(todo.content);
  };
  return (
    <li key={index}>
      {todo.id} {todo.regDate}
      {editMode || (
        <>
          {todo.content}
          &nbsp;
          <button onClick={showEdit}>수정</button>
        </>
      )}
      {editMode && (
        <>
          <input
            ref={editedContentInputRef}
            type="text"
            placeholder="할 일을 입력해주세요"
            value={editedContent}
            onChange={(e) => SetEditedContent(e.target.value)}
          />
          <button onClick={commitEdit}>수정완료</button>
          <button onClick={cancelEdit}>수정취소</button>
        </>
      )}
      <button onClick={removeTodo}>삭제</button>
    </li>
  );
}

function TodoList({ todosState }) {
  return (
    <ul>
      {todosState.todos.map((todo, index) => (
        <TodoListItem
          todosState={todosState}
          key={todo.id}
          todo={todo}
          index={index}
        />
      ))}
    </ul>
  );
}

function NewTodoForm({ todosState }) {
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("내용을 입력해주세요");
      form.content.focus();
      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          autoComplete="off"
          type="text"
          name="content"
          placeholder="할 일을 입력해주세요"
        />
        <input type="submit" value="추가" />
        <input type="reset" value="취소" />
      </form>
    </>
  );
}

// 온리 출력만
function TodoApp({ todosState }) {
  return (
    <>
      <NewTodoForm todosState={todosState} />
      <hr />
      <TodoList todosState={todosState} />
    </>
  );
}

function useTodosState() {
  const [todos, SetTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };
    const newTodos = [...todos, newTodo];
    SetTodos(newTodos);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    SetTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    SetTodos(newTodos);
  };
  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo,
  };
}

function App() {
  const todosState = useTodosState();
  return (
    <>
      <TodoApp todosState={todosState} />
    </>
  );
}

export default App;

function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}

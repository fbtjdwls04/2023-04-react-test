import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import Order from "./Order";

function TodoApp({ todosState }) {
  const onBtnAddTodoClick = () => {
    todosState.addTodo("안녕");
  };
  const onBtnRemoveTodoClick = () => {
    todosState.removeTodo(1);
  };
  const onBtnModifyTodoClick = () => {
    todosState.modifyTodo(1, "ㅋㅋㅋ");
  };

  return (
    <>
      <button onClick={onBtnAddTodoClick}>추가</button>
      <button onClick={onBtnRemoveTodoClick}>삭제</button>
      <button onClick={onBtnModifyTodoClick}>수정</button>
      <hr />
      <ul>
        {todosState.todos.map((todo, index) => (
          <li key={index}>
            {todo.id}
            {todo.regDate}
            {todo.content}
          </li>
        ))}
      </ul>
    </>
  );
}

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: "2023-05-03 12:12:12",
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodo = todos.filter((_, _index) => index != _index);
    setTodos(newTodo);
  };

  const modifyTodo = (index, content) => {
    const newTodo = todos.map((todo, _index) =>
      index == _index ? { ...todo, content: content } : todo
    );
    setTodos(newTodo);
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
      <Button variant="contained">Contained</Button>
    </>
  );
}

export default App;

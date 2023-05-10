import React, { useEffect, useState, useRef } from "react";
import { AppBar, TextField, Toolbar, Button, Chip, Box } from "@mui/material";
import classNames from "classnames";
import Order from "./Order";

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
    SetTodos((todos) => [newTodo, ...todos]);
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
  useEffect(() => {
    todosState.addTodo("운동\n스트레칭\n헬스\n복싱\n주짓수");
    todosState.addTodo("공부");
    todosState.addTodo("독서");
  }, []);
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
      <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1"></div>
          <span className="font-bold">MY NOTE</span>
          <div className="flex-1"></div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <form onSubmit={onSubmit} className="flex flex-col my-5 mx-5 gap-2">
        <TextField
          minRows={3}
          maxRows={10}
          autoComplete="off"
          name="content"
          label="할 일을 입력해주세요"
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          추가
        </Button>
      </form>
      <div className="mt-5 px-4">
        <ul>
          {todosState.todos.map((todo, index) => (
            <li key={todo.id} className="mt-10">
              <div className="flex gap-2">
                <Chip
                  label={`번호 : ${todo.id}`}
                  variant="outlined"
                  className="!pt-2"
                />
                <Chip
                  label={todo.regDate}
                  variant="outlined"
                  color="primary"
                  className="!pt-2"
                />
              </div>
              <div className="mt-4 shadow rounded-[20px] flex">
                <Button
                  className="flex-shrink-0 !items-start !rounded-[20px_0_0_20px]"
                  color="inherit"
                >
                  <span
                    className={classNames(
                      "flex",
                      "items-center",
                      "text-4xl",
                      {
                        "text-[color:var(--mui-color-primary-main)]":
                          index % 2 == 0,
                      },
                      { "text-[#dfdfdf]": index % 2 != 0 }
                    )}
                  >
                    <i className="fa-solid fa-check"></i>
                  </span>
                </Button>

                <div className="flex-shrink-0 my-3 mr-4 w-[2px] bg-[#dfdfdf]"></div>

                <div className="whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex-grow my-5">
                  {todo.content}
                </div>

                <div className="flex-shrink-0 my-3 w-[2px] bg-[#dfdfdf]"></div>

                <Button
                  className="flex-shrink-0 !rounded-[0_20px_20px_0] !items-start"
                  color="inherit"
                >
                  <span className="text-[#dfdfdf] text-2xl flex items-center">
                    <i className="fa-solid fa-ellipsis"></i>
                  </span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
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

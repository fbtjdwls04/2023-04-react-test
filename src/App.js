import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  AppBar,
  TextField,
  Toolbar,
  Button,
  Chip,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Modal,
} from "@mui/material";
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

  const removeTodoById = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);

    if (index != -1) {
      removeTodo(index);
    }
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo,
    removeTodoById,
  };
}
function TodoListItem({ todo, index, todosState, openDrawer }) {
  return (
    <>
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
                  "text-[color:var(--mui-color-primary-main)]": index % 2 == 0,
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
            onClick={() => openDrawer(todo.id)}
            className="flex-shrink-0 !rounded-[0_20px_20px_0] !items-start"
            color="inherit"
          >
            <span className="text-[#dfdfdf] text-2xl flex items-center">
              <i className="fa-solid fa-ellipsis"></i>
            </span>
          </Button>
        </div>
      </li>
    </>
  );
}
function useTodoOptionDrawerStatus() {
  const [todoId, SetTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => SetTodoId(null);
  const open = (id) => SetTodoId(id);

  return {
    todoId,
    opened,
    close,
    open,
  };
}

function useEditTodoModal() {
  const [opened, SetEditTodoModalOpened] = useState(false);

  const open = () => {
    SetEditTodoModalOpened(true);
  };

  const close = () => {
    SetEditTodoModalOpened(false);
  };
  return {
    open,
    close,
    opened,
  };
}

function TodoOptionDrawer({ status, todosState }) {
  const useEditTodo = useEditTodoModal();
  const removeTodo = () => {
    todosState.removeTodoById(status.todoId);
    status.close();
  };

  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={status.opened}
        onClose={status.close}
      >
        <List className="!py-0">
          <ListItem className="!p-5 !pt-6">
            <span className="text-[color:var(--mui-color-primary-main)]">
              {status.todoId}번
            </span>
            <span>&nbsp;</span>
            <span>할 일에 대해</span>
          </ListItem>
          <ListItemButton
            className="!p-5 !pt-6 !items-baseline"
            onClick={useEditTodo.open}
          >
            <i className="fa-solid fa-pen"></i>
            &nbsp;수정
          </ListItemButton>
          <ListItemButton
            className="!p-5 !pt-6 !items-baseline"
            onClick={removeTodo}
          >
            <i className="fa-solid fa-trash-can"></i>
            &nbsp;삭제
          </ListItemButton>
        </List>
      </SwipeableDrawer>
      <Modal
        className="flex justify-center items-center"
        open={useEditTodo.opened}
        onClose={useEditTodo.close}
      >
        <div className="bg-white p-10 rounded-[20px]">안녕하세요</div>
      </Modal>
    </>
  );
}

function TodoList({ todosState }) {
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();
  return (
    <>
      <TodoOptionDrawer
        status={todoOptionDrawerStatus}
        todosState={todosState}
      />
      <div className="mt-5 px-4">
        <ul>
          {todosState.todos.map((todo, index) => (
            <TodoListItem
              todo={todo}
              index={index}
              openDrawer={todoOptionDrawerStatus.open}
            />
          ))}
        </ul>
      </div>
    </>
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
    </>
  );
}

function App() {
  const todosState = useTodosState();
  useEffect(() => {
    todosState.addTodo("운동\n스트레칭\n헬스\n복싱\n주짓수");
    todosState.addTodo("공부");
    todosState.addTodo("독서");
  }, []);

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

      <NewTodoForm todosState={todosState} />

      <TodoList todosState={todosState} />
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

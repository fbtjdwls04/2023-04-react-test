import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  atom,
  atomFamily,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
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
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import classNames from "classnames";
import Order from "./Order";
import { recoilPersist } from "recoil-persist";

const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "persistAtomTodos",
});

const { persistAtom: persistAtomLastTodoId } = recoilPersist({
  key: "persistAtomLastTodoId",
});

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert {...props} ref={ref} variant="filled" />;
});

const todoAtom = atom({
  key: "app/todoAtom",
  default: [
    {
      id: 3,
      content: "응애",
      regDate: "2023-05-22",
      check: false,
    },
    {
      id: 2,
      content: "운동",
      regDate: "2023-05-22",
      check: false,
    },
    {
      id: 1,
      content: "공부",
      regDate: "2023-05-22",
      check: false,
    },
  ],
  effects_UNSTABLE: [persistAtomTodos],
});

const lastTodoIdAtom = atom({
  key: "app/lastTodoIdAtom",
  default: 3,
  effects_UNSTABLE: [persistAtomLastTodoId],
});

function useTodosState() {
  const [todos, SetTodos] = useRecoilState(todoAtom);
  const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
  const lastTodoIdRef = useRef(lastTodoId);

  lastTodoIdRef.current = lastTodoId;

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    setLastTodoId(id);

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
      check: false,
    };
    SetTodos((todos) => [newTodo, ...todos]);

    return id;
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    SetTodos(newTodos);
  };

  const modifyTodoById = (id, newContent) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return;
    }
    modifyTodo(index, newContent);
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
  const findTodoIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const findTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return null;
    }

    return todos[index];
  };

  const check = (id) => {
    const newTodo = todos.map((todo) =>
      todo.id == id ? { ...todo, check: !todo.check } : todo
    );
    SetTodos(newTodo);
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo,
    removeTodoById,
    findTodoIndexById,
    findTodoById,
    modifyTodoById,
    check,
  };
}
function TodoListItem({ todo, index, openDrawer }) {
  const todosState = useTodosState();
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
            onClick={() => todosState.check(todo.id)}
          >
            <span
              className={classNames(
                "flex",
                "items-center",
                "text-4xl",
                {
                  "text-[color:var(--mui-color-primary-main)]": todo.check,
                },
                { "text-[#dfdfdf]": !todo.check }
              )}
            >
              <i className="fa-solid fa-check"></i>
            </span>
          </Button>

          <div className="flex-shrink-0 my-3 mr-4 w-[2px] bg-[#dfdfdf]"></div>

          <div className="whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex-grow my-5">
            <p
              className={classNames({
                "line-through": todo.check,
              })}
            >
              {todo.content}
            </p>
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

function EditTodoModal({ status, todo, closeDrawer }) {
  const todosState = useTodosState();
  const noticeSnackBarState = useNoticeSnackBarState();
  const close = () => {
    status.close();
    closeDrawer();
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요");
      form.content.focus();
      return;
    }
    todosState.modifyTodoById(todo.id, form.content.value);
    close();
    noticeSnackBarState.open(`${todo.id}번 할 일이 수정되었습니다.`, "info");
  };

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={status.opened}
        onClose={status.close}
      >
        <div className="bg-white p-10 rounded-[20px] w-full max-w-lg">
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <TextField
              minRows={3}
              maxRows={10}
              multiline
              autoComplete="off"
              name="content"
              label="할 일을 입력해주세요."
              variant="outlined"
              defaultValue={todo?.content}
            />
            <Button type="submit" variant="contained">
              수정
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
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

function TodoOptionDrawer({ status }) {
  const noticeSnackBarState = useNoticeSnackBarState();
  const useEditTodo = useEditTodoModal();
  const todosState = useTodosState();
  const removeTodo = () => {
    if (window.confirm(`${status.todoId}번 할 일을 삭제하시겠습니까?`)) {
      todosState.removeTodoById(status.todoId);
      status.close();
      noticeSnackBarState.open(
        `${status.todoId}번 할 일이 삭제되었습니다.`,
        "info"
      );
    }
  };

  const todo = todosState.findTodoById(status.todoId);

  return (
    <>
      <EditTodoModal
        status={useEditTodo}
        todo={todo}
        closeDrawer={status.close}
      />
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={status.opened}
        onClose={status.close}
      >
        <List className="!py-0">
          <ListItem className="!p-5 !pt-6">
            <span className="text-[color:var(--mui-color-primary-main)]">
              {todo?.id}번
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
    </>
  );
}

function TodoList() {
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();
  const todosState = useTodosState();
  return (
    <>
      <TodoOptionDrawer status={todoOptionDrawerStatus} />
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
function NewTodoForm() {
  const noticeSnackBarState = useNoticeSnackBarState();
  const todosState = useTodosState();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("내용을 입력해주세요");
      form.content.focus();
      return;
    }

    const newTodoId = todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
    noticeSnackBarState.open(`${newTodoId}번 할 일이 추가 되었습니다.`);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col my-5 mx-5 gap-2">
        <TextField
          minRows={3}
          maxRows={10}
          multiline
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

function NoticeSnackBar() {
  const state = useNoticeSnackBarState();
  return (
    <>
      <Snackbar
        open={state.opened}
        autoHideDuration={state.autoHideDuration}
        onClose={state.close}
      >
        <Alert severity={state.severity}>{state.msg}</Alert>
      </Snackbar>
    </>
  );
}

const { noticeSnackBarInfoAtom } = atom({
  key: "app/noticeSnackBarInfoAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg: "",
  },
});

function useNoticeSnackBarState() {
  const [noticeSnackBarInfo, setNoticeSnackBarInfo] = useRecoilState(
    noticeSnackBarInfoAtom
  );

  const opened = noticeSnackBarInfo.opened;
  const autoHideDuration = noticeSnackBarInfo.autoHideDuration;
  const msg = noticeSnackBarInfo.msg;
  const severity = noticeSnackBarInfo.severity;

  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackBarInfo({
      opened: true,
      msg,
      severity,
      autoHideDuration,
    });
  };
  const close = () => {
    setNoticeSnackBarInfo({ ...noticeSnackBarInfo, opened: false });
  };

  return {
    opened,
    open,
    close,
    autoHideDuration,
    severity,
    msg,
  };
}

function App() {
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

      <NoticeSnackBar />
      <NewTodoForm />

      <TodoList />
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

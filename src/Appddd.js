import React, { useState } from "react";
import { Button } from "@mui/material";
import {
  atom,
  atomFamily,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";

const pageNoAtom = atomFamily({
  key: "app/pageNoAtom",
  default: (pageNo) => pageNo,
});

function usePageCount(pageNo) {
  const [count, setCount] = useRecoilState(pageNoAtom(pageNo));

  const inceaseOne = () => setCount(count + 1);
  const deceaseOne = () => setCount(count - 1);
  const inceaseTen = () => setCount(count + 10);
  const deceaseTen = () => setCount(count - 10);
  const clear = () => setCount(0);

  return {
    inceaseOne,
    deceaseOne,
    inceaseTen,
    deceaseTen,
    clear,
    count,
  };
}

function Page1() {
  const pageCountState = usePageCount(1);

  return (
    <>
      <h1 className="text-[3rem]">페이지 1</h1>
      <ul>
        <li>페이지 1의 숫자 : {pageCountState.count}</li>
        <li>
          <Button variant="outlined" onClick={pageCountState.inceaseOne}>
            페이지 1의 숫자 1증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseOne}>
            페이지 1의 숫자 1감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.inceaseTen}>
            페이지 1의 숫자 10증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseTen}>
            페이지 1의 숫자 10감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.clear}>
            페이지 1의 숫자 초기화
          </Button>
        </li>
      </ul>
    </>
  );
}

function Page2() {
  const pageCountState = usePageCount(2);
  return (
    <>
      <h1 className="text-[3rem]">페이지 2</h1>
      <ul>
        <li>페이지 2의 숫자 : {pageCountState.count}</li>
        <li>
          <Button variant="outlined" onClick={pageCountState.inceaseOne}>
            페이지 2의 숫자 1증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseOne}>
            페이지 2의 숫자 1감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.inceaseTen}>
            페이지 2의 숫자 10증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseTen}>
            페이지 2의 숫자 10감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.clear}>
            페이지 2의 숫자 초기화
          </Button>
        </li>
      </ul>
    </>
  );
}
function Page3() {
  const pageCountState = usePageCount(3);
  return (
    <>
      <h1 className="text-[3rem]">페이지 3</h1>
      <ul>
        <li>페이지 3의 숫자 : {pageCountState.count}</li>
        <li>
          <Button variant="outlined" onClick={pageCountState.inceaseOne}>
            페이지 3의 숫자 1증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseOne}>
            페이지 3의 숫자 1감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.inceaseTen}>
            페이지 3의 숫자 10증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseTen}>
            페이지 3의 숫자 10감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.clear}>
            페이지 3의 숫자 초기화
          </Button>
        </li>
      </ul>
    </>
  );
}
function Page4() {
  const pageCountState = usePageCount(4);
  return (
    <>
      <h1 className="text-[3rem]">페이지 4</h1>
      <ul>
        <li>페이지 4의 숫자 : {pageCountState.count}</li>
        <li>
          <Button variant="outlined" onClick={pageCountState.inceaseOne}>
            페이지 4의 숫자 1증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseOne}>
            페이지 4의 숫자 1감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.inceaseTen}>
            페이지 4의 숫자 10증가
          </Button>
          <Button variant="outlined" onClick={pageCountState.deceaseTen}>
            페이지 4의 숫자 10감소
          </Button>
          <Button variant="outlined" onClick={pageCountState.clear}>
            페이지 4의 숫자 초기화
          </Button>
        </li>
      </ul>
    </>
  );
}

export default function App() {
  const [pageNo, setPageNo] = useState(1);
  const switchPage = () => setPageNo(pageNo + 1 <= 4 ? pageNo + 1 : 1);
  const pageName = "page" + pageNo;

  return (
    <>
      <div className="flex justify-center items-center flex-col h-full">
        <Button variant="outlined" onClick={switchPage}>
          스위치
        </Button>
        <hr />
        <br />
        {pageName == "page1" && <Page1 />}
        {pageName == "page2" && <Page2 />}
        {pageName == "page3" && <Page3 />}
        {pageName == "page4" && <Page4 />}
      </div>
    </>
  );
}

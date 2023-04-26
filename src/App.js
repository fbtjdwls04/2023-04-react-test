import React,{useEffect, useState, useRef} from "react";

let AppCallCount = 0;
let SubCallcount = 0;

function Sub({appNo}) {
  SubCallcount++;
  console.log(`SubCallcount : ${SubCallcount}`);
  const [no, SetNo] = useState(0);
  const [no2, SetNo2] = useState(0);

  useEffect(()=>{
    console.log('effect 1 : 단 한번 실행');
  },[])

  useEffect(()=>{
    console.log('effect 2 : 부모(App)의 appNo가 바뀔 때마다 실행');
  },[appNo])

  useEffect(()=>{
    console.log('effect 3 : 나(Sub)가 바뀔 때마다 실행');
  },[no])
  useEffect(()=>{
    console.log('effect 4 : appNo 혹은 no가 바뀔 때마다 실행');
  },[appNo, no])
  useEffect(()=>{
    console.log('effect 5 : 매번 실행');
  })


  return (
    <>
      <div style={{
        border : "10px solid blue",
        padding : 10
      }}>
        App no : {appNo}
        <button className="btn btn-outline" onClick={()=>{SetNo(no + 1 )}}>
          Sub 버튼 : {no}
        </button>
        <button className="btn btn-outline" onClick={()=>{SetNo2(no2 + 1 )}}>
          App 버튼 : {no2}
        </button>
      </div>
    </> 
  );
}

function App() {
  AppCallCount++;
  console.log(`AppCallCount : ${AppCallCount}`);
  const [no, SetNo] = useState(0);
  
  return (
    <>
      <div style={{
        border : "10px solid red",
        padding : 10
      }}>
        <button className="btn btn-outline" onClick={()=>{SetNo(no + 1 )}}>
          App 버튼 : {no}
        </button>
        <Sub appNo={no}/>
      </div>
    </> 
  );
}

export default App;

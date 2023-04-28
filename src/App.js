import React,{useEffect, useState, useCallback} from "react";

let SubCallCount = 0;
function Sub({no1,no2,calculateFun}) {
  SubCallCount++;
  console.log(`SubCallCount : ${SubCallCount}`);

  return (
    <>
      <div style={{border: '10px solid pink',padding: 10}}>
        입력 : {no1}, {no2}
        <br />
        결과 : {calculateFun(no1,no2)}
      </div>
    </> 
  );
}

const MemoizedSub = React.memo(Sub);

let AppCallCount = 0;

function App() {
  AppCallCount++;
  console.log(`AppCallCount : ${AppCallCount}`);
  
  const [no1, setNo1] = useState(0);
  const [no2, setNo2] = useState(0);

  const calculateFun = useCallback((a,b) => a + b + no1,[no1]);
  
  return (
    <>
      <button className="btn btn-outline" onClick={()=> setNo1(no1 + 1)}>버튼1 : {no1}</button>
      <hr />
      <button className="btn btn-outline" onClick={()=> setNo2(no2 + 1)}>버튼2 : {no2}</button>
      <hr />
      <MemoizedSub no1={10} no2={20} calculateFun={calculateFun}/>
    </> 
  );
}

export default App;

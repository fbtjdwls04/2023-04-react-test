import React,{useEffect, useState, useMemo} from "react";
import ThemeToggle from "./ThemeToggle";


function isPrimeNumber(no){
  for(let i = 2; i < no; i++){
      if(i*i > no){
          break;
      }
      if( no % i == 0){
          return false;
      }
  }
  return true;
}

function getPrimeNumbers(max){
  const PrimeNumbers = [];
  for(let i = 2; i < max; i++){
      if(isPrimeNumber(i)){
          PrimeNumbers.push(i);
      }
  }
  return PrimeNumbers;
}

function getPrimeNumbersCount(max){
  return getPrimeNumbers(max).length;
}

let PrimeNosCountCallCount = 0;

function PrimeNosCount({max}){
  PrimeNosCountCallCount++;
  console.log(`PrimeNosCountCallCount : ${PrimeNosCountCallCount}`);
  const count = useMemo(()=>getPrimeNumbersCount(max),[max]);

  return (
  <div style={{border: '10px solid black',padding:50}}>
    {max}사이에 존재하는 소수의 개수는 {count}개 이다.
  </div>
  );
} 

const MemoizedPrimeNosCount = React.memo(PrimeNosCount);

let AppCallCount = 0;
function App() {
  const [no, setNo] = useState(0);

  AppCallCount++;
  console.log(`AppCallCount : ${AppCallCount}`);

  return (
    <>
      <MemoizedPrimeNosCount max={100}/>
      <hr />
      <MemoizedPrimeNosCount max={200}/>
      <hr />
      <MemoizedPrimeNosCount max={300}/>
      <hr />
      <MemoizedPrimeNosCount max={1000000}/>
      <hr />
      <button className="btn btn-outline" onClick={()=>setNo(no + 1)}>버튼 : {no}</button>
    </> 
  );
}

export default App;

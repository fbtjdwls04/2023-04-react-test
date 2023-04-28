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

function PrimeNumbersCount(max){
  return getPrimeNumbers(max).length;
}


function App() {
  const [inputedNumber, SetInputedNumber] = useState(0);
  const [no, SetNo] = useState(0);

  const primeNumbersCount = useMemo(
    ()=> PrimeNumbersCount(inputedNumber),
    [inputedNumber]
  );


  const onSubmit = (e) =>{
    e.preventDefault();

    const form = e.target;
    form.number.value = form.number.value.trim();
    if(form.number.value.length == 0){
      alert('숫자를 입력해주세요.');
      form.number.focus();

      return;
    }
    const number = form.number.valueAsNumber;
    form.number.focus();

    SetInputedNumber(number);
  }


  return (
    <>
      <button onClick={()=>{SetNo(no+1)}}>번호 : {no}</button>
      <hr />
      <form onSubmit={onSubmit}>
      <input className="btn btn-outline" type="number" name="number" placeholder="숫자를 입력해주세요." defaultValue='0'/>
      <input className="btn btn-outline" type="submit" value='확인' />
      <hr />
      <div>MAX : {inputedNumber}</div>
      <div>소수의 개수 : {primeNumbersCount}</div>
     </form>
    </> 
  );
}

export default App;

import { useState } from "react";

export default function NoRecord() {
  const [no, setNo] = useState('');
  const [recordedNo, setRecordedNo] = useState([]);

  const saveNo = () => {
    
    
    if(no == ''){
      alert("숫자를 입력해주세요");
      return;
    }

    setRecordedNo([...recordedNo,no]);
    setNo('');
  };
  const li = recordedNo.map((e,i)=> <li key={i}>{e}</li>)
  return (
    <>
      <form onSubmit={(e)=> {
        e.preventDefault();
        saveNo();
      }}>
        <input type="number" value={no} onChange={(e)=>setNo(e.target.valueAsNumber)}/>
        <button type="submit" className="btn">
          기록
        </button>
      </form>
      
      <hr />
      <h1>기록된 숫자 v1</h1>
      기록된 숫자 : [{recordedNo.join(',')}]

      <hr />
      <h1>기록된 숫자 v2</h1>
      <ul>{li}</ul>
      <hr />
      <h1>기록된 숫자 v2-2</h1>
      <ul>{recordedNo.map((e,i)=> <li key={i}>{e}</li>)}</ul>
      
    </> 
  );
}


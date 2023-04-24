import { useState, useRef } from "react";

export default function NoRecord() {
  const [recordedNo, setRecordedNo] = useState([]);
  const noInputRef = useRef(null);

  const saveNo = (form) => {
    form.no.value = form.no.value.trim();
    
    if(form.no.value.legnth === 0){
      alert("숫자를 입력해주세요");
      noInputRef.current.focus();
      return;
    }

    setRecordedNo([...recordedNo,form.no.value]);
    form.no.value = '';
    noInputRef.current.focus();
  };
  const li = recordedNo.map((e,i)=> <li key={i}>{e}</li>)
  return (
    <>
      <form onSubmit={(e)=> {
        e.preventDefault();
        saveNo(e.target);
      }}
      >
        <input type="number" name="no" placeholder="숫자" ref={noInputRef}/>
        <button 
        type="submit" 
        className="btn"
        >
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


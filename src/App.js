import React,{useEffect, useState, useRef} from "react";

let AppCallCount = 0;

function App() {
  AppCallCount++;
  console.log(`AppCallCount : ${AppCallCount}`);
  const [no, SetNo] = useState(0);
  const [isDark, SetIsDark] = useState(false);

  useEffect(()=>{
    const html = document.getElementsByTagName('html')[0];
    if(isDark){
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  },[isDark]);

  return (
    <>
      <div style={{
        padding : 10
      }}>
        <button className="btn btn-outline" onClick={()=>{SetNo(no + 1 )}}>
          App 버튼 : {no}
        </button>
        <button className="btn btn-outline" onClick={()=>{SetIsDark(!isDark)}}>
          테마 토글
        </button>

        <hr />

        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat possimus porro, eveniet odio exercitationem harum, dolorum molestias aliquid sed quas consequatur, nostrum nam omnis et quos pariatur! Reprehenderit, illo ducimus.
        </div>

        <h1 class="color-primary">안녕, 반가워</h1>
      </div>
    </> 
  );
}

export default App;

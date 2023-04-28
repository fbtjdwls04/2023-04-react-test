import { useEffect, useState } from "react";

export default function ThemeToggle(){
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


    return(
        <button className="btn btn-outline" onClick={()=>{SetIsDark(!isDark)}}>
          테마 토글
        </button>
    )
}
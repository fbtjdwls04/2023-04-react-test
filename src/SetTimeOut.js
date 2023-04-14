import { useState } from "react";

export default function SetTimeOut(){
    const [num, setNum] = useState(0);
    const timeOutId = setTimeout(()=> setNum(num + 1), 1000);
    const pause = () => clearTimeout(timeOutId);
    const reSum = () => {setTimeout(()=> setNum(num+1), 1000)}
    return (
    <>
        숫자 : {num}
        <hr/>
        <button onClick={pause}>일시정지</button>
        &nbsp;
        <button onClick={reSum}>재개</button>
    </>
    )
        
}
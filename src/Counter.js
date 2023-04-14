import { useState } from "react";

export default function Counter(){

    const [no, setNo] = useState(0);
    const noIsEvenDiv = (
        no % 2 == 0 ? <>
        <hr/>
        <span>짝수입니다</span>
        </>
        :
        <>
            <hr/>
            <span>홀수입니다</span>
        </>
    )
    const eightDev = (
        no % 8 == 0 ?
        <>
            <hr/>
            <div>8의 배수입니다.</div>
        </>
        :
        <>
        </>
        )

    return (
    <>
        숫자 : {no}
        <hr/>
        <button onClick={()=> setNo(no+1)}>중가</button>
        {noIsEvenDiv}
        {eightDev}
    </>
    )
}
import React,{useState} from "react";

let AppCount = 0;

function App() {
  AppCount++;

  const [name, setName] = useState('Paul');
  const [age, setAge] = useState(10);
  const [address, setAddress] = useState('서구');
  return (
    <>
      <input
        type='text' 
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e)=>{
          console.log(`e.target.value : ${e.target.value}`);
          setName(e.target.value);
        }}
      />
      &nbsp; / &nbsp; 현재 이름: {name}
      <hr />
      <input
        type='number' 
        placeholder="나이를 입력해주세요"
        value={age}
        onChange={(e)=>{
          setAge(e.target.value);
        }}
      />
      &nbsp; / &nbsp; 현재 나이: {age}살
      <hr />
      <input
        type='text' 
        placeholder="주소를 입력해주세요"
        value={address}
        onChange={(e)=>{
          setAddress(e.target.value);
        }}
      />
      &nbsp; / &nbsp; 현재 주소: {address}
      <hr />
      <div>AppCount가 {AppCount}번 실행됨</div>
    </>
  );
}

export default App;

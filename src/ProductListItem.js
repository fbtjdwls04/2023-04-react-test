import React,{useState} from "react";
  export default function ProductListItem({imgNo,name, price}) {
  return (
    <li>
      <div className="flex flex-col gap-[10px]">
        <img src={`https://picsum.photos/id/${imgNo}/400/400`}/>
        <div className="text-center font-bold">{name}</div>
        <div className="after:content-['원'] text-center">{price}</div>
      </div>
    </li> 
  );
}


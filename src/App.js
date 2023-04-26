import React,{useState} from "react";
import classnames from 'https://cdn.skypack.dev/classnames';

function NotifyOnce({children}){
  const [visible, SetVisible] = useState(false);
  const [workDone, SetWorkDone] = useState(false);
  
  if(workDone == false){
    setTimeout(function(){
      SetVisible(true);
    }, 1000);

    setTimeout(function(){
      SetVisible(false);
    }, 3000);

    SetWorkDone(true);
  }
  return (
    <div
      className={classnames(
        "fixed transition-all right-[10px]",
        {
          "top-[-60px]" : !visible,
        },
        {
          "top-[10px]" : visible,
        }
      )}
    >
      {children}
    </div>
  )
}

function Alert({color: color_, children}) {
  const color = color_ ?? "white";
  return (
    <div className="alert alert-success shadow-lg">
      <div className={`text-[${color}]`}>
        <span><i className="fa-solid fa-circle-info"></i></span>
        <span>{children}</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <NotifyOnce>
        <Alert>안녕하세요</Alert>
      </NotifyOnce>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas modi cum repellendus quidem veniam sint magni vitae dicta quae ea inventore, omnis accusantium quam mollitia! Qui, nostrum corporis! Soluta, perspiciatis.
        </div>
    </> 
  );
}

export default App;

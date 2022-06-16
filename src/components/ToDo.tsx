import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const rawToDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);


  // < Delete 버튼 누르면 삭제 >
  
  const ClickDelete = (event: React.MouseEvent<HTMLButtonElement>) =>{
    const {
      currentTarget: { id },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === +id);
      const toDoList = [...oldToDos];
      toDoList.splice(targetIndex, 1)
 
      return toDoList
      
    }); 
  };


  // < toDo, Doing, Done 같은 버튼 누르면 해당 구역으로 옮겨주는 기능>
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category: name as any };
        
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ]
      });
  };


  // <실시간으로 배열에 있는 것을 로컬 스토리지에 저장 > 
  // useEffect(() => {
  //   localStorage.setItem("TODOS_KEY", JSON.stringify(rawToDos));
  // }, [rawToDos]);

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      
      <button id={id+""} name={Categories.DELETE} onClick={ClickDelete}>Delete</button>
    </li>
  );
}

export default ToDo;

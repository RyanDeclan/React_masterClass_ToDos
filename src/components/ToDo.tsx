import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {

  const rawToDos = useRecoilValue(toDoState);
  let setToDos = useSetRecoilState(toDoState);
  const ClickDelete = (event: React.MouseEvent<HTMLButtonElement>) =>{
    const {
      currentTarget: { id },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === +id);
   
      if(oldToDos.length === 1){
         
      }
      console.log(targetIndex)
      console.log(oldToDos)
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1)
       
      ]
  

    });
  };
  
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
        ];
      });
    
  };
  useEffect(() => {
    localStorage.setItem("TODOS_KEY", JSON.stringify(rawToDos));
  }, [rawToDos]);

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

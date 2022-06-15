import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector, toDoState, IToDo } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Header = styled.div`
  display: flex;
  justify-content : space-between;
`

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  // < 전체 초기화 버튼 > 
  const ClickReset = (event: React.MouseEvent<HTMLButtonElement>) =>{
    localStorage.clear();
    window.location.reload()
  }
  
  // < 로컬에 저장 되어있다면 새로고침을 해도 data 그대로 표현  > 
  useEffect(()=>{
    if (localStorage.getItem("TODOS_KEY") !== null) {
      const data :IToDo[] = JSON.parse(localStorage.getItem("TODOS_KEY")!);
      setToDos(data)
    }
  }, []);
    
    
  return (
    <div>
      <Header>
        <h1>To Dos</h1>
        <button  name={"reset"} onClick={ClickReset}>전체 초기화</button>
      </Header>
      
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

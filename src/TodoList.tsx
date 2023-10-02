import React, { FC, useState, KeyboardEvent, ChangeEvent } from "react";
import { FilterValuesType } from "./App";

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  filter:FilterValuesType;
  changeFilter: (nextFilterValue: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodoList: FC<TodoListPropsType> = (todoProps): JSX.Element => {
  const { title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter } =
    todoProps;

  console.log("Render");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [inputError, setInputError]=useState(false)
  const listItems: Array<JSX.Element> = tasks.map((t) => {
    const onClickRemoveTaskHandler = () => removeTask(t.id);
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(t.id, e.currentTarget.checked);
    };
    return (
      <li key={t.id}>
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={onChangeTaskStatusHandler}
        />
        <span className={t.isDone?'task-done':'task'}>{t.title}</span>
        <button onClick={onClickRemoveTaskHandler}>x</button>
      </li>
    );
  });

  //   const titleInput = useRef<HTMLInputElement>(null);
  const tasksList: JSX.Element = tasks.length ? (
    <ul>{listItems}</ul>
  ) : (
    <span>Your tasksList is empty</span>
  );

  const onClickAddTask = () => {
    const trimmedTitle = newTaskTitle.trim()
    if(trimmedTitle){
      addTask(newTaskTitle);
    }else{
      setInputError(true)
    }
    setNewTaskTitle("");
  };

  const inKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && onClickAddTask();
  };

  const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) =>{
    inputError && setInputError(false)

    setNewTaskTitle(e.target.value);

  }


  const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length >= 15;


  const userMessage = inputError
  ? <span style={{ color: "red" }}>Your title is too empty</span>
    :newTaskTitle.length < 15 ? (
      <span>Enter new title</span>
    ) : (
      <span style={{ color: "red" }}>Your title is too long</span>
    );

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeSetNewTaskTitle}
          onKeyDown={inKeyDownAddTask}
          className={inputError?'input-error':undefined}
        />
        <button disabled={isAddBtnDisabled} onClick={onClickAddTask}>
          +
        </button>
        <div>{userMessage}</div>
        {/* <input ref={titleInput} />
        <button onClick={() => if(titleInput.current!==null){
            addTask(titleInput.current.value)
            titleInput.current.value=""}>+</button> */}
      </div>
      {tasksList}
      <div>
        <button
            className={filter=== 'all'?'btn-active':undefined}
            onClick={() => changeFilter("all")}
        >All</button>
        <button
            className={filter=== 'all'?'btn-active':undefined}
            onClick={() => changeFilter("active")}
        >Active</button>
        <button
            className={filter=== 'all'?'btn-active':undefined}
            onClick={() => changeFilter("completed")}
        >Completed</button>
      </div>
    </div>
  );
};

export default TodoList;

//1.
// const title = props.title
// const tasks = props.tasks
//2.
//const {title: title, tasks: tasks} = props
//3.
//const {title, tasks} = props

// let tasksList: Array<JSX.Element> | JSX.Element;
// if(tasks.length === 0){
//     tasksList = <span>Your tasksList is empty</span>
// } else {
//     const listItems: Array<JSX.Element> = []
//     for (let i = 0; i < tasks.length; i++) {
// const newListItem = <li key={tasks[i].id}>
//     <input type="checkbox" checked={tasks[i].isDone}/>
//     <span>{tasks[i].title}</span>
//     <button>x</button>
// </li>
//         listItems.push(newListItem)
//     }
//     tasksList = <ul>
//         {listItems}
//     </ul>
// }

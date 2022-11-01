import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskName: string) => void
}

export function Todolist(props: PropsType) {

    const [taskName, setTaskName] = useState('')

    const onClickButtonHandler = () => {
        props.addTask(taskName)
        setTaskName('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickButtonHandler()
        }

    }

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    const onClickRemoveHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    const mapTasks = props.tasks.map(t => {

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name={'x'} callBack={() => onClickRemoveHandler(t.id)}/>
            </li>
        )
    })
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={taskName} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <Button name={'+'} callBack={onClickButtonHandler}/>
        </div>
        <ul>
            {mapTasks}
        </ul>
        <div>
            <Button name={'All'} callBack={() => changeFilterHandler("all")}/>
            <Button name={'Active'} callBack={() => changeFilterHandler("active")}/>
            <Button name={'Completed'} callBack={() => changeFilterHandler("completed")}/>
        </div>
    </div>
}

import React from "react";
import {Button, Label} from 'react-aria-components';
import {CheckboxGroup, Checkbox} from 'react-aria-components';
import {TextField, Input} from 'react-aria-components';
import {Dialog, DialogTrigger, Heading, Modal} from 'react-aria-components';


import "./style.css";

//look into polyline later 

let id = 0; 

export function App() {
    
  const [tasks, setTasks] = React.useState([]);

  function addTask(name){
    const newTask = {id: id++, name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    console.log(tasks)
  }

  function editTask(id, newName){
    let editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(editedTaskList);
  }


  return (
    <div>
      <h1 className="text-5xl">Daily Tracker</h1>
      <Form addTask={addTask}/>
      <ToDoList tasks={tasks} deleteTask={deleteTask} editTask={editTask}/>
    </div>
  )
}

export function Form(props){

  const [task, setTask] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (task) { //don't add task if there is no text
      props.addTask(task);
      setTask(() => '');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField className="flex flex-col" onChange={setTask}>
        <Label>What do you need to do?</Label>
        <Input value={task} className="border-2 w-5/12"/>
      </TextField>
      <Button type="submit" className="border-2">Add</Button>
    </form>      
  )
}

export function ToDoList(props) {
  
  tasks = props.tasks;

  const taskList = tasks.map((task, index) => (
    <Checkbox value={`${task.name}-${index}`} className="flex group" key={task.id}>
      <div className="checkbox w-5 h-5 border-2 border-solid rounded-s group-data-[selected]:bg-black" aria-hidden="true">
        <svg viewBox="0 0 18 18" className="w-4"></svg>
      </div>
      {task.name}
      <EditDialog editTask={props.editTask} id={task.id}/>
      {/* <Button onPress={() => props.editTask(task.id, newName)} className="border-2 w-auto">Edit</Button> */}
      <Button onPress={() => props.deleteTask(task.id)} className="border-2 w-auto">Delete</Button>
    </Checkbox>
  ))

  return (
    <CheckboxGroup className="flex flex-col">
      <Label>To-Do List</Label>
      {taskList}
    </CheckboxGroup>
  )
}

export function EditDialog(props){

  const [text, setText] = React.useState('');

  return (
    <DialogTrigger>
      <Button>Edit</Button>
      <Modal>
        <Dialog>
        {({ close }) => (
            <form>
              <Heading>Edit Task</Heading>
              <TextField autoFocus onChange={setText}>
                <Label>Updated Task</Label>
                <Input />
              </TextField>
              <Button onPressStart={() => props.editTask(props.id, text)} onPress = {close} >
                Submit
              </Button>
              <Button onPress = {close} >
                Cancel
              </Button>
            </form>
            )}
        </Dialog>
      </Modal>
  </DialogTrigger>
  )
}

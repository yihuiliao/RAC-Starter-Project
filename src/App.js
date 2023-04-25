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
        <Label className="mt-2">What do you need to do?</Label>
        <Input value={task} className="border-2 w-5/12 rounded-md"/>
      </TextField>
      <Button type="submit" className="border-2 mt-3 mb-5 py-1 px-2 rounded-md bg-white">Add</Button>
    </form>      
  )
}

export function ToDoList(props) {
  
  tasks = props.tasks;

  const taskList = tasks.map((task, index) => (
    <Checkbox value={`${task.name}-${index}`} className="flex group items-center my-1 justify-between	" key={task.id}>
      <div className="flex">
        <div className="checkbox w-5 h-5 border-2 border-solid rounded-s bg-white group-data-[selected]:bg-black mr-2" aria-hidden="true">
          <svg viewBox="0 0 18 18" className="w-4"></svg>
        </div>
        <span className="group-data-[selected]:line-through">{task.name}</span>
      </div>
      <div className="mr-96">
        <EditDialog editTask={props.editTask} id={task.id} className=""/>
        <Button onPress={() => props.deleteTask(task.id)} className="border-2 w-auto ml-5 px-2 rounded-md bg-white">Delete</Button>
      </div>
    </Checkbox>
  ))

  return (
    <CheckboxGroup className="flex flex-col w-9/12">
      <Label>To-Do List</Label>
      {taskList}
    </CheckboxGroup>
  )
}

export function EditDialog(props){

  const [text, setText] = React.useState('');

  return (
    <DialogTrigger>
      <Button className="ml-24 border-2 w-auto px-2 rounded-md bg-white">Edit</Button>
      <Modal className="border-2 m-auto p-5 z-10 bg-white left-1/4 fixed">
        <Dialog>
        {({ close }) => (
            <form>
              <Heading className="text-center">Edit Task</Heading>
              <TextField autoFocus onChange={setText} className="my-3">
                <Label className="pr-3">Updated Task</Label>
                <Input className="border-2 rounded-md" />
              </TextField>
              <div className="text-right">
                <Button onPress = {close} className="border-2 mr-3 px-2 rounded-md">
                  Cancel
                </Button>
                <Button onPressStart={() => props.editTask(props.id, text)} onPress = {close} className="border-2 px-2 rounded-md">
                  Submit
                </Button>
              </div>
            </form>
            )}
        </Dialog>
      </Modal>
  </DialogTrigger>
  )
}

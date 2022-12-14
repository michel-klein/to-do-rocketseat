import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTaskWithSameTitle = tasks.find(task => task.title === newTaskTitle)
    if (hasTaskWithSameTitle) return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const newTaskList = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      };
      return task;
    })
    setTasks(newTaskList);
  }

  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter(task => task.id !== id);
    setTasks(newTaskList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
import { Injectable } from '@angular/core';
import { Task } from '../../models/task.interface';
import { NewTask } from '../../models/new-task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn the basic and advanced features of Angular',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u2',
      title: 'Master React',
      summary: 'Learn React in depth',
      dueDate: '2021-12-31',
    },
    {
      id: 't3',
      userId: 'u2',
      title: 'Master Vue',
      summary: 'To complete the frontend development journey, Learn Vue',
      dueDate: '2022-12-31',
    },
  ];

  constructor() {
    this.tasks = localStorage.getItem('tasks')
      ? (JSON.parse(localStorage.getItem('tasks') || '') as Task[])
      : this.tasks;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getUserTasks(userId: string): Task[] {
    const userTasks = this.tasks.filter((task) => task.userId === userId);
    return userTasks;
  }

  getTask(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      return task;
    } else {
      throw new Error(`Task with id ${id} not found`);
    }
  }

  addTask(taskData: NewTask, userId: string): Task {
    this.tasks.unshift({
      id: Math.random().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks();
    return this.tasks[0];
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
    return undefined;
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

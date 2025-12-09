import { Injectable, signal } from '@angular/core';

import { type NewTaskData } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal([
    {
      id: 't1',
      userId: 'u1',
      title: 'D1* Theory',
      summary: 'Read DI 401 Rules and Recommendations.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u1',
      title: 'D1* Programme',
      summary: 'Source Mask Fins and Snorkel for the D1* Programme.',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u1',
      title: 'D1* Pool Session',
      summary: 'Attend the D* pool session to practice new skills.',
      dueDate: '2024-06-15',
    },
    {
      id: 't3',
      userId: 'u1',
      title: 'D1* Pool Session',
      summary: 'Attend the D* pool session to practice new skills.',
      dueDate: '2024-06-15',
    },
  ]);

  allTasks = this.tasks.asReadonly();

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update((prevTasks) => [
      {
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ]);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}

import { computed, Injectable, signal } from '@angular/core';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<Task[]>([]);

  tasks = computed(() => this._tasks());

  addTask(task: Task): void {
    this._tasks.update((tasks) => [...tasks, task]);
  }

  toggleTaskCompletion(taskId: string): void {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  }

  deleteTask(taskId: string): void {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }
}

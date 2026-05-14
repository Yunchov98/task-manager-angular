import { computed, Injectable, signal } from '@angular/core';

import { NewTask, Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Fix dark mode CSS variables',
      description: 'Replace hardcoded colors with CSS variables',
      completed: true,
      createdAt: new Date('2026-05-13'),
    },
    {
      id: '2',
      title: 'Implement RxJS switchMap for search',
      description: 'Use debounceTime + distinctUntilChanged for optimization',
      completed: false,
      createdAt: new Date('2026-05-14'),
    },
    {
      id: '3',
      title: 'Add Angular Signals to task list',
      description: 'Replace BehaviorSubject with signal() and computed()',
      completed: false,
      createdAt: new Date('2026-05-15'),
    },
  ]);

  tasks = computed(() => this._tasks());
  completedTasks = computed(() => this._tasks().filter((task) => task.completed));
  pendingTasks = computed(() => this._tasks().filter((task) => !task.completed));
  completedCount = computed(() => this.completedTasks().length);
  pendingCount = computed(() => this.pendingTasks().length);

  addTask(newTask: NewTask): void {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
    };

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

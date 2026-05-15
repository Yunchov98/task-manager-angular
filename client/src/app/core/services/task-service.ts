import { computed, Injectable, signal } from '@angular/core';

import { NewTask, Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Fix dark mode CSS variables',
      description: 'Replace hardcoded colors with CSS variables',
      status: TaskStatus.Todo,
      createdAt: new Date('2026-05-13'),
    },
    {
      id: '2',
      title: 'Implement RxJS switchMap for search',
      description: 'Use debounceTime + distinctUntilChanged for optimization',
      status: TaskStatus.Todo,
      createdAt: new Date('2026-05-14'),
    },
    {
      id: '3',
      title: 'Add Angular Signals to task list',
      description: 'Replace BehaviorSubject with signal() and computed()',
      status: TaskStatus.Todo,
      createdAt: new Date('2026-05-15'),
    },
  ]);

  tasks = computed(() => this._tasks());

  todoTasks = computed(() => this._tasks().filter((task) => task.status === TaskStatus.Todo));
  doingTasks = computed(() => this._tasks().filter((task) => task.status === TaskStatus.Doing));
  doneTasks = computed(() => this._tasks().filter((task) => task.status === TaskStatus.Done));
  pendingTasks = computed(() => this._tasks().filter((task) => task.status !== TaskStatus.Done));

  todoCount = computed(() => this.todoTasks().length);
  doingCount = computed(() => this.doingTasks().length);
  doneCount = computed(() => this.doneTasks().length);
  pendingCount = computed(() => this.pendingTasks().length);

  addTask(newTask: NewTask): void {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      status: TaskStatus.Todo,
      createdAt: new Date(),
    };

    this._tasks.update((tasks) => [...tasks, task]);
  }

  updateTaskStatus(taskId: string, status: TaskStatus): void {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  }

  deleteTask(taskId: string): void {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }
}

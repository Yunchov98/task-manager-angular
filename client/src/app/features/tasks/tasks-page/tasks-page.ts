import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TaskList } from '../task-list/task-list';
import { TaskForm } from '../task-form/task-form';

import { NewTask, TaskStatus } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task-service';

@Component({
  selector: 'tm-tasks-page',
  imports: [TaskList, TaskForm],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage {
  private taskService = inject(TaskService);

  tasks = this.taskService.tasks;
  doneTasksCount = this.taskService.doneCount;
  pendingTasksCount = this.taskService.pendingCount;

  onSubmit(task: NewTask): void {
    this.taskService.addTask(task);
  }

  onToggle(taskId: string): void {
    const task = this.tasks().find((task) => task.id === taskId);

    if (!task) return;

    const newStatus = task.status === TaskStatus.Done ? TaskStatus.Todo : TaskStatus.Done;

    this.taskService.updateTaskStatus(taskId, newStatus);
  }

  onDelete(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task-service';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'tm-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList {
  private taskService = inject(TaskService);

  tasks = this.taskService.tasks;
  completedTasksCount = this.taskService.completedCount;
  pendingTasksCount = this.taskService.pendingCount;

  onToggle(taskId: string): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  onDelete(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
}

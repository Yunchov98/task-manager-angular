import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task-service';
import { TaskItem } from '../task-item/task-item';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'tm-tasks-page',
  imports: [TaskItem, TaskList],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage {
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

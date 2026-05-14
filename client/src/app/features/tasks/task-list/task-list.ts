import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task-service';

@Component({
  selector: 'tm-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList {
  private taskService = inject(TaskService);

  tasks = this.taskService.tasks;
}

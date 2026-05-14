import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { TaskItem } from '../task-item/task-item';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'tm-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList {
  tasks = input.required<Task[]>();

  toggleTask = output<string>();
  deleteTask = output<string>();

  onToggle(taskId: string): void {
    this.toggleTask.emit(taskId);
  }

  onDelete(taskId: string): void {
    this.deleteTask.emit(taskId);
  }
}

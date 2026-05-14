import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'tm-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItem {
  task = input.required<Task>();

  toggleTask = output<string>();
  deleteTask = output<string>();

  onToggle(): void {
    this.toggleTask.emit(this.task().id);
  }

  onDelete(): void {
    this.deleteTask.emit(this.task().id);
  }
}

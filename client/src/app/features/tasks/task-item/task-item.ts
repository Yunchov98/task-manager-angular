import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Task, TaskStatus } from '../../../core/models/task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tm-task-item',
  imports: [MatIcon, MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItem {
  task = input.required<Task>();
  completedTask = computed(() => this.task().status === TaskStatus.Done);

  toggleTask = output<string>();
  deleteTask = output<string>();

  onToggle(): void {
    this.toggleTask.emit(this.task().id);
  }

  onDelete(): void {
    this.deleteTask.emit(this.task().id);
  }
}

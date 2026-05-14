import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tm-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItem {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tm-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList {}

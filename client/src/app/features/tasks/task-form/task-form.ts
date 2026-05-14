import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tm-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm {}

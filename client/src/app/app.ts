import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TaskList } from './features/tasks/task-list/task-list';

@Component({
  selector: 'tm-root',
  imports: [RouterOutlet, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('client');
}

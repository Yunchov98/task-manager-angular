import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TasksPage } from './features/tasks/tasks-page/tasks-page';

@Component({
  selector: 'tm-root',
  imports: [RouterOutlet, TasksPage, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('client');
}

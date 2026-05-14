import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NewTask } from '../../../core/models/task.model';

@Component({
  selector: 'tm-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm {
  submitTask = output<NewTask>();

  taskForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)],
    }),
    description: new FormControl(''),
  });

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const newTask: NewTask = {
      title: this.taskForm.controls.title.value,
      description: this.taskForm.controls.description.value,
    };

    this.submitTask.emit(newTask);
    this.taskForm.reset();
  }
}

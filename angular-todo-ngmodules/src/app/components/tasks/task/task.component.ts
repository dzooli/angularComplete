import { Component, inject, Input } from '@angular/core';
import { type Task } from '../../../models/task.interface';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: false,
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  private tasksService: TasksService = inject(TasksService);

  onComplete() {
    this.tasksService.removeTask(this.task.id);
  }
}
